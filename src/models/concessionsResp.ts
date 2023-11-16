import { linksandMetaResponse } from './linksandMetaResponse';

export interface ConcessionsResponse extends linksandMetaResponse {
  data: Data;
}

export interface Data {
  concessions: Concessions[];
}

export interface Concessions {
  type: 'FIXED_AMOUNT' | 'FIXED_PERCENTAGE' | 'VARIABLE';
  displayName:
    | 'Annual Energy Concession'
    | 'SA Energy Concession'
    | 'Low Income Household Rebate'
    | 'QLD Government Electricity Rebate'
    | 'Service To Property Charge Concession';
  additionalInfo?: string;
  additionalInfoUri?: string;
  startDate?: string;
  endDate?: string;
  discountFrequency?: string;
  amount?: string;
  percentage?: string;
  appliedTo?: ['INVOICE' | 'USAGE' | 'SERVICE_CHARGE' | 'CONTROLLED_LOAD'];
}
