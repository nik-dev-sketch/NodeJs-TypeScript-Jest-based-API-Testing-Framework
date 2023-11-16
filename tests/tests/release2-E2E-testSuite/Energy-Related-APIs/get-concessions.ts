/* GET Concessions API
Endpoint: https://mtls.authncdr-test.energyaustralia.com.au/cds-au/v1/energy/accounts/{{accountId}}/concessions
Relies on Energy Accounts API for generating the account ID*/

import * as globals from '@jest/globals';
import log from 'ololog';

import * as concessionHelper from '../../../src/api-helpers/concessions-api-helpers';
import * as accountHelper from '../../../src/api-helpers/energy-accounts-api-helper';
import * as tokenGenerator from '../../../src/api-helpers/tokenGeneration-api-helpers';
import * as errorValidator from '../../../src/api-validations/error-validations';
import * as header from '../../../src/constants/header-files';
import * as errorResponse from '../../../src/constants/response-errors';
import { nonOpenSMEAccIds } from '../../../src/data/nonOpenDatamerge';

globals.describe('CAT SME R2 - GET Concessions API', () => {
  let bearerTokens: string[][] = [];
  const bearerTokensTitle: string[] = ['Open Accounts', 'Closed Accounts', 'New Accounts', 'Cancelled Accounts'];
  globals.beforeAll(async () => {
    bearerTokens = await Promise.all([
      await tokenGenerator.SMEOpenTokenGen(),
      await tokenGenerator.SMEClosedTokenGen(),
      await tokenGenerator.SMENewTokenGen(),
      await tokenGenerator.SMECancelledTokenGen(),
    ]);
  });
  globals.test('CAT SME R2 - GET Concessions API Test Run 200, 404 Test Run', async () => {
    for (let i = 0; i < bearerTokens.length; i++) {
      log.bgRed(`++++++++++ ${bearerTokensTitle[i]} +++++++++`);
      for (let j = 0; j < bearerTokens[i].length; j++) {
        header.EnergyHeaders.Authorization = `Bearer ${bearerTokens[i][j]}`;
        const accountsResponse = await accountHelper.getEnergyAccountsResponse(header.EnergyHeaders);
        log.red(JSON.stringify(accountsResponse.body));
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
        } else if (accounts.length === 0) {
          const data = await nonOpenSMEAccIds();
          for (let l = 0; l <= data.length - 12; l++) {
            header.headers.Authorization = `Bearer ${bearerTokens[i][j]}`;
            const concessionsResponse = await concessionHelper.getConcessionsForAccount(header.headers, data[l]);
            log.cyan(
              'Get Concessions Response When Energy Accounts is Empty : ' + JSON.stringify(concessionsResponse.body),
            );
            log.green('Get Concessions Status Code When Energy Accounts is Empty : ' + concessionsResponse.statusCode);
            errorValidator.validateErrorResponse(
              concessionsResponse,
              errorResponse.responseErrors.INVALID_ENERGY_ACCOUNT,
            );
          }
        }
      }
    }
  });
});
