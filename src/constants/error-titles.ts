export enum errorTitles {
  //Status Code: 400
  MISSING_REQUIRED_FIELD = 'Missing Required Field',
  MISSING_REQUIRED_HEADER = 'Missing Required Header',
  INVALID_FIELD = 'Invalid Field',
  INVALID_HEADER = 'Invalid Header',
  INVALID_DATE = 'Invalid Date',
  INVALID_PAGE_SIZE = 'Invalid Page Size',
  INVALID_VERSION = 'Invalid Version',

  //Status Code: 403
  ADR_STATUS_NOT_ACTIVE = 'ADR Status Is Not Active',
  CONSENT_IS_REVOKED = 'Consent Is Revoked',
  CONSENT_IS_INVALID = 'Consent Is Invalid',

  //Status Code: 404
  RESOURCE_NOT_IMPLEMENTED = 'Resource Not Implemented',
  RESOURCE_NOT_FOUND = 'Resource Not Found',
  INVALID_RESOURCE = 'Invalid Resource',
  UNAVAILABLE_RESOURCE = 'Unavailable Resource',
  INVALID_ENERGY_ACCOUNT = 'Invalid Energy Account',
  UNAVAILABLE_ENERGY_ACCOUNT = 'Unavailable Energy Account',
  INVALID_SERVICE_POINT = 'Invalid Service Point',
  UNAVAILABLE_SERVICE_POINT = 'Unavailable Service Point',

  //Status Code: 406
  UNSUPPORTED_VERSION = 'Unsupported Version',

  //Status Code: 422
  INVALID_CONSENT_ARRANGEMENT = 'Invalid Consent Arrangement',
  INVALID_PAGE = 'Invalid Page',
  UNPROCESSABLE_ENTITY_INVALID_ENERGY = 'Invalid Energy Account',
  UNPROCESSABLE_ENTITY_UNAVAILABLE_ENERGY = 'Unavailable Energy Account',
  UNPROCESSABLE_ENTITY_INVALID_SERVICE_POINT = 'Invalid Service Point',
  UNPROCESSABLE_ENTITY_UNAVAILABLE_SERVICE_POINT = 'Unavailable Service Point',
}
