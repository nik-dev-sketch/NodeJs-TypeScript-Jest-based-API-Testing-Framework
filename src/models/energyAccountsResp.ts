import { linksandMetaResponse } from './linksandMetaResponse';

export interface energyAccountsResponse extends linksandMetaResponse {
  data?: data;
}

export interface data {
  accountId?: string;
  displayName?: string;
  accountNumber?: string;
  creationdate?: string;
  plans?: [plans];
  accounts?: [accounts];
}
export interface accounts {
  accountId?: string;
  accountNumber?: string;
  displayName: string;
  openStatus?: 'CLOSED' | 'OPEN';
  creationDate?: string;
  plans?: [plans];
}

export interface plans {
  nickname?: string;
  servicePointIds: [string];
  planDetail?: planDetail;
  planOverview?: planOverview;
}

export interface planOverview {
  displayName?: string;
  startDate: string;
  endDate: string;
}

export interface dataDetails extends data, plans, planOverview {}

export interface planDetail {
  fuelType: 'ELECTRICITY';
  electricityContract: electricityContract;
}

export interface electricityContract {
  isFixed: boolean;
  pricingModel: string;
  paymentOption: ['PAPER_BILL', 'BPAY', 'CREDIT_CARD', 'DIRECT_DEBIT', 'OTHER'];
  tarrifPeriod: [tarrifPeriod];
}

export interface tarrifPeriod {
  startDate: string;
  type: string;
  rateBlockUType: string;
  singlerate: singleRate;
}

export interface singleRate {
  rates: [rates];
}

export interface rates {
  unitPrice: string;
  measureUnit: string;
}
