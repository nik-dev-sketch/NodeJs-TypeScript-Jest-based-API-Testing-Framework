export interface IADTokenConfig {
  TEST_AD_CLIENT_ID: string; //KeyVault CDR-TEST-AD-CLIENT-ID
  TEST_AD_CLIENT_SECRET: string; // key vault CDR-TEST-AD-CLIENT-SECRET
  TEST_USERNAME: string; // keyvault S-AUTOMATION-TEST-USERNAME-USER
  TEST_PASSWORD: string; //keyvault S-AUTOMATION-TEST-PASSWORD
}

export const envADTokenConfig: IADTokenConfig = {
  TEST_AD_CLIENT_ID: process.env.AD_CLIENT_ID || '',
  TEST_AD_CLIENT_SECRET: process.env.AD_CLIENT_SECRET || '',
  TEST_USERNAME: process.env.S_AUTOMATION_TEST_USERNAME || '',
  TEST_PASSWORD: process.env.S_AUTOMATION_TEST_PASSWORD || '',
};
