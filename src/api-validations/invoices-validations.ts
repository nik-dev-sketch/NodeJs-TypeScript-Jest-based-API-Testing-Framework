import request from 'supertest';

import 'jest-extended';
import 'jest-expect-message';
import { HttpStatus } from 'src/constants/httpStatus';

import { expect } from '../libs/jest-without-globals';
import * as responseSchema from '../models/invoicesResp';

import { validateSuccessfulResponse } from './common-validations';

const otherChargesTypeEnum = ['ENVIRONMENTAL', 'REGULATED', 'NETWORK', 'METERING', 'RETAIL_SERVICE', 'RCTI', 'OTHER'];
const paymentStatusEnum = ['PAID', 'PARTIALLY_PAID', 'NOT_PAID'];

export async function validateSuccessfulInvoicesResponse(response: request.Response, emptyResp = true) {
  await validateSuccessfulResponse(response);
  const resp: responseSchema.EnergyInvoiceList = JSON.parse(JSON.stringify(response.body));
  const invoices: responseSchema.Invoices = JSON.parse(JSON.stringify(resp.data.invoices));
  if (!emptyResp && Object.keys(invoices).length != 0) {
    expect(response.statusCode).toBe(HttpStatus.OK);
    await validateInvoicesProperties(invoices);
  } else if (emptyResp) {
    expect(response.statusCode).toBe(HttpStatus.OK);
    console.log('Invoices object is empty. Skipping detailed property validation');
    expect(invoices).toBeEmpty();
  }

  async function validateInvoicesProperties(invoices: responseSchema.Invoices) {
    for (const i in invoices) {
      expect(invoices[i].accountId).toBeString();
      expect(invoices[i].invoiceNumber).toBeString();
      expect(invoices[i].issueDate).toBeString();
      expect(invoices[i].period).toBeObject();
      expect(invoices[i].period.startDate).toBeString();
      expect(invoices[i].period.endDate).toBeString();
      expect(invoices[i].balanceAtIssue).toBeString();
      expect(invoices[i].servicePoints).toBeTruthy();
      expect(invoices[i].electricity).toBeTruthy();
      expect(invoices[i].electricity?.totalUsageCharges).toBeString();
      expect(invoices[i].electricity?.totalGenerationCredits).toBeString();
      expect(invoices[i].electricity?.totalOnceOffCharges).toBeString();
      expect(invoices[i].electricity?.totalOnceOffDiscounts).toBeString();
      expect(invoices[i].electricity?.otherCharges).toBeTruthy();
      expect(invoices[i].electricity?.otherCharges[0].amount).toBeString();
      expect(invoices[i].electricity?.otherCharges[0].description).toBeString();
      expect(invoices[i].electricity?.otherCharges[0].type).toBeString();
      expect(otherChargesTypeEnum).toContain(invoices[i].electricity?.otherCharges[0].type);
      expect(invoices[i].electricity?.totalGst).toBeString();
      expect(invoices[i].paymentStatus).toBeString();
      expect(paymentStatusEnum).toContain(invoices[i].paymentStatus);
      expect(typeof invoices[i].dueDate).toBeString();
      expect(invoices[i].invoiceAmount).toBeString();
      expect(invoices[i].gstAmount).toBeString();
    }
  }
}
