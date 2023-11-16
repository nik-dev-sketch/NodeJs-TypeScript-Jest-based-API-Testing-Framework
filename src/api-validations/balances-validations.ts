import clone from 'just-clone';
import request from 'supertest';

import { HttpStatus } from 'src/constants/httpStatus';

import * as responseSchema from '../../src/models/balancesResp';
import { expect } from '../libs/jest-without-globals';

export async function validateBalanceResponse(response: request.Response, bulkBalance = true) {
  const balances: responseSchema.balances = clone(response.body.data.balances);
  console.log(balances);
  const balanceResp: responseSchema.balanceReponse = clone(response.body.data);
  console.log(balanceResp);
  if (bulkBalance && Object.keys(balances).length !== 0) {
    expect(response.statusCode).toBe(HttpStatus.OK);
    await validateBalancesFields(balances);
  }
  if (!bulkBalance && Object.keys(balanceResp).length !== 0) {
    expect(response.statusCode).toBe(HttpStatus.OK);
    await validateBalanceDataFields(balanceResp);
  }
}

async function validateBalancesFields(balances: responseSchema.balances) {
  for (const i in balances) {
    expect(balances[i]?.accountId).toBeTruthy();
    expect(balances[i]?.balance).toBeTruthy();
  }
}

async function validateBalanceDataFields(balanceResp: responseSchema.balanceReponse) {
  for (const i in balanceResp) {
    expect(balanceResp[i]?.data).toBeTruthy();
    expect(balanceResp[i]?.data?.balance).toBeTruthy();
  }
}
