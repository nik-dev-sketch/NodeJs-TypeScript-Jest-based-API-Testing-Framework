import request from 'supertest';

import { getBaseUrl } from '../config/configs';
import * as apiUris from '../constants/api-url-helper';
import { CdrApiHeaders, cdrQueryParameters } from '../utils/headerUtils/header-utils';
import { RequestParams, RequestUtils } from '../utils/headerUtils/request-utils';

const baseUrl = getBaseUrl();
const requestUtils = new RequestUtils();

export async function getBalancesForEnergyAccounts(
  headers: CdrApiHeaders,
  accountId: string,
  queryParams?: cdrQueryParameters,
) {
  const apiUrl: string = apiUris.AccountsRelatedApiUrls.ACCOUNT_BALANCE.replace('{accountId}', accountId);
  const requestParams: RequestParams = { baseUrl, apiUrl, headers, queryParams };
  return requestUtils.get(requestParams);
}

export async function getBulkBalances(headers: CdrApiHeaders, queryParams?: cdrQueryParameters) {
  const apiUrl: string = apiUris.AccountsRelatedApiUrls.ACCOUNTS_BALANCES;
  const requestParams: RequestParams = { baseUrl, apiUrl, headers, queryParams };
  return requestUtils.get(requestParams);
}

export async function getBalanceForSpecificAccountResponse(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  requestBody: any,
  headers: CdrApiHeaders,
  queryParams?: cdrQueryParameters,
): Promise<request.Response> {
  const apiUrl: string = apiUris.AccountsRelatedApiUrls.ACCOUNTS_BALANCES;
  const requestParams: RequestParams = { baseUrl, apiUrl, headers, queryParams, body: requestBody };
  return requestUtils.post(requestParams);
}
