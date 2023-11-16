import fs from 'fs';

import * as dotenv from 'dotenv';
dotenv.config({ path: 'src/environments/testing.CE.env' });

export interface ICETokenConfig {
  CE_SIGNING_KEY: string;
  CE_BASE_URL: string;
  CE_CDR_WORKSPACE: string;
  CE_SYSTEM_WORKSPACE: string;
  CE_CONSENT_CLIENT_ID: string;
  CE_CONSENT_CLIENT_SECRET: string;
  CE_LOGIN_CLIENT_ID: string;
  CE_LOGIN_CLIENT_SECRET: string;
  CE_ID_ENCRYPTION_SECRET: string;
  CE_REDIRECT_URI: string;
  CE_DCR_CLIENT_ID: string;
  CE_DCR_PASSPHRASE: string;
  CE_DCR_CLIENT_CERT: string;
  CE_DCR_CLIENT_KEY: string;
  CE_NONCE_DERIVATION_SECRET: string;
}

export const envCETokenConfig: ICETokenConfig = {
  CE_SIGNING_KEY: fs.readFileSync('src/environments/CE_SIGNING_KEY.env', 'utf8'),
  CE_BASE_URL: process.env.CE_BASE_URL || '',
  CE_CDR_WORKSPACE: process.env.CE_CDR_WORKSPACE || '',
  CE_SYSTEM_WORKSPACE: process.env.CE_SYSTEM_WORKSPACE || '',
  CE_CONSENT_CLIENT_ID: process.env.CE_CONSENT_CLIENT_ID || '',
  CE_CONSENT_CLIENT_SECRET: process.env.CE_CONSENT_CLIENT_SECRET || '',
  CE_LOGIN_CLIENT_ID: process.env.CE_LOGIN_CLIENT_ID || '',
  CE_LOGIN_CLIENT_SECRET: process.env.CE_LOGIN_CLIENT_SECRET || '',
  CE_ID_ENCRYPTION_SECRET: process.env.CE_ID_ENCRYPTION_SECRET || '',
  CE_REDIRECT_URI: process.env.CE_REDIRECT_URI || '',
  CE_DCR_CLIENT_ID: process.env.CE_DCR_CLIENT_ID || '',
  CE_DCR_PASSPHRASE: process.env.CE_DCR_PASSPHRASE || '',
  CE_DCR_CLIENT_CERT: fs.readFileSync('src/environments/CE_DCR_CLIENT_CERT.env', 'utf8'),
  CE_DCR_CLIENT_KEY: fs.readFileSync('src/environments/CE_DCR_CLIENT_KEY.env', 'utf8'),
  CE_NONCE_DERIVATION_SECRET: process.env.CE_NONCE_DERIVATION_SECRET || '',
};
