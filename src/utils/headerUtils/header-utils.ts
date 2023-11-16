import { HeaderFiles } from '../../constants/header-files';

export interface CdrApiHeaders {
  'x-v'?: string | null;
  'x-min-v'?: string | null;
  'x-fapi-interaction-id'?: string | null;
  'x-fapi-auth-date'?: string | null;
  'x-fapi-customer-ip-address'?: string | null;
  'x-cds-client-headers'?: string | null;
  'x-inject-cdr-customer-id'?: string | null;
  'x-inject-cdr-account-ids'?: string | null;
  Authorization?: string;
  Accept?: string | null;
  headersToBeRemoved?: string[];
}

export interface cdrQueryParameters {
  page?: number;
  'page-size'?: string;
  'oldest-date'?: string;
  'newest-date'?: string;
  'oldest-time'?: string;
  'newest-time'?: string;
  'interval-reads'?: string;
}

export interface CdrGenericApiHeaders {
  'x-v'?: string | null;
  'x-min-v'?: string | null;
  'x-fapi-interaction-id'?: string | null;
  'x-fapi-auth-date'?: string | null;
  'x-fapi-customer-ip-address'?: string | null;
  'x-cds-client-headers'?: string | null;
  'x-inject-cdr-customer-id'?: string | null;
  'x-inject-cdr-account-ids'?: string | null;
  Authorization?: string;
  Accept?: string | null;
  headersToBeRemoved?: string[];
}

export async function getRequestHeaders(requestHeaders: Partial<CdrApiHeaders> = {}) {
  const defaultHeaders: CdrApiHeaders = await getDefaultHeaders();
  let headers: CdrApiHeaders = {};
  if (requestHeaders && requestHeaders.headersToBeRemoved) {
    requestHeaders.headersToBeRemoved.forEach((header) => delete defaultHeaders[header]);
    headers = { ...defaultHeaders };
  }
  headers = { ...defaultHeaders, ...requestHeaders };
  return { ...headers };
}

export async function getHeaderWithCustomerId(
  customerId: string,
  requestHeaders: Partial<CdrApiHeaders> = {},
): Promise<CdrApiHeaders> {
  const headers = await getRequestHeaders(requestHeaders);
  headers['x-inject-cdr-customer-id'] = customerId;
  return { ...headers };
}

export async function getHeaderWithAccountId(
  accountId: string,
  requestHeaders: Partial<CdrApiHeaders> = {},
): Promise<CdrApiHeaders> {
  const headers = await getRequestHeaders(requestHeaders);
  headers['x-inject-cdr-account-ids'] = accountId;
  return { ...headers };
}

export async function getHeaderWithAccountId1(requestHeaders: Partial<CdrApiHeaders> = {}): Promise<CdrApiHeaders> {
  const headers = await getRequestHeaders(requestHeaders);
  return { ...headers };
}

export async function getHeaderWithCustomerIdAndAccountId(
  customerId: string,
  accountId: string,
  requestHeaders: Partial<CdrApiHeaders> = {},
): Promise<CdrApiHeaders> {
  const headers = await getRequestHeaders(requestHeaders);
  headers['x-inject-cdr-customer-id'] = customerId;
  headers['x-inject-cdr-account-ids'] = accountId;
  return { ...headers };
}

async function getHeadersAsObject(fileName: HeaderFiles): Promise<CdrApiHeaders> {
  const headerObject = (await import(`../../constants/${fileName}.json`)) as CdrApiHeaders;
  return headerObject;
}

async function getDefaultHeaders(): Promise<CdrApiHeaders> {
  const defaultHeaders = await getHeadersAsObject(HeaderFiles.DEFAULT_HEADERS);
  const headerObject = { ...defaultHeaders };
  delete headerObject['default'];
  return headerObject;
}
