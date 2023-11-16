import { linksandMetaResponse } from './linksandMetaResponse';

export interface agreedpaymentResponse extends linksandMetaResponse {
  data?: data;
}

export interface data {
  paymentSchedules?: paymentSchedules[];
}

export interface paymentSchedules {
  amount?: string;
  paymentScheduleUType?: cardDebit | directDebit | digitalWallet | manualPayment;
  cardDebit?: cardDebit;
  directDebit?: directDebit;
  digitalWallet?: digitalWallet;
  manualPayment?: manualPayment;
}

export interface cardDebit {
  cardScheme?: 'VISA' | 'MASTER';
  paymentFrequency?: string;
  calculationType?: string;
}

export interface directDebit {
  isTokenised?: boolean;
  bsb?: string;
  accountNumber?: string;
  paymentFrequency?: string;
  calculationType?: string;
}

export interface digitalWallet {
  name?: string;
  identifier?: string;
  type?: string;
  provider?: string;
  paymentFrequency?: string;
  calculationType?: string;
}

export interface manualPayment {
  billFrequency?: string;
}
