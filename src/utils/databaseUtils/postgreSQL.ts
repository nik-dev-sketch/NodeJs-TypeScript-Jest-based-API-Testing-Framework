import { Pool } from 'pg';

import { postGresConfig } from './postgresConfig';

export const pool = new Pool({
  user: postGresConfig.user,
  host: postGresConfig.host,
  database: postGresConfig.database,
  password: postGresConfig.password,
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function getAccounts(query) {
  const client = await pool.connect();
  const accounts = await client.query(query);
  client.release(true);
  return [...accounts.rows].map((response) => response.account_id);
}

export async function getparty(query) {
  const client = await pool.connect();
  const party = await client.query(query);
  client.release(true);
  return [...party.rows].map((response) => response.party_id);
}

export async function getRESIOpenAccounts() {
  return await getAccounts(
    `select party_account_rltn.account_id, party_account_rltn.party_id from ods.party_account_rltn join ods.account as account on account.account_id = party_account_rltn.account_id where account_class='RESIDENTIAL' and account_status='OPEN' and rltn_type_cde='MAIN_CUSTOMER' ORDER BY account_id DESC limit 4`,
  );
}

export async function getRESIClosedAccounts() {
  return await getAccounts(
    `select party_account_rltn.account_id, party_account_rltn.party_id from ods.party_account_rltn join ods.account as account on account.account_id = party_account_rltn.account_id where account_class='RESIDENTIAL' and account_status='CLOSED' and rltn_type_cde='MAIN_CUSTOMER' offset 3 fetch next 4 rows only`,
  );
}

export async function getRESINewAccounts() {
  return await getAccounts(
    `select party_account_rltn.account_id, party_account_rltn.party_id from ods.party_account_rltn join ods.account as account on account.account_id = party_account_rltn.account_id where account_class='RESIDENTIAL' and account_status='NEW' and rltn_type_cde='MAIN_CUSTOMER' offset 1 fetch next 4 rows only`,
  );
}

export async function getRESICancelledAccounts() {
  return await getAccounts(
    `select party_account_rltn.account_id, party_account_rltn.party_id from ods.party_account_rltn join ods.account as account on account.account_id = party_account_rltn.account_id where account_class='RESIDENTIAL' and account_status='CANCELLED' and rltn_type_cde='MAIN_CUSTOMER' offset 1 fetch next 4 rows only`,
  );
}

export async function getRESIOpenParty() {
  return await getparty(
    `select party_account_rltn.account_id, party_account_rltn.party_id from ods.party_account_rltn join ods.account as account on account.account_id = party_account_rltn.account_id where account_class='RESIDENTIAL' and account_status='OPEN' and rltn_type_cde='MAIN_CUSTOMER' ORDER BY account_id DESC limit 4`,
  );
}

export async function getRESIClosedParty() {
  return await getparty(
    `select party_account_rltn.account_id, party_account_rltn.party_id from ods.party_account_rltn join ods.account as account on account.account_id = party_account_rltn.account_id where account_class='SMALL_BUSINESS' and account_status='CLOSED' and rltn_type_cde='MAIN_CUSTOMER' offset 3 fetch next 4 rows only`,
  );
}

export async function getRESINewParty() {
  return await getparty(
    `select party_account_rltn.account_id, party_account_rltn.party_id from ods.party_account_rltn join ods.account as account on account.account_id = party_account_rltn.account_id where account_class='SMALL_BUSINESS' and account_status='NEW' and rltn_type_cde='MAIN_CUSTOMER' offset 1 fetch next 4 rows only`,
  );
}

export async function getRESICancelledParty() {
  return await getparty(
    `select party_account_rltn.account_id, party_account_rltn.party_id from ods.party_account_rltn join ods.account as account on account.account_id = party_account_rltn.account_id where account_class='SMALL_BUSINESS' and account_status='CANCELLED' and rltn_type_cde='MAIN_CUSTOMER' offset 1 fetch next 4 rows only`,
  );
}

export async function getSMEOpenAccounts() {
  return await getAccounts(
    `select party_account_rltn.account_id, party_account_rltn.party_id from ods.party_account_rltn join ods.account as account on account.account_id = party_account_rltn.account_id where account_class='RESIDENTIAL' and account_status='OPEN' and rltn_type_cde='MAIN_CUSTOMER' offset 1 fetch next 4 rows only`,
  );
}

export async function getSMEClosedAccounts() {
  return await getAccounts(
    `select party_account_rltn.account_id, party_account_rltn.party_id from ods.party_account_rltn join ods.account as account on account.account_id = party_account_rltn.account_id where account_class='SMALL_BUSINESS' and account_status='CLOSED' and rltn_type_cde = 'MAIN_CUSTOMER' offset 1 fetch next 4 rows only`,
  );
}

export async function getSMENewAccounts() {
  return await getAccounts(
    `select party_account_rltn.account_id, party_account_rltn.party_id from ods.party_account_rltn join ods.account as account on account.account_id = party_account_rltn.account_id where account_class='SMALL_BUSINESS' and account_status='NEW' and rltn_type_cde = 'MAIN_CUSTOMER' offset 2 fetch next 1 rows only`,
  );
}

export async function getSMECancelledAccounts() {
  return await getAccounts(
    `select party_account_rltn.account_id, party_account_rltn.party_id from ods.party_account_rltn join ods.account as account on account.account_id = party_account_rltn.account_id where account_class='SMALL_BUSINESS' and account_status='CANCELLED' and rltn_type_cde = 'MAIN_CUSTOMER' offset 2 fetch next 1 rows only`,
  );
}

export async function getSMEOpenParty() {
  return await getparty(
    `select party_account_rltn.account_id, party_account_rltn.party_id from ods.party_account_rltn join ods.account as account on account.account_id = party_account_rltn.account_id where account_class='RESIDENTIAL' and account_status='OPEN' and rltn_type_cde='MAIN_CUSTOMER' offset 1 fetch next 4 rows only`,
  );
}

export async function getSMEClosedParty() {
  return await getparty(
    `select party_account_rltn.account_id, party_account_rltn.party_id from ods.party_account_rltn join ods.account as account on account.account_id = party_account_rltn.account_id where account_class='SMALL_BUSINESS' and account_status='CLOSED' and rltn_type_cde = 'MAIN_CUSTOMER' offset 1 fetch next 4 rows only`,
  );
}

export async function getSMENewParty() {
  return await getparty(
    `select party_account_rltn.account_id, party_account_rltn.party_id from ods.party_account_rltn join ods.account as account on account.account_id = party_account_rltn.account_id where account_class='SMALL_BUSINESS' and account_status='NEW' and rltn_type_cde = 'MAIN_CUSTOMER' offset 1 fetch next 1 rows only`,
  );
}

export async function getSMECancelledParty() {
  return await getparty(
    `select party_account_rltn.account_id, party_account_rltn.party_id from ods.party_account_rltn join ods.account as account on account.account_id = party_account_rltn.account_id where account_class='SMALL_BUSINESS' and account_status='CANCELLED' and rltn_type_cde = 'MAIN_CUSTOMER' offset 1 fetch next 1 rows only`,
  );
}

export async function getCNIOpenAccounts() {
  return await getAccounts(
    `select party_account_rltn.account_id, party_account_rltn.party_id from ods.party_account_rltn join ods.account as account on account.account_id = party_account_rltn.account_id where account_class='COMMERCIAL' and account_status='OPEN' and rltn_type_cde='MAIN_CUSTOMER' ORDER BY account_id DESC limit 3`,
  );
}

export async function getCNIClosedAccounts() {
  return await getAccounts(
    `select party_account_rltn.account_id, party_account_rltn.party_id from ods.party_account_rltn join ods.account as account on account.account_id = party_account_rltn.account_id where account_class='COMMERCIAL' and account_status='CLOSED' and rltn_type_cde='MAIN_CUSTOMER' ORDER BY account_id DESC limit 3`,
  );
}

export async function getCNINewAccounts() {
  return await getAccounts(
    `select party_account_rltn.account_id, party_account_rltn.party_id from ods.party_account_rltn join ods.account as account on account.account_id = party_account_rltn.account_id where account_class='COMMERCIAL' and account_status='NEW' and rltn_type_cde='MAIN_CUSTOMER' ORDER BY account_id DESC LIMIT 3`,
  );
}

export async function getCNICancelledAccounts() {
  return await getAccounts(
    `select party_account_rltn.account_id, party_account_rltn.party_id from ods.party_account_rltn join ods.account as account on account.account_id = party_account_rltn.account_id where account_class='COMMERCIAL' and account_status='CANCELLED' and rltn_type_cde='MAIN_CUSTOMER' ORDER BY account_id DESC LIMIT 3`,
  );
}

export async function getCNIOpenParty() {
  return await getparty(
    `select party_account_rltn.account_id, party_account_rltn.party_id from ods.party_account_rltn join ods.account as account on account.account_id = party_account_rltn.account_id where account_class='COMMERCIAL' and account_status='OPEN' and rltn_type_cde='MAIN_CUSTOMER' ORDER By account_id DESC limit 3`,
  );
}

export async function getCNIClosedParty() {
  return await getparty(
    `select party_account_rltn.account_id, party_account_rltn.party_id from ods.party_account_rltn join ods.account as account on account.account_id = party_account_rltn.account_id where account_class='COMMERCIAL' and account_status='CLOSED' and rltn_type_cde='MAIN_CUSTOMER' ORDER BY account_id DESC limit 3`,
  );
}

export async function getCNINewParty() {
  return await getparty(
    `select party_account_rltn.account_id, party_account_rltn.party_id from ods.party_account_rltn join ods.account as account on account.account_id = party_account_rltn.account_id where account_class='COMMERCIAL' and account_status='NEW' and rltn_type_cde='MAIN_CUSTOMER' ORDER BY account_id DESC limit 3`,
  );
}

export async function getCNICancelledParty() {
  return await getparty(
    `select party_account_rltn.account_id, party_account_rltn.party_id from ods.party_account_rltn join ods.account as account on account.account_id = party_account_rltn.account_id where account_class='COMMERCIAL' and account_status='CANCELLED' and rltn_type_cde='MAIN_CUSTOMER' ORDER BY account_id DESC limit 3`,
  );
}

export async function getSecondaryUserAccounts() {
  return await getAccounts(
    `select party_account_rltn.account_id, party_account_rltn.party_id from ods.party_account_rltn join ods.account as account on account.account_id = party_account_rltn.account_id where secondary_user_flg ='Y' and account_class='RESIDENTIAL' and account_status='OPEN' and rltn_type_cde!='MAIN_CUSTOMER' offset 1 fetch next 3 rows only`,
  );
}

export async function getSecondaryUserParty() {
  return await getparty(
    `select party_account_rltn.account_id, party_account_rltn.party_id from ods.party_account_rltn join ods.account as account on account.account_id = party_account_rltn.account_id where secondary_user_flg ='Y' and account_class='RESIDENTIAL' and account_status='OPEN' and rltn_type_cde!='MAIN_CUSTOMER' offset 1 fetch next 3 rows only`,
  );
}

getRESIOpenAccounts().then((resp) => resp);
getRESIClosedAccounts().then((resp) => resp);
getRESINewAccounts().then((resp) => resp);
getRESICancelledAccounts().then((resp) => resp);
getRESIOpenParty().then((resp) => resp);
getRESIClosedParty().then((resp) => resp);
getRESINewParty().then((resp) => resp);
getRESICancelledParty().then((resp) => resp);
getSMEOpenAccounts().then((resp) => resp);
getSMEClosedAccounts().then((resp) => resp);
getSMENewAccounts().then((resp) => resp);
getSMECancelledAccounts().then((resp) => resp);
getSMEOpenParty().then((resp) => resp);
getSMEClosedParty().then((resp) => resp);
getSMENewParty().then((resp) => resp);
getSMECancelledParty().then((resp) => resp);
getCNIOpenAccounts().then((resp) => resp);
getCNIClosedAccounts().then((resp) => resp);
getCNINewAccounts().then((resp) => resp);
getCNICancelledAccounts().then((resp) => resp);
getCNIOpenParty().then((resp) => resp);
getCNIClosedParty().then((resp) => resp);
getCNINewParty().then((resp) => resp);
getCNICancelledParty().then((resp) => resp);
getSecondaryUserAccounts().then((resp) => resp);
getSecondaryUserParty().then((resp) => resp);
