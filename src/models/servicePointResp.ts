import { linksandMetaResponse } from './linksandMetaResponse';

export interface serviceResponse extends linksandMetaResponse {
  data: dataSP;
}

export interface dataSP {
  servicePoints: servicePoints[];
}
export interface servicePoints {
  servicePointId: string;
  nationalMeteringId: string;
  servicePointClassification: string;
  servicePointStatus: string;
  jurisdictionCode: string;
  isGenerator?: true;
  validFromDate: string;
  lastUpdateDateTime: string;
  consumerProfile: consumerProfile;
}

export interface servicePointDetailResponse extends linksandMetaResponse {
  data: dataSPD;
}
export interface dataSPD extends servicePoints {
  distributionLossFactor: distributionLossFactor;
  relatedParticipants: relatedParticipants[];
  location: location;
  meters: meters[];
}

export interface consumerProfile {
  classification: 'RESIDENTIAL';
  threshold?: string;
}

export interface distributionLossFactor {
  code: string;
  description: string;
  lossValue: string;
}

export interface relatedParticipants {
  party:
    | 'EnergyAustralia Pty Ltd'
    | 'Ausgrid Operator Partnership'
    | 'Energex Limited'
    | 'United Energy Distribution Pty Ltd'
    | 'Essential Energy'
    | 'AusNet Electricity Services Pty Ltd';
  role: 'FRMP' | 'LNSP';
}

export interface location {
  addressUType: 'paf';
  simple: simple;
  paf: paf;
}
export interface simple {
  mailingName: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  postcode: string;
  city: string;
  state: string;
  country: string;
}

export interface paf {
  dpid: string;
  thoroughfareNumber1: number;
  thoroughfareNumber1Suffix: string;
  thoroughfareNumber2: number;
  thoroughfareNumber2Suffix: string;
  flatUnitType: string;
  flatUnitNumber: string;
  floorLevelType: string;
  floorLevelNumber: string;
  lotNumber: string;
  buildingName1: string;
  buildingName2: string;
  streetName: string;
  streetType: string;
  streetSuffix: string;
  postalDeliveryType: string;
  postalDeliveryNumber: number;
  postalDeliveryNumberPrefix: string;
  postalDeliveryNumberSuffix: string;
  localityName: string;
  postcode: string;
  state: string;
}

export interface meters {
  meterId: string;
  specifications: specifications;
  registers: registers[];
}

export interface specifications {
  status: string;
  installationType: string;
  manufacturer: string;
  model: string;
  readType: string;
  nextScheduledReadDate: string;
}

export interface registers {
  registerId: string;
  registerSuffix: string;
  averagedDailyLoad: number;
  registerConsumptionType: string;
  networkTariffCode: string;
  unitOfMeasure: string;
  timeOfDay: string;
  multiplier: number;
  controlledLoad: true;
  consumptionType: string;
}
