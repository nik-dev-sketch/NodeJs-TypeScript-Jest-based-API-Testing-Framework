import { linksandMetaResponse } from './linksandMetaResponse';
export interface BillingResponse extends linksandMetaResponse {
  data: Data;
}

export interface Data {
  transactions: Transactions[];
}

export interface Transactions {
  accountId: string;
  executionDateTime: string;
  gst?: string;
  transactionUType: 'usage' | 'demand' | 'onceOff' | 'otherCharges' | 'payment';
  usage?: Usage;
  demand?: Demand;
  onceOff?: OnceOff;
  otherCharges?: OtherCharges;
  payment?: Payment;
}

export interface Usage {
  servicePointId?: string;
  invoiceNumber?: string;
  timeOfUseType:
    | 'PEAK'
    | 'OFF_PEAK'
    | 'OFF_PEAK_DEMAND_CHARGE'
    | 'SHOULDER'
    | 'SHOULDER1'
    | 'SHOULDER2'
    | 'CONTROLLED_LOAD'
    | 'SOLAR'
    | 'AGGREGATE';
  description?: string;
  isEstimate?: boolean;
  startDate: string;
  endDate: string;
  measureUnit?: 'KWH' | 'KVA' | 'KVAR' | 'KVARH' | 'KW' | 'DAYS' | 'METER' | 'MONTH';
  usage: number;
  amount: string;
  calculationFactors?: CalculationFactors[];
  adjustments?: Adjustments[];
}

export interface Demand {
  servicePointId?: string;
  invoiceNumber?: string;
  timeOfUseType:
    | 'PEAK'
    | 'OFF_PEAK'
    | 'OFF_PEAK_DEMAND_CHARGE'
    | 'SHOULDER'
    | 'SHOULDER1'
    | 'SHOULDER2'
    | 'CONTROLLED_LOAD'
    | 'SOLAR'
    | 'AGGREGATE';
  description?: string;
  isEstimate?: boolean;
  startDate: string;
  endDate: string;
  rate: number;
  amount: string;
  calculationFactors?: CalculationFactors[];
  adjustments?: Adjustments[];
}

export interface OnceOff {
  servicePointId?: string;
  invoiceNumber?: string;
  amount: string;
  description: string;
}

export interface OtherCharges {
  description?: string;
  invoiceNumber?: string;
  amount: string;
  servicePointId?: string;
  endDate?: string;
  startDate?: string;
  type?: 'ENVIRONMENTAL' | 'REGULATED' | 'NETWORK' | 'METERING' | 'RETAIL_SERVICE' | 'RCTI' | 'OTHER' | 'DLF' | 'MLF';
  calculationFactors?: CalculationFactors[];
  adjustments?: Adjustments[];
}

export interface Payment {
  amount?: string;
  method: 'DIRECT_DEBIT' | 'CARD' | 'TRANSFER' | 'BPAY' | 'CASH' | 'CHEQUE' | 'OTHER';
}

export interface CalculationFactors {
  value: number;
  type: 'DLF' | 'MLF';
}

export interface Adjustments {
  amount: string;
  description: string;
}
