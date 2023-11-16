import request from 'supertest';

import { expect } from '../libs/jest-without-globals';
import * as responseSchema from '../models/derResp';
import 'jest-extended';

const statuses = ['ACTIVE', 'INACTIVE', 'DECOMMISSIONED'];
const types = ['FOSSIL', 'HYDRO', 'WIND', 'SOLAR_PV', 'RENEWABLE', 'GEOTHERMAL', 'STORAGE', 'OTHER'];

export async function validateSuccessfulDerResponse(response: request.Response, isEmptyResp = false, isArray = true) {
  expect(response.body.data).toBeTruthy();
  expect(response.body.links).toBeTruthy();
  expect(response.body.links.self).toBeTruthy();
  expect(response.body.meta).toBeTruthy();
  if (isArray) {
    const resp: responseSchema.DerResponseArrayRecords = JSON.parse(JSON.stringify(response.body));
    const derRecords: responseSchema.DerRecords = JSON.parse(JSON.stringify(resp.data.derRecords));
    if (!isEmptyResp && Object.keys(derRecords).length != 0) {
      validateArrayDerRecordsProperties(derRecords);
    } else if (isEmptyResp) {
      console.log('DER Records is expected to be empty. Skipping detailed property validation');
      expect(derRecords).toBeEmpty();
    }
  } else {
    const resp: responseSchema.DerRecords = JSON.parse(JSON.stringify(response.body.data));
    if (!isEmptyResp && Object.keys(resp).length != 0) {
      validateSingleDerRecordProperties(resp);
    } else if (isEmptyResp) {
      console.log('Response is expected to be empty. Skipping detailed property validation');
      expect(resp).toBeEmpty();
    }
  }
}

function validateArrayDerRecordsProperties(derRecords: responseSchema.DerRecords) {
  for (const i in derRecords) {
    expect(derRecords[i].servicePointId).toBeTruthy();
    expect(derRecords[i].availablePhasesCount).not.toBeNull();
    expect(derRecords[i].installedPhasesCount).not.toBeNull();
    expect(derRecords[i].islandableInstallation).not.toBeNull();
    expect(derRecords[i].acConnections).toBeTruthy();
    validateAcConnections(derRecords[i].acConnections);
  }
}

function validateSingleDerRecordProperties(derRecord: responseSchema.DerRecords) {
  expect(derRecord.servicePointId).toBeTruthy();
  expect(derRecord.availablePhasesCount).not.toBeNull();
  expect(derRecord.installedPhasesCount).not.toBeNull();
  expect(derRecord.islandableInstallation).not.toBeNull();
  expect(derRecord.acConnections).toBeTruthy();
  validateAcConnections(derRecord.acConnections);
}

function validateAcConnections(acConnections: responseSchema.AcConnections[]) {
  for (const c in acConnections) {
    console.log('Validating AC Connection' + c);
    const acConnection: responseSchema.AcConnections = JSON.parse(JSON.stringify(acConnections[c]));
    expect(acConnection.connectionIdentifier).toBeTruthy();
    expect(acConnection.count).toBeTruthy();
    expect(acConnection.commissioningDate).toBeTruthy();
    expect('INVERTER' || 'OTHER').toContain(acConnection.equipmentType);
    switch (acConnection.equipmentType) {
      case 'INVERTER':
        expect(acConnection.manufacturerName).toBeTruthy();
        expect(acConnection.inverterSeries).toBeTruthy();
        expect(acConnection.inverterModelNumber).toBeTruthy();
        expect(acConnection.status).toBeTruthy();
        expect(acConnection.inverterDeviceCapacity).toBeTruthy();
        break;
    }
    expect(acConnection.derDevices).toBeTruthy();
    for (const d in acConnection.derDevices) {
      const derDevice: responseSchema.DerDevices = JSON.parse(JSON.stringify(acConnection.derDevices[d]));
      expect(derDevice.deviceIdentifier).toBeTruthy();
      expect(derDevice.count).toBeTruthy();
      expect(derDevice.status).toBeTruthy();
      expect(derDevice.type).toBeTruthy();
      expect(types).toContain(derDevice.type);
      expect(statuses).toContain(derDevice.status);
      expect(derDevice.nominalRatedCapacity).toBeTruthy();
      expect(derDevice.nominalStorageCapacity).not.toBeNull();
    }
  }
}
