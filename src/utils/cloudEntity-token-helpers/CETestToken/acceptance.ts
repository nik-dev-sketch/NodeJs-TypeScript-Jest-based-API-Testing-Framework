import axios, { AxiosRequestHeaders } from 'axios';

import { ICETokenConfig } from './CETokenConfig';

export async function acceptLogin(
  config: ICETokenConfig,
  loginId: string,
  loginState: string,
  ceCustomerId: string,
  accessToken: string,
) {
  const acceptSession = {
    acr: 'urn:cds.au:cdr:3',
    amr: ['otp', 'mfa'],
    id: loginId,
    login_state: loginState,
    subject: ceCustomerId,
  };
  const headers: AxiosRequestHeaders = {};
  headers['Authorization'] = 'Bearer ' + accessToken;
  headers['Content-Type'] = 'application/json';
  headers['Accept'] = 'application/json';

  return axios.post(
    `https://${config.CE_BASE_URL}/api/system/logins/${encodeURIComponent(loginId)}/accept`,
    acceptSession,
    {
      headers: headers,
    },
  );
}

export async function acceptCDRArrangement(
  config: ICETokenConfig,
  ceCustomerId: string,
  accountIds: string[],
  granted_scopes: string[],
  loginId: string,
  loginState: string,
  accessToken: string,
) {
  const baseUrl = `https://${config.CE_BASE_URL}/${config.CE_SYSTEM_WORKSPACE}/cdr/cdr-arrangement/${loginId}/accept`;
  const headers: AxiosRequestHeaders = {};
  headers['Authorization'] = 'Bearer ' + accessToken;
  headers['Content-type'] = 'application/json';
  const redirectUri = await axios.post(
    baseUrl,
    {
      account_ids: accountIds,
      customer_id: ceCustomerId,
      granted_scopes: granted_scopes,
      login_state: loginState,
    },
    {
      headers: headers,
    },
  );
  return redirectUri.data;
}
