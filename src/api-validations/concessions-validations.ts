import request from 'supertest';

import { HttpStatus } from 'src/constants/httpStatus';

import { expect } from '../libs/jest-without-globals';
import * as responseSchema from '../models/concessionsResp';

export async function validateSuccessfulConcessionsResponse(response: request.Response, emptyResp = false) {
  const concessions: responseSchema.Concessions = JSON.parse(JSON.stringify(response.body.data.concessions));
  if (!emptyResp && Object.keys(concessions).length != 0) {
    expect(response.status).toBe(HttpStatus.OK);
    await validateConcession(concessions);
  }
}

async function validateConcession(concessions: responseSchema.Concessions) {
  for (const i in concessions) {
    expect(concessions[i]?.displayName).toBeString();
    expect(concessions[i]?.additionalInfo).toBeString();
    expect(concessions[i]?.additionalInfoUri).toBeString();
    expect(concessions[i]?.startDate).toBeString();
    expect(concessions[i]?.endDate).toBeString();
    expect(concessions[i]?.type).toBeString();
    expect(concessions[i]?.discountFrequency).toBeString();
    expect(concessions[i]?.amount).toBeString();
    expect(concessions[i]?.additionalInfoUri).toBeString();
    expect(concessions[i]?.percentage).toBeString();
  }
}
