import axios, { AxiosRequestHeaders } from 'axios';

import { ICETokenConfig } from './CETokenConfig';

export async function getCDRArrangementSystem(
  config: ICETokenConfig,
  loginId: string,
  loginState: string,
  accessToken: string,
) {
  const headers: AxiosRequestHeaders = {};
  headers['Authorization'] = `Bearer ${accessToken}`;
  headers['Accept'] = 'application/json';
  const queryParameters: Record<string, string> = {};
  queryParameters['login_state'] = loginState;
  return axios.get(
    `https://${config.CE_BASE_URL}/${config.CE_SYSTEM_WORKSPACE}/cdr/cdr-arrangement/${encodeURIComponent(loginId)}`,
    {
      headers: headers,
      params: queryParameters,
      withCredentials: true,
    },
  );
}
