import { getBaseUrl } from '../config/configs';
import { CustomerApiUrls } from '../constants/api-url-helper';
import { CdrApiHeaders, cdrQueryParameters, getRequestHeaders } from '../utils/headerUtils/header-utils';
import { RequestParams, RequestUtils } from '../utils/headerUtils/request-utils';

const baseUrl = getBaseUrl();
const requestUtils = new RequestUtils();

export async function getCustomer(requestHeaders: CdrApiHeaders, queryParams?: cdrQueryParameters) {
  const apiUrl: string = CustomerApiUrls.COMMON_CUSTOMER;
  const headers: CdrApiHeaders = await getRequestHeaders(requestHeaders);
  const requestParams: RequestParams = { baseUrl, apiUrl, headers, queryParams };
  return requestUtils.get(requestParams);
}

export async function getCustomerDetails(requestHeaders: CdrApiHeaders, queryParams?: cdrQueryParameters) {
  const apiUrl: string = CustomerApiUrls.CUSTOMER_DETAIL;
  const headers: CdrApiHeaders = await getRequestHeaders(requestHeaders);
  const requestParams: RequestParams = { baseUrl, apiUrl, headers, queryParams };
  return requestUtils.get(requestParams);
}

export async function getCustomerStatus(requestHeaders: CdrApiHeaders, queryParams?: cdrQueryParameters) {
  const apiUrl: string = CustomerApiUrls.CUSTOMER_STATUS;
  const headers: CdrApiHeaders = await getRequestHeaders(requestHeaders);
  const requestParams: RequestParams = { baseUrl, apiUrl, headers, queryParams };
  return requestUtils.get(requestParams);
}

export async function getCustomerOutages(requestHeaders: CdrApiHeaders, queryParams?: cdrQueryParameters) {
  const apiUrl: string = CustomerApiUrls.CUSTOMER_OUTAGES;
  const headers: CdrApiHeaders = await getRequestHeaders(requestHeaders);
  const requestParams: RequestParams = { baseUrl, apiUrl, headers, queryParams };
  return requestUtils.get(requestParams);
}
