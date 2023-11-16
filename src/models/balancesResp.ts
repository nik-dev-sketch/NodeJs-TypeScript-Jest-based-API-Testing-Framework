import { linksandMetaResponse } from './linksandMetaResponse';

export interface balanceReponse extends linksandMetaResponse {
  data: data;
}

export interface data {
  balance?: string;
  balances?: balances[];
}

export interface balances {
  accountId?: string;
  balance?: string;
}
