import * as globals from '@jest/globals';
import log from 'ololog';

import * as concessionHelper from '../../../src/api-helpers/concessions-api-helpers';
import * as accountHelper from '../../../src/api-helpers/energy-accounts-api-helper';
import * as tokenGenerator from '../../../src/api-helpers/tokenGeneration-api-helpers';
import * as header from '../../../src/constants/header-files';

globals.describe('CAT SDH R3 - GET Concessions API', () => {
  let bearerTokens: string[][] = [];
  const bearerTokensTitle: string[] = ['Secondary Users'];
  globals.beforeAll(async () => {
    bearerTokens = await Promise.all([await tokenGenerator.SDHTokenGen()]);
  });
  globals.test('CAT SDH GET Concessions API Test Run 200, 404', async () => {
    for (let i = 0; i < bearerTokens.length; i++) {
      log.bgRed(`++++++++++ ${bearerTokensTitle[i]} +++++++++`);
      for (let j = 0; j < bearerTokens[i].length; j++) {
        header.EnergyHeaders.Authorization = `Bearer ${bearerTokens[i][j]}`;
        const accountsResponse = await accountHelper.getEnergyAccountsResponse(header.EnergyHeaders);
        const accounts = accountsResponse.body.data.accounts;
        if (accounts.length !== 0) {
          for (let k = 0; k < accounts.length; k++) {
            header.headers.Authorization = `Bearer ${bearerTokens[i][j]}`;
            const concessionsResponse = await concessionHelper.getConcessionsForAccount(
              header.headers,
              accounts[k].accountId,
            );
            log.cyan('Get Concessions Response : ' + JSON.stringify(concessionsResponse.body));
            log.green('Get Concessions Status Code : ' + concessionsResponse.statusCode);
          }
        }
      }
    }
  });
});
