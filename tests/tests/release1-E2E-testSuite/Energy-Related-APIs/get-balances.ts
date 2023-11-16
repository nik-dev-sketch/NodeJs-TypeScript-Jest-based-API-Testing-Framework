import * as globals from '@jest/globals';
import log from 'ololog';

import * as balancegHelper from '../../../src/api-helpers/balances-api-helpers';
import * as tokenGenerator from '../../../src/api-helpers/tokenGeneration-api-helpers';
import * as errorValidator from '../../../src/api-validations/error-validations';
import * as header from '../../../src/constants/header-files';
import * as payLoad from '../../../src/constants/requestBody';
import { responseErrors } from '../../../src/constants/response-errors';
import { nonOpenRESIAccIds } from '../../../src/data/nonOpenDatamerge';

globals.describe('CAT RESI R1 - Balances APIs Test Suite', () => {
  let bearerTokens: string[][] = [];
  const bearerTokensTitle: string[] = ['Open Accounts', 'Closed Accounts', 'New Accounts', 'Cancelled Accounts'];
  globals.beforeAll(async () => {
    bearerTokens = await Promise.all([
      await tokenGenerator.RESIOpenTokenGen(),
      await tokenGenerator.RESIClosedTokenGen(),
      await tokenGenerator.RESINewTokenGen(),
      await tokenGenerator.RESICancelledTokenGen(),
    ]);
  });
  globals.test('CAt RESI R1 - GET Balances API 200 OK, 404 and 422 Status Codes Test Run', async () => {
    for (let i = 0; i < bearerTokens.length; i++) {
      log.bgRed(`++++++++++ ${bearerTokensTitle[i]} +++++++++`);
      for (let j = 0; j < bearerTokens[i].length; j++) {
        header.headers.Authorization = `Bearer ${bearerTokens[i][j]}`;
        const bulkBalancesResponse = await balancegHelper.getBulkBalances(header.headers);
        log.blue('Bulk Balances Response : ' + JSON.stringify(bulkBalancesResponse.body));
        log.green('Bulk Balances Status Code : ' + bulkBalancesResponse.statusCode);
        const balances = bulkBalancesResponse.body.data.balances;
        if (balances.length !== 0) {
          for (let k = 0; k < balances.length; k++) {
            const balancesForEnergyAccountResponse = await balancegHelper.getBalancesForEnergyAccounts(
              header.headers,
              balances[k].accountId,
            );
            log.red('Balances For Energy Account Response : ' + JSON.stringify(balancesForEnergyAccountResponse.body));
            log.green('Balances For Energy Account Status Code : ' + balancesForEnergyAccountResponse.statusCode);
            const requestBody: payLoad.requestBody_accounts = {
              data: {
                accountIds: [balances[k].accountId],
              },
            };
            const balancesForSpecificEnergyAccountResponse = await balancegHelper.getBalanceForSpecificAccountResponse(
              { ...requestBody },
              header.headers,
            );
            log.magenta(
              'Balances For Specific Energy Account Response : ' +
                JSON.stringify(balancesForSpecificEnergyAccountResponse.body),
            );
            log.green(
              'Balances For Specific Energy Account Status Code : ' +
                balancesForSpecificEnergyAccountResponse.statusCode,
            );
          }
        } else if (balances.length === 0) {
          const data = await nonOpenRESIAccIds();
          for (let l = 0; l <= data.length - 12; l++) {
            const balancesForEnergyAccountResponse = await balancegHelper.getBalancesForEnergyAccounts(
              header.headers,
              data[l],
            );
            log.red(
              'Balances For Energy Accounts Response When Bulk Balances Response is Empty : ' +
                JSON.stringify(balancesForEnergyAccountResponse.body),
            );
            log.green(
              'Balances For Energy Accounts Status Code When Bulk Balances Response is Empty : ' +
                balancesForEnergyAccountResponse.statusCode,
            );
            errorValidator.validateErrorResponse(
              balancesForEnergyAccountResponse,
              responseErrors.INVALID_ENERGY_ACCOUNT,
            );
            const requestBody: payLoad.requestBody_accounts = {
              data: {
                accountIds: [data[l]],
              },
            };

            const balancesForSpecificEnergyAccountResponse = await balancegHelper.getBalanceForSpecificAccountResponse(
              { ...requestBody },
              header.headers,
            );
            log.magenta(
              'Balances For Specific Energy Account Response : ' +
                JSON.stringify(balancesForSpecificEnergyAccountResponse.body),
            );
            log.green(
              'Balances For Specific Energy Account Status Code : ' +
                balancesForSpecificEnergyAccountResponse.statusCode,
            );
            errorValidator.validateErrorResponse(
              balancesForSpecificEnergyAccountResponse,
              responseErrors.UNPROCESSABLE_ENTITY_INVALID_ENERGY_ACCOUNT,
            );
          }
        }
      }
    }
  });
});
