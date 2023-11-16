import { getBaseUrl } from '../config/configs';
import * as apiUris from '../constants/api-url-helper';
import { CdrApiHeaders, cdrQueryParameters } from '../utils/headerUtils/header-utils';
import { RequestParams, RequestUtils } from '../utils/headerUtils/request-utils';

const baseUrl = getBaseUrl();
const requestUtils = new RequestUtils();

export async function getConcessionsForAccount(
  headers: CdrApiHeaders,
  accountId: string,
  queryParams?: cdrQueryParameters,
) {
  const apiUrl: string = apiUris.AccountsRelatedApiUrls.CONCESSIONS.replace('{accountId}', accountId);
  const requestParams: RequestParams = { baseUrl, apiUrl, headers, queryParams };
  return requestUtils.get(requestParams);
}
