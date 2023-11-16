import { getBaseUrl } from '../config/configs';
import * as apiUris from '../constants/api-url-helper';
import { CdrApiHeaders, cdrQueryParameters } from '../utils/headerUtils/header-utils';
import { RequestParams, RequestUtils } from '../utils/headerUtils/request-utils';

import 'jest-extended';
import 'jest-chain';

const baseUrl = getBaseUrl();
const requestUtils = new RequestUtils();

export async function getEnergyAccountsResponse(headers: CdrApiHeaders, queryParams?: cdrQueryParameters) {
  const apiUrl: string = apiUris.AccountsRelatedApiUrls.COMMON_ENERGY;
  const requestParams: RequestParams = { baseUrl, apiUrl, headers, queryParams };
  return requestUtils.get(requestParams);
}

export async function getEnergyAccountsdetailResponse(headers: CdrApiHeaders, accountId: string) {
  const apiUrl: string = apiUris.AccountsRelatedApiUrls.ENERGY_DETAIL.replace('{accountId}', accountId);
  const requestParams: RequestParams = { baseUrl, apiUrl, headers };
  return requestUtils.get(requestParams);
}
