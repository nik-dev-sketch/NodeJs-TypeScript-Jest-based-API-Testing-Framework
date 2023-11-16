import { getBaseUrl } from '../config/configs';
import { ServicepointsApiUrls, secondaryDHApiUris } from '../constants/api-url-helper';
import { CdrApiHeaders, cdrQueryParameters } from '../utils/headerUtils/header-utils';
import { RequestParams, RequestUtils } from '../utils/headerUtils/request-utils';

const baseUrl = getBaseUrl();
const requestUtils = new RequestUtils();

export async function getServicePointDetailResponse(
  headers: CdrApiHeaders,
  accountId: string,
  queryParams?: cdrQueryParameters,
) {
  const apiUrl: string = ServicepointsApiUrls.SERVICEPOINT_DETAIL.replace('{servicePointId}', accountId);
  const requestParams: RequestParams = { baseUrl, apiUrl, headers, queryParams };
  return requestUtils.get(requestParams);
}

export async function getServicepointsResponse(headers: CdrApiHeaders, queryParams?: cdrQueryParameters) {
  const apiUrl: string = ServicepointsApiUrls.SERVICEPOINTS;
  const requestParams: RequestParams = { baseUrl, apiUrl, headers, queryParams };
  return requestUtils.get(requestParams);
}

export async function getSecondaryDHServicepointsResponse(
  headers: CdrApiHeaders,
  requestBody: any,
  queryParams?: cdrQueryParameters,
) {
  const apiUrl: string = secondaryDHApiUris.SECONDARY_DH_SERVICEPOINTS;
  const requestParams: RequestParams = { baseUrl, apiUrl, headers, body: requestBody, queryParams };
  return requestUtils.post(requestParams);
}

export async function getSecondaryDHServicePointDetailResponse(
  headers: CdrApiHeaders,
  accountId: string,
  queryParams?: cdrQueryParameters,
) {
  const apiUrl: string = secondaryDHApiUris.SECONDARY_DH_SERVICEPOINT_DETAIL.replace('{servicePointId}', accountId);
  const requestParams: RequestParams = { baseUrl, apiUrl, headers, queryParams };
  return requestUtils.get(requestParams);
}
