import clone from 'just-clone';
import request from 'supertest';

import { HttpStatus } from 'src/constants/httpStatus';

import { expect } from '../libs/jest-without-globals';
import * as linksandMetaSchema from '../models/linksandMetaResponse';
import * as responseSchema from '../models/servicePointResp';

export async function valdiateServicePointsResponse(response: request.Response, details = true, emptyResponse = false) {
  const resp: responseSchema.serviceResponse = clone(response.body);
  const resp1: responseSchema.servicePointDetailResponse = clone(response.body);
  const servicePointResp: responseSchema.servicePoints = clone(response.body.data.servicePoints);
  const dataResp: responseSchema.dataSPD = clone(response.body.data);
  const linksResp: linksandMetaSchema.Links = clone(response.body.links);
  const metaResp: linksandMetaSchema.Meta = clone(response.body.meta);
  if (!details) {
    if (
      !emptyResponse &&
      Object.keys(servicePointResp).length != 0 &&
      Object.keys(linksResp).length != 0 &&
      Object.keys(metaResp).length != 0
    ) {
      expect(response.statusCode).toBe(HttpStatus.OK);
      await validateServicePoints(servicePointResp);
      await validateLinks(linksResp);
      await validateMeta(metaResp);
    } else if (emptyResponse && Object.keys(resp).length === 0 && Object.keys(servicePointResp).length === 0) {
      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(servicePointResp).toBeEmpty();
    }
  } else if (details) {
    if (
      !emptyResponse &&
      Object.keys(resp1).length != 0 &&
      Object.keys(dataResp).length != 0 &&
      Object.keys(linksResp).length != 0 &&
      Object.keys(metaResp).length != 0
    ) {
      expect(response.statusCode).toBe(HttpStatus.OK);
      await validateServicePointsDetails(dataResp);
      await validateLinks(linksResp);
      await validateMeta(metaResp);
    } else if (emptyResponse && Object.keys(dataResp).length === 0) {
      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(dataResp).toBeEmpty();
    }
  }
}

// export async function validateServicePointsDetailResponse(response: request.Response, emptyResponse = false) {
//   const resp: responseSchema.servicePointDetailResponse = JSON.parse(JSON.stringify(response.body));
//   const dataResp: responseSchema.dataSPD = JSON.parse(JSON.stringify(response.body.data));
//   const linksResp: linksandMetaSchema.Links = JSON.parse(JSON.stringify(response.body.links));
//   const metaResp: linksandMetaSchema.Meta = JSON.parse(JSON.stringify(response.body.meta));
//   if (
//     !emptyResponse &&
//     Object.keys(resp).length != 0 &&
//     Object.keys(dataResp).length != 0 &&
//     Object.keys(linksResp).length != 0 &&
//     Object.keys(metaResp).length != 0
//   ) {
//     expect(response.statusCode).toBe(HttpStatus.OK);
//     await validateServicePointsDetails(dataResp);
//     await validateLinks(linksResp);
//     await validateMeta(metaResp);
//   } else if (emptyResponse && Object.keys(dataResp).length === 0) {
//     expect(response.statusCode).toBe(HttpStatus.OK);
//     expect(dataResp).toBeEmpty();
//   }
// }

async function validateServicePoints(servicePoints: responseSchema.servicePoints) {
  for (const m in servicePoints) {
    expect(servicePoints[m].servicePointId).toBeTruthy();
    expect(servicePoints[m].nationalMeteringId).toBeTruthy();
    expect(servicePoints[m].servicePointClassification).toBeTruthy();
    expect(servicePoints[m].servicePointStatus).toBeTruthy();
    expect(servicePoints[m].servicePoints.jurisdictionCode).toBeTruthy();
    expect(servicePoints[m].validFormatDate).toBeTruthy();
    expect(servicePoints[m].isGenerator).toBeTruthy();
    expect(servicePoints[m].lastUpdateDateTime).toBeTruthy();
    expect(servicePoints[m].consumerProfile).toBeTruthy();
    expect(servicePoints[m].consumerProfile.classification).toBeTruthy();
    expect(servicePoints[m].consumerProfile.threshold).toBeTruthy();
  }
}

