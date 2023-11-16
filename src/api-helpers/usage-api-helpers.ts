import { CdrApiHeaders, cdrQueryParameters } from '../../src/utils/headerUtils/header-utils';
import { RequestParams, RequestUtils } from '../../src/utils/headerUtils/request-utils';
import { getBaseUrl } from '../config/configs';
import * as apiUris from '../constants/api-url-helper';

const baseUrl = getBaseUrl();
const requestUtils = new RequestUtils();

export async function getBulkUsage(headers: CdrApiHeaders, queryParams?: cdrQueryParameters) {
  const apiUrl: string = apiUris.ServicepointsApiUrls.SERVICEPOINTS_USAGE;
  const requestParams: RequestParams = { baseUrl, apiUrl, headers, queryParams };
  return requestUtils.get(requestParams);
}

export async function getUsageForServicepoint(
  headers: CdrApiHeaders,
  servicepointId: string,
  queryParams?: cdrQueryParameters,
) {
  const apiUrl: string = apiUris.ServicepointsApiUrls.SERVICEPOINT_USAGE.replace('{servicePointId}', servicepointId);
  const requestParams: RequestParams = queryParams
    ? { baseUrl, apiUrl, headers, queryParams }
    : { baseUrl, apiUrl, queryParams, headers };
  return requestUtils.get(requestParams);
}

export async function getUsageForSpecificServicePoints(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  requestBody: any,
  headers: CdrApiHeaders,
  queryParams?: cdrQueryParameters,
) {
  const apiUrl: string = apiUris.ServicepointsApiUrls.SERVICEPOINTS_USAGE;
  const requestParams: RequestParams = queryParams
    ? { baseUrl, apiUrl, headers, body: requestBody, queryParams }
    : { baseUrl, apiUrl, queryParams, headers, body: requestBody };
  return requestUtils.post(requestParams);
}

export async function getSecondaryDHUsageForServicepoint(
  headers: CdrApiHeaders,
  servicepointId: string,
  queryParams?: cdrQueryParameters,
) {
  const apiUrl: string = apiUris.secondaryDHApiUris.SECONDARY_DH_SERVICEPOINT_USAGE.replace(
    '{servicePointId}',
    servicepointId,
  );
  const requestParams: RequestParams = queryParams
    ? { baseUrl, apiUrl, headers, queryParams }
    : { baseUrl, apiUrl, queryParams, headers };
  return requestUtils.get(requestParams);
}

export async function getSecondaryDHUsageForSpecificServicePoints(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  requestBody: any,
  headers: CdrApiHeaders,
  queryParams?: cdrQueryParameters,
) {
  const apiUrl: string = apiUris.secondaryDHApiUris.SECONDARY_DH_SERVICEPOINTS_SPECIFIC_USAGE;
  const requestParams: RequestParams = queryParams
    ? { baseUrl, apiUrl, headers, body: requestBody, queryParams }
    : { baseUrl, apiUrl, queryParams, headers, body: requestBody };
  return requestUtils.post(requestParams);
}
