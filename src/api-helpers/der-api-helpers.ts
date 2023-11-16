import { getBaseUrl } from '../config/configs';
import { ServicepointsApiUrls, secondaryDHApiUris } from '../constants/api-url-helper';
import { CdrApiHeaders, cdrQueryParameters } from '../utils/headerUtils/header-utils';
import { RequestParams, RequestUtils } from '../utils/headerUtils/request-utils';

const baseUrl = getBaseUrl();
const requestUtils = new RequestUtils();

export async function getBulkDer(headers: CdrApiHeaders, queryParams?: cdrQueryParameters) {
  const apiUrl: string = ServicepointsApiUrls.SERVICEPOINTS_DER;
  const requestParams: RequestParams = { baseUrl, apiUrl, headers, queryParams };
  return requestUtils.get(requestParams);
}

export async function getDerForServicepoint(
  headers: CdrApiHeaders,
  servicePointId: string,
  queryParams?: cdrQueryParameters,
) {
  const apiUrl: string = ServicepointsApiUrls.SERVICEPOINT_DER.replace('{servicePointId}', servicePointId);
  const requestParams: RequestParams = { baseUrl, apiUrl, headers, queryParams };
  return requestUtils.get(requestParams);
}

export async function getDerForSpecificServicepoint(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  requestBody: any,
  headers: CdrApiHeaders,
  queryParams?: cdrQueryParameters,
) {
  const apiUrl: string = ServicepointsApiUrls.SERVICEPOINTS_DER;
  const requestParams: RequestParams = { baseUrl, apiUrl, headers, body: requestBody, queryParams };
  return requestUtils.post(requestParams);
}

export async function getSecondaryDHDerForServicepoint(
  headers: CdrApiHeaders,
  servicePointId: string,
  queryParams?: cdrQueryParameters,
) {
  const apiUrl: string = secondaryDHApiUris.SECONDARY_DH_SERVICEPOINT_DER.replace('{servicePointId}', servicePointId);
  const requestParams: RequestParams = { baseUrl, apiUrl, headers, queryParams };
  return requestUtils.get(requestParams);
}

export async function getSecondaryDHDerForSpecificServicepoint(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  requestBody: any,
  headers: CdrApiHeaders,
  queryParams?: cdrQueryParameters,
) {
  const apiUrl: string = secondaryDHApiUris.SECONDARY_DH_SERVICEPOINTS_SPECIFIC_DER;
  const requestParams: RequestParams = { baseUrl, apiUrl, headers, body: requestBody, queryParams };
  return requestUtils.post(requestParams);
}