async function validateLinks(links: linksandMetaSchema.Links) {
  for (const j in links) {
    expect(links[j].self).toBeTruthy();
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

async function validateServicePointsDetails(data: responseSchema.dataSPD) {
  for (const n in data) {
    expect(data[n].servicePointId).toBeTruthy();
    expect(data[n].nationalMeteringId).toBeTruthy();
    expect(data[n].servicePointClassification).toBeTruthy();
    expect(data[n].servicePointStatus).toBeTruthy();
    expect(data[n].jurisdictionCode).toBeTruthy();
    expect(data[n].isGenerator).toBeTruthy();
    expect(data[n].validFromDate).toBeTruthy();
    expect(data[n].lastUpdateDateTime).toBeTruthy();
    expect(data[n].consumerProfile).toBeTruthy();
    expect(data[n].consumerProfile.classification).toBeTruthy();
    expect(data[n].consumerProfile.threshold).toBeTruthy();
    expect(data[n].distributionLossFactor).toBeTrue();
    expect(data[n].distributionLossFactor.code).toBeTruthy();
    expect(data[n].distributionLossFactor.description).toBeTruthy();
    expect(data[n].distributionLossFactor.lossValue).toBeTruthy();
    expect(data[n].relatedParticipants[0].party).toBeTruthy();
    expect(data[n].relatedParticipants[0].party).toBeOneOf([
      'EnergyAustralia Pty Ltd',
      'Ausgrid Operator Partnership',
      'Energex Limited',
      'United Energy Distribution Pty Ltd',
      'Essential Energy',
      'AusNet Electricity Services Pty Ltd',
    ]);
    expect(data[n].relatedParticipants[1].role).toBeTruthy();
    expect(data[n].relatedParticipants[1].role).toBeOneOf(['FRMP', 'LNSP']);
    expect(data[n].location.addressUType).toBeTruthy();
    expect(data[n].location.addressUType).toContainValue('paf');
    expect(data[n].location.paf.dpid).toBeTruthy();
    expect(data[n].location.paf.thoroughfareNumber1).toBeTruthy();
    expect(data[n].location.paf.thoroughfareNumber).toBeNumber();
    expect(data[n].location.paf.streetName).toBeTruthy();
    expect(data[n].location.paf.streetType).toBeTruthy();
    expect(data[n].location.paf.localityName).toBeTruthy();
    expect(data[n].location.paf.postcode).toBeTruthy();
    expect(data[n].location.paf.state).toBeTruthy();
    expect(data[n].meters).toBeTruthy();
    expect(data[n].meters[0].meterId).toBeTruthy();
    expect(data[n].meters[1].specifications).toBeTruthy();
    expect(data[n].meters[1].specifications.status).toBeTruthy();
    expect(data[n].meters[1].specifications.installationType).toBeTruthy();
    expect(data[n].meters[1].specifications.manufacturer).toBeTruthy();
    expect(data[n].meters[1].specifications.model).toBeTrue();
    expect(data[n].meters[1].specifications.readType).toBeTrue();
    expect(data[n].meters[2].registers[0].registerId).toBeTrue();
    expect(data[n].meters[2].registers[1].registerSuffix).toBeTrue();
    expect(data[n].meters[2].registers[2].registerConsumptionType).toBeTrue();
    expect(data[n].meters[2].registers[3].networkTariffCode).toBeTrue();
    expect(data[n].meters[2].registers[4].unitOfMeasure).toBeTrue();
    expect(data[n].meters[2].registers[5].timeOfDay).toBeTrue();
    expect(data[n].meters[2].registers[6].multiplier).toBeTrue();
    expect(data[n].meters[2].registers[6].controlledLoad).toBeTrue();
    expect(data[n].meters[2].registers[6].consumptionType).toBeTrue();
    expect(data[n].meters[3].meterId).toBeTrue();
    expect(data[n].meters[4].specifications).toBeTrue();
    expect(data[n].meters[4].specifications.status).toBeTrue();
    expect(data[n].meters[4].specifications.installationType).toBeTrue();
    expect(data[n].meters[4].specifications.manufacturer).toBeTrue();
    expect(data[n].meters[4].specifications.model).toBeTrue();
    expect(data[n].meters[4].specifications.readType).toBeTrue();
    expect(data[n].meters[0].meterId).toBeTrue();
    expect(data[n].meters[0].meterId).toBeTrue();
    expect(data[n].meters[0].meterId).toBeTrue();
  }
}
