import clone from 'just-clone';
import request from 'supertest';

import { HttpStatus } from 'src/constants/httpStatus';

import { expect } from '../libs/jest-without-globals';
import * as responseSchema from '../models/energyAccountsResp';
import * as linksandMetaSchema from '../models/linksandMetaResponse';

export async function validateEnergyAccountsResponse(
  response: request.Response,
  emptyResponse = false,
  details = true,
) {
  const resp: responseSchema.accounts = clone(response.body.data.accounts);
  const linksResp: linksandMetaSchema.Links = clone(response.body.links);
  const metaResp: linksandMetaSchema.Meta = clone(response.body.meta);
  const detailResp: responseSchema.dataDetails = clone(response.body.data);
  if (!details) {
    if (
      !emptyResponse &&
      Object.keys(resp).length !== 0 &&
      Object.keys(linksResp).length !== 0 &&
      Object.keys(metaResp).length !== 0
    ) {
      expect(response.statusCode).toBe(HttpStatus.OK);
      await validateAccounts(resp);
      await validateLinks(linksResp);
      await validateMeta(metaResp);
    } else if (emptyResponse && Object.keys(resp).length === 0) {
      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(resp).toBeEmpty();
    }
  } else if (details) {
    if (!emptyResponse && Object.keys(detailResp).length !== 0) {
      expect(response.statusCode).toBe(HttpStatus.OK);
      await validateDetailsData(detailResp);
    } else if (emptyResponse && Object.keys(detailResp).length === 0) {
      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(detailResp).toBeEmpty();
    }
  }
}

async function validateAccounts(accounts: responseSchema.accounts) {
  for (const i in accounts) {
    expect(accounts[i].accountId).toBeTruthy();
    expect(accounts[i].plans).toBeTruthy();
    expect(accounts[i].plans[0].servicePointIds).toBeTruthy();
    expect(accounts[i].plans[0].planOverview).toBeTruthy();
    expect(accounts[i].plans[0].planOverview.startDate).toBeTruthy();
  }
}

async function validateLinks(links: linksandMetaSchema.Links) {
  for (const j in links) {
    expect(links[j]?.self).toBeTruthy();
    expect(links[j]?.first).toBeTruthy();
    expect(links[j]?.prev).toBeTruthy();
    expect(links[j]?.next).toBeTruthy();
    expect(links[j]?.last).toBeTruthy();
  }
}

async function validateMeta(meta: linksandMetaSchema.Meta) {
  for (const k in meta) {
    expect(meta[k].totalRecords).toBeTruthy();
    expect(meta[k]?.totalPages).toBeTruthy();
  }
}

async function validateDetailsData(data: responseSchema.dataDetails) {
  for (const l in data) {
    expect(data[l].accountId).toBeTruthy();
    expect(data[l].plans).toBeTruthy();
    expect(data[l].plans[0].servicePointIds).toBeTruthy();
    expect(data[l].plans[0].planOverview).toBeTruthy();
    expect(data[l].plans[0].planOverview.startDate).toBeTruthy();
    expect(data[l].plans[0].planDetail.fuelType).toContain('ELECTRICITY');
    expect(data[l].plans[0].planDetail.electricityContract.isFixed).toBeBoolean();
    expect(data[l].plans[0].planDetail.electricityContract.pricingModel).toBeTruthy();
    expect(data[l].plans[0].planDetail.paymentOption).toBeOneOf([
      'PAPER_BILL',
      'BPAY',
      'CREDIT_CARD',
      'DIRECT_DEBIT',
      'OTHER',
    ]);
    expect(data[l].plans[0].planDetail.paymentOption).toBeTruthy();
    expect(data[l].plans[0].planDetail.paymentOption.startDate).toBeTruthy();
    expect(data[l].plans[0].planDetail.tarrifPeriod.rateBlockUType).toContain('SINGLE RATE');
    expect(data[l].plans[0].planDetail.tarrifPeriod.rateBlockUType).toContain('SINGLE RATE');
    expect(data[l].plans[0].planDetail.tarrifPeriod.singleRate).toBeTruthy();
    expect(data[l].plans[0].planDetail.tarrifPeriod.singleRate.rates).toBeTruthy();
    expect(data[l].plans[0].planDetail.tarrifPeriod.singleRate.rates[0].unitPrice).toBeTruthy();
    expect(data[l].plans[0].planDetail.tarrifPeriod.singleRate.rates[0].measureUnit).toBeTruthy();
  }
}
