export enum errorCodes {
  //Status Code: 400
  MISSING_REQUIRED_FIELD = 'urn:au-cds:error:cds-all:Field/Missing',
  MISSING_REQUIRED_HEADER = 'urn:au-cds:error:cds-all:Header/Missing',
  INVALID_FIELD = 'urn:au-cds:error:cds-all:Field/Invalid',
  INVALID_HEADER = 'urn:au-cds:error:cds-all:Header/Invalid',
  INVALID_DATE = 'urn:au-cds:error:cds-all:Field/InvalidDateTime',
  INVALID_PAGE_SIZE = 'urn:au-cds:error:cds-all:Field/InvalidPageSize',
  INVALID_VERSION = 'urn:au-cds:error:cds-all:Header/InvalidVersion',

  //Status Code: 403
  ADR_STATUS_NOT_ACTIVE = 'urn:au-cds:error:cds-all:Authorisation/AdrStatusNotActive',
  CONSENT_IS_REVOKED = 'urn:au-cds:error:cds-all:Authorisation/RevokedConsent',
  CONSENT_IS_INVALID = 'urn:au-cds:error:cds-all:Authorisation/InvalidConsent',

  //Status Code: 404
  RESOURCE_NOT_IMPLEMENTED = 'urn:au-cds:error:cds-all:Resource/NotImplemented',
  RESOURCE_NOT_FOUND = 'urn:au-cds:error:cds-all:Resource/NotFound',
  INVALID_RESOURCE = 'urn:au-cds:error:cds-all:Resource/Invalid',
  UNAVAILABLE_RESOURCE = 'urn:au-cds:error:cds-all:Resource/Unavailable',
  INVALID_ENERGY_ACCOUNT = 'urn:au-cds:error:cds-energy:Authorisation/InvalidEnergyAccount',
  UNAVAILABLE_ENERGY_ACCOUNT = 'urn:au-cds:error:cds-energy:Authorisation/UnavailableEnergyAccount',
  INVALID_SERVICE_POINT = 'urn:au-cds:error:cds-energy:Authorisation/InvalidServicePoint',
  UNAVAILABLE_SERVICE_POINT = 'urn:au-cds:error:cds-energy:Authorisation/UnavailableServicePoint',

  //Status Code: 406
  UNSUPPORTED_VERSION = 'urn:au-cds:error:cds-all:Header/UnsupportedVersion',

  //Status Code: 422
  INVALID_CONSENT_ARRANGEMENT = 'urn:au-cds:error:cds-all:Authorisation/InvalidArrangement',
  INVALID_PAGE = 'urn:au-cds:error:cds-all:Field/InvalidPage',
  UNPROCESSABLE_ENTITY_INVALID_ENERGY = 'urn:au-cds:error:cds-energy:Authorisation/InvalidEnergyAccount',
  UNPROCESSABLE_ENTITY_UNAVAILABLE_ENERGY = 'urn:au-cds:error:cds-energy:Authorisation/UnavailableEnergyAccount',
  UNPROCESSABLE_ENTITY_INVALID_SERVICE_POINT = 'urn:au-cds:error:cds-energy:Authorisation/InvalidServicePoint',
  UNPROCESSABLE_ENTITY_UNAVAILABLE_SERVICE_POINT = 'urn:au-cds:error:cds-energy:Authorisation/UnavailableServicePoint',
}

export enum errorTitles {
  CONSENT_IS_INVALID = 'Consent Is Invalid',
}
