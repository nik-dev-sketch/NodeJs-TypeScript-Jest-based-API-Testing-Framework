import * as globals from '@jest/globals';
import log from 'ololog';

import * as balancegHelper from '../../../src/api-helpers/balances-api-helpers';
import * as tokenGenerator from '../../../src/api-helpers/tokenGeneration-api-helpers';
import * as header from '../../../src/constants/header-files';
import * as payLoad from '../../../src/constants/requestBody';

globals.describe('CAT SDH R3 - Balances APIs Test Suite', () => {
  let bearerTokens: string[][] = [];
  const bearerTokensTitle: string[] = ['Secondary Users'];
  globals.beforeAll(async () => {
    bearerTokens = await Promise.all([await tokenGenerator.SDHTokenGen()]);
  });
  globals.test('CAT SDH GET Balances API 200 OK Test Run', async () => {
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
        }
      }
    }
  });
});
