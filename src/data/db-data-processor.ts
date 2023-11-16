/* eslint-disable @typescript-eslint/no-explicit-any */
import * as nonOpendataProcessor from '../data/nonOpenDatamerge';
import { eaIDGen } from '../utils/databaseUtils/eaId.got';
import * as db from '../utils/databaseUtils/postgreSQL';

function formatAccEaIDS(eaIds: any[], accIds: any[]) {
  return eaIds.map((eaId, idx) => [eaId, accIds[idx]]);
}

export async function RESIOpenAccount() {
  const accIds: any = await db.getRESIOpenAccounts();
  const partyIds: any = await db.getRESIOpenParty();
  const eaIds: any = await eaIDGen(accIds, partyIds);
  return formatAccEaIDS(eaIds, accIds);
}

export async function RESIClosedAccount() {
  const accIds: any = await db.getRESIClosedAccounts();
  const partyIds: any = await db.getRESIClosedParty();
  const eaIds: any = await eaIDGen(accIds, partyIds);
  return formatAccEaIDS(eaIds, accIds);
}

export async function RESINewAccount() {
  const accIds: any = await db.getRESINewAccounts();
  const partyIds: any = await db.getRESINewParty();
  const eaIds: any = await eaIDGen(accIds, partyIds);
  return formatAccEaIDS(eaIds, accIds);
}

export async function RESICancelledAccount() {
  const accIds: any = await db.getRESICancelledAccounts();
  const partyIds: any = await db.getRESICancelledParty();
  const eaIds: any = await eaIDGen(accIds, partyIds);
  return formatAccEaIDS(eaIds, accIds);
}

export async function RESINonOpenAccount() {
  const accIds: any = await nonOpendataProcessor.nonOpenRESIAccIds();
  const partyIds: any = await nonOpendataProcessor.nonOpenRESIPartyIds();
  const eaIds: any = await eaIDGen(accIds, partyIds);
  return formatAccEaIDS(eaIds, accIds);
}

export async function SMEOpenAccount() {
  const accIds: any = await db.getSMEOpenAccounts();
  const partyIds: any = await db.getSMEOpenParty();
  const eaIds: any = await eaIDGen(accIds, partyIds);
  return formatAccEaIDS(eaIds, accIds);
}

export async function SMEClosedAccount() {
  const accIds: any = await db.getSMEClosedAccounts();
  const partyIds: any = await db.getSMEClosedParty();
  const eaIds: any = await eaIDGen(accIds, partyIds);
  return formatAccEaIDS(eaIds, accIds);
}

export async function SMENewAccount() {
  const accIds: any = await db.getSMENewAccounts();
  const partyIds: any = await db.getSMENewParty();
  const eaIds: any = await eaIDGen(accIds, partyIds);
  return formatAccEaIDS(eaIds, accIds);
}

export async function SMECancelledAccount() {
  const accIds: any = await db.getSMECancelledAccounts();
  const partyIds: any = await db.getSMECancelledParty();
  const eaIds: any = await eaIDGen(accIds, partyIds);
  return formatAccEaIDS(eaIds, accIds);
}

export async function SMENonOpenAccount() {
  const accIds: any = await nonOpendataProcessor.nonOpenSMEAccIds();
  const partyIds: any = await nonOpendataProcessor.nonOpenSMEPartyIds();
  const eaIds: any = await eaIDGen(accIds, partyIds);
  return formatAccEaIDS(eaIds, accIds);
}

export async function CNIOpenAccount() {
  const accIds: any = await db.getCNIOpenAccounts();
  const partyIds: any = await db.getCNIOpenParty();
  const eaIds: any = await eaIDGen(accIds, partyIds);
  return formatAccEaIDS(eaIds, accIds);
}

export async function CNIClosedAccount() {
  const accIds: any = await db.getCNIClosedAccounts();
  const partyIds: any = await db.getCNIClosedParty();
  const eaIds: any = await eaIDGen(accIds, partyIds);
  return formatAccEaIDS(eaIds, accIds);
}

export async function CNINewAccount() {
  const accIds: any = await db.getCNINewAccounts();
  const partyIds: any = await db.getCNINewParty();
  const eaIds: any = await eaIDGen(accIds, partyIds);
  return formatAccEaIDS(eaIds, accIds);
}

export async function CNICancelledAccount() {
  const accIds: any = await db.getCNICancelledAccounts();
  const partyIds: any = await db.getCNICancelledParty();
  const eaIds: any = await eaIDGen(accIds, partyIds);
  return formatAccEaIDS(eaIds, accIds);
}

export async function CNINonOpenAccount() {
  const accIds: any = await nonOpendataProcessor.nonOpenCNIAccIds();
  const partyIds: any = await nonOpendataProcessor.nonOpenCNIPartyIds();
  const eaIds: any = await eaIDGen(accIds, partyIds);
  return formatAccEaIDS(eaIds, accIds);
}

export async function SDHAccounts() {
  const accIds: any = await db.getSecondaryUserAccounts();
  const partyIds: any = await db.getSecondaryUserParty();
  const eaIds: any = await eaIDGen(accIds, partyIds);
  return formatAccEaIDS(eaIds, accIds);
}

RESIOpenAccount().then((resp) => resp);
RESIClosedAccount().then((resp) => resp);
RESINewAccount().then((resp) => resp);
RESICancelledAccount().then((resp) => resp);
SMEOpenAccount().then((resp) => resp);
SMEClosedAccount().then((resp) => resp);
SMENewAccount().then((resp) => resp);
SMECancelledAccount().then((resp) => resp);
CNIOpenAccount().then((resp) => resp);
CNIClosedAccount().then((resp) => resp);
CNINewAccount().then((resp) => resp);
CNICancelledAccount().then((resp) => resp);
SDHAccounts().then((resp) => resp);
