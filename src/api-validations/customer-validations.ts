//import clone from 'just-clone';
import request from 'supertest';

import { HttpStatus } from 'src/constants/httpStatus';

import { expect } from '../libs/jest-without-globals';
import * as responseSchema from '../models/customerResp';

export async function validateSuccesfulCustomerResponse(response: request.Response) {
  const custResponse: responseSchema.data = JSON.parse(JSON.stringify(response.body.data));
  console.log(custResponse);
  expect(response.statusCode).toBe(HttpStatus.OK);
  await validateCustomerResponseFields(custResponse);
}

export async function validatesuccesfulCustomerDetailResponse(response: request.Response) {
  const custDetailResponse: responseSchema.data = JSON.parse(JSON.stringify(response.body.data));
  console.log(custDetailResponse);
  expect(response.statusCode).toBe(HttpStatus.OK);
  await validateCustomerDetailResponseFields(custDetailResponse);
}

export async function validatesuccesfulCustomerStatusResponse(response: request.Response) {
  const custStatusResponse: responseSchema.data1 = JSON.parse(JSON.stringify(response.body.data));
  console.log(custStatusResponse);
  expect(response.statusCode).toBe(HttpStatus.OK);
  await valdiateCustomerStatusResponseFields(custStatusResponse);
}

export async function validatesuccesfulCustomerOutagesResponse(response: request.Response) {
  const custOutagesResponse: responseSchema.data2 = JSON.parse(JSON.stringify(response.body.data));
  console.log(custOutagesResponse);
  expect(response.statusCode).toBe(HttpStatus.OK);
  await valdiateCustomerOutagesResponseFields(custOutagesResponse);
}

async function validateCustomerResponseFields(data: responseSchema.data) {
  for (const i in data) {
    expect(data[i].customerUType).toBeTruthy();
    expect(data[i].organisation).toBeTruthy();
    expect(data[i].person).toBeFalsy();
    expect(data[i].organisation.agentLastName).toBeTruthy();
    expect(data[i].organisation.agentRole).toBeTruthy();
  }
}

async function validateCustomerDetailResponseFields(data: responseSchema.data) {
  for (const j in data) {
    expect(data[j].customerUType).toBeTruthy();
    expect(data[j].organisation).toBeTruthy();
    expect(data[j].organisation.agentRole).toBeTruthy();
    expect(data[j].organisation.agentLastName).toBeTruthy();
    expect(data[j].organisation.physicalAddresses).toBeTruthy();
    expect(data[j].organisation.physicalAddresses.simple).toBeTruthy();
    expect(data[j].organisation.physicalAddresses.simple.addressLine1).toBeTruthy();
    expect(data[j].organisation.physicalAddresses.simple.city).toBeTruthy();
    expect(data[j].organisation.physicalAddresses.simple.country).toBeTruthy();
    expect(data[j].organisation.physicalAddresses.simple.postcode).toBeTruthy();
  }
}

async function valdiateCustomerStatusResponseFields(data: responseSchema.data1) {
  for (const k in data) {
    expect(data[k].status).toBeTruthy();
    expect(data[k].explanation).toBeTruthy();
    expect(data[k].detectionTime).toBeTruthy();
    expect(data[k].extectedResolutionTime).toBeTruthy();
    expect(data[k].updateTime).toBeTruthy();
  }
}

async function valdiateCustomerOutagesResponseFields(data: responseSchema.data2) {
  for (const l in data) {
    expect(data[l].outages).toBeTruthy();
    expect(data[l].outages[0].outageTime).toBeTruthy();
    expect(data[l].outages[0].duration).toBeTruthy();
    expect(data[l].outages[0].isPartial).toBeBoolean();
    expect(data[l].outages[0].explanation).toBeTruthy();
  }
}
