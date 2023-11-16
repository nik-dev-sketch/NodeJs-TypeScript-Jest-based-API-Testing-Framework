import { linksandMetaResponse } from './linksandMetaResponse';

export interface EnergyInvoiceList extends linksandMetaResponse {
  data: Data;
}

export interface Data {
  invoices: Invoices[];
}

export interface Invoices {
  accountId: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate?: string;
  period: Period;
  invoiceAmount?: string;
  gstAmount?: string;
  payOnTimeDiscount?: PayOnTimeDiscount;
  balanceAtIssue: string;
  servicePoints: [string];
  gas: gas;
  electricity?: Electricity;
  accountCharges?: AccountCharges;
  paymentStatus: string;
}

export interface Period {
  startDate: string;
  endDate: string;
}

export interface PayOnTimeDiscount {
  discountAmount: string;
  gstAmount?: string;
  date: string;
}

export interface gas {
  totalUsageCharges: string;
  totalGenerationCredits: string;
  totalOnceOffCharges: string;
  totalOnceOffDiscounts: string;
  otherCharges?: OtherCharges[];
}

export interface Electricity extends gas {
  totalGst?: string;
}

export interface OtherCharges {
  type?: string;
  amount: string;
  description: string;
}

export interface AccountCharges {
  totalCharges: string;
  totalDiscounts: string;
  totalGst?: string;
}
