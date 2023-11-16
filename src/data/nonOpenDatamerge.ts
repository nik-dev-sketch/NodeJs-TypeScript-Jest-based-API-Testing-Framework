import * as data from '../../src/utils/databaseUtils/postgreSQL';

export async function nonOpenRESIAccIds() {
  const closedAccIds = await data.getRESIClosedAccounts();
  const newAccIds = await data.getRESINewAccounts();
  const cancelledAccIds = await data.getRESICancelledAccounts();
  const mergedAccs = closedAccIds.concat(newAccIds).concat(cancelledAccIds);
  return mergedAccs;
}

export async function nonOpenRESIPartyIds() {
  const closedPartyIds = await data.getRESIClosedParty();
  const newPartyIds = await data.getRESINewParty();
  const cancelledPartyIds = await data.getRESICancelledParty();
  const mergedAccs = closedPartyIds.concat(newPartyIds).concat(cancelledPartyIds);
  return mergedAccs;
}

export async function nonOpenSMEAccIds() {
  const closedAccIds = await data.getSMEClosedAccounts();
  const newAccIds = await data.getSMENewAccounts();
  const cancelledAccIds = await data.getSMECancelledAccounts();
  const mergedAccs = closedAccIds.concat(newAccIds).concat(cancelledAccIds);
  return mergedAccs;
}

export async function nonOpenSMEPartyIds() {
  const closedPartyIds = await data.getSMEClosedParty();
  const newPartyIds = await data.getSMENewParty();
  const cancelledPartyIds = await data.getSMECancelledParty();
  const mergedAccs = closedPartyIds.concat(newPartyIds).concat(cancelledPartyIds);
  return mergedAccs;
}

export async function nonOpenCNIAccIds() {
  const closedAccIds = await data.getCNIClosedAccounts();
  const newAccIds = await data.getCNINewAccounts();
  const cancelledAccIds = await data.getCNICancelledAccounts();
  const mergedAccs = closedAccIds.concat(newAccIds).concat(cancelledAccIds);
  return mergedAccs;
}

export async function nonOpenCNIPartyIds() {
  const closedPartyIds = await data.getCNIClosedParty();
  const newPartyIds = await data.getCNINewParty();
  const cancelledPartyIds = await data.getCNICancelledParty();
  const mergedParties = closedPartyIds.concat(newPartyIds).concat(cancelledPartyIds);
  return mergedParties;
}

export async function RESIOpenAccIds() {
  const openAccIds = await data.getRESIOpenAccounts();
  return openAccIds;
}

export async function SMEOpenAccIds() {
  const openAccIds = await data.getSMEOpenAccounts();
  return openAccIds;
}

export async function CNIOpenAccIds() {
  const openAccIds = await data.getCNIOpenAccounts();
  return openAccIds;
}

nonOpenSMEAccIds().then((resp) => resp);
RESIOpenAccIds().then((resp) => resp);
SMEOpenAccIds().then((resp) => resp);
CNIOpenAccIds().then((resp) => resp);
nonOpenCNIAccIds().then((resp) => resp);
nonOpenRESIAccIds().then((resp) => resp);
