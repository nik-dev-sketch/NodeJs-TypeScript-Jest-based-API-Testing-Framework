import { createHash, randomUUID } from 'crypto';

import axios from 'axios';
import { parse } from 'node-html-parser';

import { ICETokenConfig, envCETokenConfig } from './CETokenConfig';
import { acceptCDRArrangement, acceptLogin } from './acceptance';
import { getConsentAccessToken, getLoginAccessToken } from './getAccessToken';
import { getCDRArrangementSystem } from './getCdrArrangement';
import { getCookiesFromFirstCallAndRedirect } from './getCookiesFromFirstCallAndRedirect';
import { getOidcDiscovery } from './getDiscovery';
import { internalToCE } from './internalToCE';
import { getJwtAuth } from './jwtAuth';
import { postWithHttpsProxy } from './makeRequests';

export async function getCEToken(
  config: ICETokenConfig,
  customerID: string,
  accountIds: string[],
  requested_scopes: string[],
  sharing_duration = 910000000000000,
): Promise<{
  accessToken: string;
  refreshToken: string;
  cdrArrangementId: string;
}> {
  const steps: string[] = [];
  try {
    const ceCustomerId = await internalToCE(config, customerID);
    const ceAccountIds = await Promise.all(accountIds.map(async (accountId) => internalToCE(config, accountId)));

    const [cdrDiscovery] = await Promise.all([
      //getOidcDiscovery(config, config.CE_SYSTEM_WORKSPACE || 'default'),
      getOidcDiscovery(config, config.CE_CDR_WORKSPACE || 'default'),
    ]);

    const authEndpoint = cdrDiscovery['authorization_endpoint'];
    const parEndpoint = cdrDiscovery['mtls_endpoint_aliases']['pushed_authorization_request_endpoint'];

    steps.push('Starting mTLS PAR');

    const codeVerifier = `${randomUUID()}-${randomUUID()}`;

    const codeChallengeHash = createHash('sha256');

    codeChallengeHash.update(codeVerifier);

    const codeChallenge = codeChallengeHash.digest('base64url');

    const parRequestClaims = {
      issuer: config.CE_DCR_CLIENT_ID,
      response_type: 'code id_token',
      client_id: config.CE_DCR_CLIENT_ID,
      scope: requested_scopes.join(' '),
      response_mode: 'form_post',
      redirect_uri: config.CE_REDIRECT_URI,
      exp: Math.floor(Date.now() / 1000) + 300,
      iat: Math.floor(Date.now() / 1000),
      claims: {
        sharing_duration,
      },
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
    };

    const parAuthClaims = {
      sub: config.CE_DCR_CLIENT_ID,
      jti: randomUUID(),
      iat: Math.floor(Date.now() / 1000),
    };

    const parAuthJWT = getJwtAuth(config, parAuthClaims);

    const parRequestJwt = getJwtAuth(config, parRequestClaims);

    const mtlsParRequest = await postWithHttpsProxy(
      parEndpoint,
      {
        client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
        client_assertion: parAuthJWT,
        response_type: 'code id_token',
        client_id: config.CE_DCR_CLIENT_ID,
        scope: requested_scopes.join(' '),
        response_mode: 'form_post',
        request: parRequestJwt,
        redirect_uri: config.CE_REDIRECT_URI,
      },
      config,
    );

    const authRequestUri = `${authEndpoint}?client_id=${config.CE_DCR_CLIENT_ID}&response_type=${encodeURIComponent(
      'code id_token',
    )}&scope=${encodeURIComponent(requested_scopes.join(' '))}&response_mode=form_post&request_uri=${
      mtlsParRequest.request_uri
    }`;

    steps.push('Auth Request');
    const { response: authRequestResponse, cookies: authRequestCookies } = await getCookiesFromFirstCallAndRedirect(
      authRequestUri,
      {},
    );

    const urlParams = new URLSearchParams(authRequestResponse.request.requestUrl.split('?')[1]);
    let loginId = urlParams.get('login_id') || '';
    let loginState = urlParams.get('login_state') || '';

    steps.push('Get consent access token');
    const loginAccessToken = await getLoginAccessToken(config);

    steps.push('Accept login');
    const acceptedLoginResponse = await acceptLogin(config, loginId, loginState, ceCustomerId, loginAccessToken);

    steps.push('Accept Login Redirect');
    const { response: loginRequestResponse, cookies: loginRequestCookies } = await getCookiesFromFirstCallAndRedirect(
      acceptedLoginResponse.data.redirect_to,
      {
        headers: {
          Cookie: authRequestCookies,
        },
      },
    );

    const redirectedLoginParams = new URLSearchParams(loginRequestResponse.request.requestUrl.split('?')[1]);

    loginId = redirectedLoginParams.get('login_id') || '';
    loginState = redirectedLoginParams.get('login_state') || '';

    steps.push('Get consent access token');
    const consentAccessToken = await getConsentAccessToken(config);

    steps.push('Get arrangement pre accept');
    const getArrangementPreAccept = await getCDRArrangementSystem(config, loginId, loginState, consentAccessToken);

    steps.push('Accept arrangement');
    const acceptedCdrResponse = await acceptCDRArrangement(
      config,
      ceCustomerId,
      ceAccountIds,
      getArrangementPreAccept.data.requested_scopes.map((value: { name: string }) => value.name),
      loginId,
      loginState,
      consentAccessToken,
    );

    steps.push('Post Accept redirect');
    const resultRedirect = await axios.get(acceptedCdrResponse.redirect_to, {
      headers: {
        Cookie: loginRequestCookies,
      },
      maxRedirects: 0,
    });

    const spfRootDocument = parse(resultRedirect.data);

    const spfRootDocumentCode = spfRootDocument.querySelector('input[name="code"]')?.attributes.value;

    const formParameters = {
      grant_type: 'authorization_code',
      client_id: config.CE_DCR_CLIENT_ID,
      client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
      client_assertion: getJwtAuth(config, {}),
      redirect_uri: config.CE_REDIRECT_URI,
      scope: requested_scopes.join(' '),
      code: spfRootDocumentCode,
      code_verifier: codeVerifier,
    };

    steps.push('Code exchange');
    const codeExchangeRequest = await postWithHttpsProxy(
      cdrDiscovery.mtls_endpoint_aliases.token_endpoint,
      formParameters,
      config,
    );

    return {
      accessToken: codeExchangeRequest.access_token,
      refreshToken: codeExchangeRequest.refresh_token,
      cdrArrangementId: codeExchangeRequest.cdr_arrangement_id,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.log(steps);
    console.log(err);
    console.log(err.response.body);
    throw err;
  }
}

export async function getCloudEntityBearerToken(customerId: string, accountIds: string[], scopesToInclude: string[]) {
  const token = await getCEToken(envCETokenConfig, customerId, accountIds, scopesToInclude);
  return token.accessToken;
}
