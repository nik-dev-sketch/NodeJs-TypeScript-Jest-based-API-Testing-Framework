import * as globals from '@jest/globals';
import log from 'ololog';

import * as accountHelper from '../../../src/api-helpers/energy-accounts-api-helper';
import * as tokenGenerator from '../../../src/api-helpers/tokenGeneration-api-helpers';
import * as header from '../../../src/constants/header-files';

globals.describe('CAT SDH R3 - GET Energy Accounts & Energy Account Detail API Test Suite', () => {
  let bearerTokens: string[][] = [];
  const accountIds: string[] = [];
  const bearerTokensTitle: string[] = ['Secondary Users'];
  globals.beforeAll(async () => {
    bearerTokens = await Promise.all([await tokenGenerator.SDHTokenGen()]);
  });

  globals.test('CAT SDH R3 - GET Energy Accounts API 200 & 404 status Codes Test Run', async () => {
    for (let i = 0; i < bearerTokens.length; i++) {
      log.bgLightRed(`+++++++++++++ ${bearerTokensTitle[i]} ++++++++++++`);
      for (let j = 0; j < bearerTokens[i].length; j++) {
        header.EnergyHeaders.Authorization = `Bearer ${bearerTokens[i][j]}`;
        const accountsResponse = await accountHelper.getEnergyAccountsResponse(header.EnergyHeaders);
        log.blue('Energy Accounts Response : ', JSON.stringify(accountsResponse.body));
        log.green('Get Energy Accounts Status Code : ' + accountsResponse.statusCode);
        const accounts = accountsResponse.body.data.accounts;
        if (accounts.length !== 0) {
          for (let k = 0; k < accounts.length; k++) {
            accountIds.push(accounts[k].accountId);
            const accountDetailResponse = await accountHelper.getEnergyAccountsdetailResponse(
              header.EnergyHeaders,
              accounts[k].accountId,
            );
            log.red('Energy Account Detail Response : ', JSON.stringify(accountDetailResponse.body));
            log.green('Get Energy Account Detail Status Code : ' + accountDetailResponse.statusCode);
          }
        } else {
          console.log('error message: Empty Records');
        }
      }
    }
  });
});
