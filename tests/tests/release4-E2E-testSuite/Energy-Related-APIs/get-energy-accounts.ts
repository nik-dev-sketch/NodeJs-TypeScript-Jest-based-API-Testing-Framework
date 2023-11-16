/* GET Energy Accounts and Account Detail API
Energy Accounts Endpoint: https://mtls.authncdr-test.energyaustralia.com.au/cds-au/v1/energy/accounts
Energy Account Detail Endpoint: https://mtls.authncdr-test.energyaustralia.com.au/cds-au/v1/energy/accounts/{{accountId}}
Energy Account Detail Relies on Energy Accounts API for generating the account ID*/

import * as globals from '@jest/globals';
import log from 'ololog';

import * as accountHelper from '../../../src/api-helpers/energy-accounts-api-helper';
import * as tokenGenerator from '../../../src/api-helpers/tokenGeneration-api-helpers';
import * as errorValidation from '../../../src/api-validations/error-validations';
import * as header from '../../../src/constants/header-files';
import { responseErrors } from '../../../src/constants/response-errors';
import { nonOpenCNIAccIds } from '../../../src/data/nonOpenDatamerge';

globals.describe('CAT C&I R4 - GET Energy Accounts & Energy Account Detail API Test Suite', () => {
  let bearerTokens: string[][] = [];
  const accountIds: string[] = [];
  const bearerTokensTitle: string[] = ['Open Accounts', 'Closed Accounts', 'New Accounts', 'Cancelled Accounts'];
  globals.beforeAll(async () => {
    bearerTokens = await Promise.all([
      await tokenGenerator.CNIOpenTokenGen(),
      await tokenGenerator.CNIClosedTokenGen(),
      await tokenGenerator.CNINewTokenGen(),
      await tokenGenerator.CNICancelledTokenGen(),
    ]);
  });

  globals.test('CAT C&I R4 - GET Customers API 200 & 404 status Codes Test Run', async () => {
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
        } else if (accounts.length === 0) {
          const data = await nonOpenCNIAccIds();
          for (let l = 0; l <= data.length - 9; l++) {
            const accountDetailResponse = await accountHelper.getEnergyAccountsdetailResponse(
              header.EnergyHeaders,
              data[l],
            );
            log.magenta(
              'Energy Account Detail Response for Non Open Accounts : ',
              JSON.stringify(accountDetailResponse.body),
            );
            log.green(
              'Get Energy Accounts Status Code When Energy Accounts is Empty : ' + accountDetailResponse.statusCode,
            );
            errorValidation.validateErrorResponse(accountDetailResponse, responseErrors.INVALID_ENERGY_ACCOUNT);
          }
        }
      }
    }
  });
});
