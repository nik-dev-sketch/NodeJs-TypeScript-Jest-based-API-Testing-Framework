// import clone from 'just-clone';
import request from 'supertest';

import 'jest-extended';
import 'jest-expect-message';
import { HttpStatus } from 'src/constants/httpStatus';

import { expect } from '../libs/jest-without-globals';
import * as responseSchema from '../models/paymentScheduleResp';

export async function validateAgreedPaymentResponse(response: request.Response) {
  const paymentScheduleResp: responseSchema.paymentSchedules = JSON.parse(
    JSON.stringify(response.body.data.paymentSchedules),
  );
  if (Object.keys(paymentScheduleResp).length !== 0) {
    expect(response.statusCode, '200').toBe(HttpStatus.OK);
    await validatePaymentScheduleFields(paymentScheduleResp);
  }
}

async function validatePaymentScheduleFields(paymentSchedules: responseSchema.paymentSchedules) {
  for (const i in paymentSchedules) {
    //expect(paymentSchedules[i]?.amount, 'amount').toBeTruthy();
    expect(paymentSchedules[i]?.paymentScheduleUType, 'paymentScheduleUType').toBeTruthy();
    const paymentScheduleUType = paymentSchedules[i].paymentScheduleUType;
    if (paymentScheduleUType == 'caedDebit') {
      const cardDebit: responseSchema.cardDebit = JSON.parse(JSON.stringify(paymentSchedules[i].cardDebit));
      await validateCardDebitFields(cardDebit);
    } else if (paymentScheduleUType == 'diectDebit') {
      const directDebit: responseSchema.directDebit = JSON.parse(JSON.stringify(paymentSchedules[i].directDebit));
      await validatedirectdebitFields(directDebit);
    } else if (paymentScheduleUType == 'digitalWallet') {
      const digitalWallet: responseSchema.digitalWallet = JSON.parse(JSON.stringify(paymentSchedules[i].digitalWallet));
      await validatedigitalWalletFields(digitalWallet);
    } else if (paymentScheduleUType == 'manualPayment') {
      const manualPayment: responseSchema.manualPayment = JSON.parse(JSON.stringify(paymentSchedules[i].manualPayment));
      await validatemanualPaymentFields(manualPayment);
    }
  }
}

async function validateCardDebitFields(cardDebit: responseSchema.cardDebit) {
  expect(cardDebit, 'cardDebit').toBeTrue();
  expect(cardDebit.cardScheme, 'cardScheme').toBeTruthy();
  expect(cardDebit.paymentFrequency, 'patmentFrequency').toBeTruthy();
  expect(cardDebit.calculationType, 'calculationType').toBeTruthy();
}

async function validatedirectdebitFields(directDebit: responseSchema.directDebit) {
  expect(directDebit, 'directDebit').toBeTruthy();
  expect(directDebit.isTokenised, 'isTokenised').toBeTruthy();
  expect(directDebit.paymentFrequency, 'patmentFrequency').toBeTruthy();
  expect(directDebit.calculationType, 'calculationType').toBeTruthy();
  expect(directDebit.bsb, 'bsb').toBeTrue();
  expect(directDebit.accountNumber, 'accountNumber').toBeTruthy();
}

async function validatedigitalWalletFields(digitalWallet: responseSchema.digitalWallet) {
  expect(digitalWallet, 'digitalWallet').toBeTruthy();
  expect(digitalWallet.name, 'name').toBeTruthy();
  expect(digitalWallet.paymentFrequency, 'patmentFrequency').toBeTruthy();
  expect(digitalWallet.calculationType, 'calculationType').toBeTruthy();
  expect(digitalWallet.provider, 'provider').toBeTruthy();
  expect(digitalWallet.type, 'type').toBeTruthy();
  expect(digitalWallet.identifier, 'identifier').toBeTruthy();
}

async function validatemanualPaymentFields(manualPayment: responseSchema.manualPayment) {
  expect(manualPayment, 'manualPayment').toBeTruthy();
  expect(manualPayment.billFrequency, 'billFrequency').toBeTruthy();
}
