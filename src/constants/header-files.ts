import { CdrApiHeaders } from '../utils/headerUtils/header-utils';
export const enum HeaderFiles {
  DEFAULT_HEADERS = 'defaultHeaders',
  MANDATORY_HEADERS = 'mandatoryHeaders',
  ACCEPT_INCORRECT = 'headersWithIncorrectAccept',
  VERSION_NULL = 'headersWithNullVersion',
  VERSION_NON_SUPPORTED = 'headersWithNonSupportedVersion',
  VERSION_INCORRECT = 'headersWithIncorrectVersion',
  VERSION_NOT_AVAILABLE = 'headersWithVersionNotAvailable',
  WITHOUT_VERSION = 'headersWithoutVersion',
  WITHOUT_AUTH_DATE = 'headersWithoutAuthDate',
}

export const headers: CdrApiHeaders = {
  'x-v': '1',
  'x-cds-client-headers': '70dac54929e54449acda333f0d146f8c',
  'x-fapi-customer-ip-address': '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
  'x-fapi-auth-date': '2022-08-01',
  'x-fapi-interaction-id': '2934-E346-3867-12B8-AU34',
};

export const version2Headers: CdrApiHeaders = {
  'x-v': '2',
  'x-cds-client-headers': '70dac54929e54449acda333f0d146f8c',
  'x-fapi-customer-ip-address': '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
  'x-fapi-auth-date': '2022-08-01',
  'x-fapi-interaction-id': '2934-E346-3867-12B8-AU34',
};
export const EnergyHeaders: CdrApiHeaders = {
  'x-v': '2',
  'x-cds-client-headers': '70dac54929e54449acda333f0d146f8c',
  'x-fapi-auth-date': '2022-08-01',
  'x-fapi-interaction-id': '2834-E345-3888-12B7-UU14',
};

export const invalidVersionHeaders: CdrApiHeaders = {
  'x-v': '-1',
  'x-cds-client-headers': '70dac54929e54449acda333f0d146f8c',
  'x-fapi-customer-ip-address': '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
  'x-fapi-auth-date': '2022-08-01',
  'x-fapi-interaction-id': '2934-E346-3867-12B8-AU64',
};

export const unsupportedVersionHeaders: CdrApiHeaders = {
  'x-v': '4',
  'x-cds-client-headers': '70dac54929e54449acda333f0d146f8c',
  'x-fapi-customer-ip-address': '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
  'x-fapi-auth-date': '2022-08-01',
  'x-fapi-interaction-id': '2934-E346-3867-12B8-AU94',
};
