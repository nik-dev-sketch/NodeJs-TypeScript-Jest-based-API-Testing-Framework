import request from 'supertest';

import { HttpStatus } from 'src/constants/httpStatus';

import { expect } from '../libs/jest-without-globals';
import * as responseSchema from '../models/billingResp';

import { validateSuccessfulResponse } from './common-validations';
import 'jest-extended';

export async function validateSuccessfulBillingResponse(response: request.Response, emptyResponse = true) {
  await validateSuccessfulResponse(response);
  const resp: responseSchema.BillingResponse = JSON.parse(JSON.stringify(response.body));
  const transactions: responseSchema.Transactions = JSON.parse(JSON.stringify(resp.data.transactions));
  if (!emptyResponse && Object.keys(transactions).length != 0) {
    expect(response.statusCode).toBe(HttpStatus.OK);
    await validateTransaction(transactions);
  } else if (emptyResponse && Object.keys(transactions).length === 0) {
    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(transactions).toBeEmpty();
  }
}
async function validateTransaction(transactions: responseSchema.Transactions) {
  for (const t in transactions) {
    expect(transactions[t].executionDateTime).toBeTruthy();
    expect(transactions[t].gst).toBeTruthy();
    expect(transactions[t].accountId).toBeTruthy();
    expect(transactions[t].transactionUType).toBeTruthy();
    if (transactions[t].transactionUType == 'usage') {
      const usage: responseSchema.Usage = JSON.parse(JSON.stringify(transactions[t].usage));
      await validateUsage(usage);
    } else if (transactions[t].transactionUType == 'demand') {
      const demand: responseSchema.Demand = JSON.parse(JSON.stringify(transactions[t].demand));
      await validateDemand(demand);
    } else if (transactions[t].transactionUType == 'onceOff') {
      const onceOff: responseSchema.OnceOff = JSON.parse(JSON.stringify(transactions[t].onceOff));
      await validateOnceOff(onceOff);
    } else if (transactions[t].transactionUType == 'otherCharges') {
      const otherCharges: responseSchema.OtherCharges = JSON.parse(JSON.stringify(transactions[t].otherCharges));
      await validateOtherCharges(otherCharges);
    } else if (transactions[t].transactionUType == 'payment') {
      const payment: responseSchema.Payment = JSON.parse(JSON.stringify(transactions[t].payment));
      await validatePaymentProperties(payment);
    }
  }
}

async function validateUsage(usage: responseSchema.Usage) {
  expect(usage.servicePointId).toBeString();
  expect(usage.invoiceNumber).toBeString();
  expect(usage.timeOfUseType).toBeString();
  expect(usage.description).toBeString();
  expect(usage.isEstimate).toBeBoolean();
  expect(usage.startDate).toBeString();
  expect(usage.endDate).toBeString();
  expect(usage.measureUnit).toBeString();
  expect(usage.usage).toBeNumber();
  expect(usage.amount).toBeString();
}

async function validateDemand(demand: responseSchema.Demand) {
  expect(demand.servicePointId).toBeString();
  expect(demand.invoiceNumber).toBeString();
  expect(demand.timeOfUseType).toBeString();
  expect(demand.description).toBeString();
  expect(demand.isEstimate).toBeBoolean();
  expect(demand.startDate).toBeString();
  expect(demand.endDate).toBeString();
  expect(demand.rate).toBeString();
  expect(demand.amount).toBeString();
}

async function validateOnceOff(onceOff: responseSchema.OnceOff) {
  expect(onceOff.servicePointId).toBeString();
  expect(typeof onceOff.invoiceNumber).toBeString();
  expect(onceOff.amount).toBeString();
  expect(onceOff.description).toBeString();
}

async function validateOtherCharges(otherCharges: responseSchema.OtherCharges) {
  expect(otherCharges.description).toBeString();
  expect(otherCharges.invoiceNumber).toBeString();
  expect(otherCharges.amount).toBeString();
  expect(otherCharges.servicePointId).toBeString();
  expect(otherCharges.endDate).toBeString();
  expect(otherCharges.startDate).toBeString();
  expect(otherCharges.type).toBeString();
}

async function validatePaymentProperties(payment: responseSchema.Payment) {
  expect(payment.amount).toBeString();
  expect(payment.method).toBeString();
}
