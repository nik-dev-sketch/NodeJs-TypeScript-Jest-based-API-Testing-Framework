import { noScopes, scopes } from '../constants/scopes';
import * as dataProcessor from '../data/db-data-processor';
import { getCloudEntityBearerToken } from '../utils/cloudEntity-token-helpers/CETestToken/index';
async function getBearerToken(data: string[][]) {
  return Promise.all(data.map(async (_, i) => await getCloudEntityBearerToken(data[i][0], [data[i][1]], scopes)));
}

async function getBearerTokenNoScopes(data: string[][]) {
  return Promise.all(data.map(async (_, i) => await getCloudEntityBearerToken(data[i][0], [data[i][1]], noScopes)));
}

export async function RESIOpenTokenGen() {
  const data = await dataProcessor.RESIOpenAccount();
  return getBearerToken(data);
}

export async function RESIClosedTokenGen() {
  const data = await dataProcessor.RESIClosedAccount();
  return getBearerToken(data);
}

export async function RESICancelledTokenGen() {
  const data = await dataProcessor.RESICancelledAccount();
  return getBearerToken(data);
}

export async function RESINewTokenGen() {
  const data = await dataProcessor.RESINewAccount();
  return getBearerToken(data);
}

export async function RESIOpenAccountsNoScopesTokensGen() {
  const data = await dataProcessor.RESIOpenAccount();
  return getBearerTokenNoScopes(data);
}

export async function SMEOpenTokenGen() {
  const data = await dataProcessor.SMEOpenAccount();
  return getBearerToken(data);
}

export async function SMEClosedTokenGen() {
  const data = await dataProcessor.SMEClosedAccount();
  return getBearerToken(data);
}

export async function SMECancelledTokenGen() {
  const data = await dataProcessor.SMECancelledAccount();
  return getBearerToken(data);
}

export async function SMENewTokenGen() {
  const data = await dataProcessor.SMENewAccount();
  return getBearerToken(data);
}

export async function SMEOpenAccountsNoScopesTokensGen() {
  const data = await dataProcessor.SMEOpenAccount();
  return getBearerTokenNoScopes(data);
}

export async function CNIOpenTokenGen() {
  const data = await dataProcessor.CNIOpenAccount();
  return getBearerToken(data);
}

export async function CNIClosedTokenGen() {
  const data = await dataProcessor.CNIClosedAccount();
  return getBearerToken(data);
}

export async function CNICancelledTokenGen() {
  const data = await dataProcessor.CNICancelledAccount();
  return getBearerToken(data);
}

export async function CNINewTokenGen() {
  const data = await dataProcessor.CNINewAccount();
  return getBearerToken(data);
}

export async function CNIOpenAccountsNoScopesTokensGen() {
  const data = await dataProcessor.CNIOpenAccount();
  return getBearerTokenNoScopes(data);
}

export async function SDHTokenGen() {
  const data = await dataProcessor.SDHAccounts();
  return getBearerToken(data);
}
// RESIOpenTokenGen().then((resp) => resp);
// RESIClosedTokenGen().then((resp) => resp);
// RESICancelledTokenGen().then((resp) => resp);
// RESINewTokenGen().then((resp) => resp);
// RESIOpenAccountsNoScopesTokensGen().then((resp) => resp);
// SMEOpenTokenGen().then((resp) => resp);
// SMEClosedTokenGen().then((resp) => resp);
// SMECancelledTokenGen().then((resp) => resp);
// SMENewTokenGen().then((resp) => resp);
// SMEOpenAccountsNoScopesTokensGen().then((resp) => resp);
CNIOpenTokenGen().then((resp) => resp);
CNIClosedTokenGen().then((resp) => resp);
CNICancelledTokenGen().then((resp) => resp);
CNINewTokenGen().then((resp) => resp);
CNIOpenAccountsNoScopesTokensGen().then((resp) => resp);
SDHTokenGen().then((resp) => resp);
