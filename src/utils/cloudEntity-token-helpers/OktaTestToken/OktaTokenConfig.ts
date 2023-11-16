import * as dotenv from 'dotenv';

dotenv.config({ path: 'src/enviornments/testing.CE.env' });

export interface IOktaTokenConfig {
  OKTA_CLIENT_ID: string;
  OKTA_BASE_URL: string;
  OKTA_CLIENT_REDIRECT: string;
}

export const envOktaTokenConfig: IOktaTokenConfig = {
  OKTA_CLIENT_ID: process.env.OKTA_CLIENT_ID || '',
  OKTA_BASE_URL: process.env.OKTA_BASE_URL || '',
  OKTA_CLIENT_REDIRECT: process.env.OKTA_CLIENT_REDIRECT || '',
};
