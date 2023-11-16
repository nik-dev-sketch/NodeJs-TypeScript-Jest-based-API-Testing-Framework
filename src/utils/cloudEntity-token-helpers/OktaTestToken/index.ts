import crypto from 'crypto';

import axios from 'axios';
import sodium from 'libsodium-wrappers';
import parse from 'node-html-parser';
import qs from 'qs';
import { v4 } from 'uuid';

import { IOktaTokenConfig /**envOktaTokenConfig*/ } from './OktaTokenConfig';

export async function getOktaToken(
  config: IOktaTokenConfig,
  username: string,
  password: string,
  scopes: string[],
): Promise<string> {
  const authn = await axios.post(`https://${config.OKTA_BASE_URL}/api/v1/authn`, {
    username,
    password,
  });

  await sodium.ready;

  const code_verifier = crypto.randomBytes(43).toString('base64url');

  const code_challenge = crypto.createHash('sha256').update(code_verifier).digest('base64url');

  const queryString = qs.stringify({
    client_id: config.OKTA_CLIENT_ID,
    response_type: 'code',
    response_mode: 'form_post',
    scope: scopes.join(' '),
    sessionToken: authn.data.sessionToken,
    redirect_uri: config.OKTA_CLIENT_REDIRECT,
    state: v4(),
    code_challenge_method: 'S256',
    code_challenge,
  });

  const authorise = await axios.get(`https://${config.OKTA_BASE_URL}/oauth2/v1/authorize?${queryString}`);

  const spfRootDocument = parse(authorise.data);

  const spfRootDocumentCode = spfRootDocument.querySelector('input[name="code"]')?.attributes.value;

  const token = await axios.post(
    `https://${config.OKTA_BASE_URL}/oauth2/v1/token`,
    qs.stringify({
      grant_type: 'authorization_code',
      client_id: config.OKTA_CLIENT_ID,
      redirect_uri: config.OKTA_CLIENT_REDIRECT,
      code: spfRootDocumentCode,
      code_verifier,
    }),
  );

  return token.data.access_token;
}
