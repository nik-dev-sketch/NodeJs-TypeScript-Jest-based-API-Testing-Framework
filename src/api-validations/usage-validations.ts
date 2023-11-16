import clone from 'just-clone';
import request from 'supertest';

import { expect } from '../libs/jest-without-globals';
import * as responseSchema from '../models/usageResp';

import { validateSuccessfulResponse } from './common-validations';

export async function validateSuccessfulUsageResponse(response: request.Response, emptyResp = false) {
  await validateSuccessfulResponse(response);
  const reads: responseSchema.Reads = clone(response.body.data.reads);
  if (!emptyResp && Object.keys(reads).length != 0) {
    await validateReadsProperties(reads);
  } else if (emptyResp) {
    expect(Object.keys(reads).length).toBeEmpty();
  }
}

async function validateReadsProperties(reads: responseSchema.Reads /**meterType: string, intervalReads: string*/) {
  for (const i in reads) {
    expect(reads[i].servicePointId).toBeTruthy();
    expect(reads[i].registerSuffix).toBeTruthy();
    expect(reads[i].readStartDate).toBeTruthy();
    expect(reads[i].unitOfMeasure).toBeTruthy();
    expect(reads[i].readUType).toBeTruthy();
    //if (meterType.length !== 0) expect(reads[i].readUType).toBe(meterType);
    if (reads[i].readUType == 'basicRead') {
      expect(reads[i].basicRead.value).toBeNumber();
    } else if (reads[i].readUType == 'intervalRead') {
      expect(reads[i].intervalRead.aggregateValue).toBeNumber();
    }
  }
}
