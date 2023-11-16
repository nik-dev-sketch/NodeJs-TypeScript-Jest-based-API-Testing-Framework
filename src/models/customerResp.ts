import { linksandMetaResponse } from './linksandMetaResponse';

export interface CustomerResponse extends linksandMetaResponse {
  data: data;
}

export interface CustomerDetailResponse extends linksandMetaResponse {
  data: data;
}

export interface CustomerStatusResponse extends linksandMetaResponse {
  data: data1;
}

export interface CustomerOutagesResponse extends linksandMetaResponse {
  data: data1;
}

export interface data {
  customerUType: string;
  person?: person;
  organisation?: organisation;
}

export interface data1 {
  status: string;
  explanation: string;
  detectionTime: string;
  expectedResolutionTime: string;
  updateTime: string;
}

export interface data2 {
  outages: outages[];
}

export interface outages {
  outageTime: string;
  duration: string;
  explanation: string;
}

export interface person {
  lastUpdateTime?: string;
  firstName?: string;
  lastName?: string;
  middleNames?: [string];
  prefix?: string;
  suffix?: string;
  occupationCode?: string;
  occupationCodeVersion?:
    | 'ANZSCO_1220.0_2006_V1.0'
    | 'ANZSCO_1220.0_2006_V1.1'
    | 'ANZSCO_1220.0_2013_V1.2'
    | 'ANZSCO_1220.0_2013_V1.3';
}

export interface personDetail extends person {
  phoneNumbers?: [phoneNumbers];
  emailAddresses?: [EmailAddresses];
  physicalAddresses?: [physicalAddresses];
}

export interface phoneNumbers {
  purpose?: 'HOME' | 'INTERNATIONAL' | 'MOBILE' | 'OTHER' | 'UNSPECIFIED' | 'WORK';
  number?: string;
  fullNumber?: string;
}

export interface EmailAddresses {
  purpose?: 'HOME' | 'OTHER' | 'UNSPECIFIED' | 'WORK';
  address?: string;
}

export interface physicalAddresses {
  addressUType?: paf | simple;
}

export interface paf {
  dpid?: string;
  thoroughfareNumber1?: 0;
  thoroughfareNumber1Suffix?: string;
  thoroughfareNumber2?: 0;
  thoroughfareNumber2Suffix?: string;
  flatUnitType?: string;
  flatUnitNumber?: string;
  floorLevelType?: string;
  floorLevelNumber?: string;
  lotNumber?: string;
  buildingName1?: string;
  buildingName2?: string;
  streetName?: string;
  streetType?: string;
  streetSuffix?: string;
  postalDeliveryType?: string;
  postalDeliveryNumber?: 0;
  postalDeliveryNumberPrefix?: string;
  postalDeliveryNumberSuffix?: string;
  localityName?: string;
  postcode?: string;
  state?: string;
}

export interface simple {
  mailingName?: string;
  addressLine1?: string;
  addressLine2?: string;
  addressLine3?: string;
  postcode?: string;
  city?: string;
  state?: string;
  country?: string;
}

export interface organisation {
  lastUpdateTime?: string;
  agentFirstName?: string;
  agentLastName: string;
  agentRole?: string;
  businessName?: string;
  legalName?: string;
  shortName?: string;
  abn?: string;
  acn?: string;
  registeredCountry?: string;
  establishmentDate?: string;
}

export interface OrganisationDetails extends organisation {
  physicalAddresses: physicalAddresses[];
}
