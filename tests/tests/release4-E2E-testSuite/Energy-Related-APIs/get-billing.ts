/* GET billing API
Bulk Billing Endpoint: https://mtls.authncdr-test.energyaustralia.com.au/cds-au/v1/energy/accounts/billing
Billing For Energy Account Endpoint: https://mtls.authncdr-test.energyaustralia.com.au/cds-au/v1/energy/accounts/{{accountId}}/billing
Billing For Specific Energy Account Endpoint: https://mtls.authncdr-test.energyaustralia.com.au/cds-au/v1/energy/accounts/billing
Billing For Energy Account and Specific Energy Account Relies on Bulk Billing API for generating the account ID*/

import * as globals from '@jest/globals';
import log from 'ololog';

import * as billingHelper from '../../../src/api-helpers/billing-api-helpers';
import * as tokenGenerator from '../../../src/api-helpers/tokenGeneration-api-helpers';
import * as errorValidator from '../../../src/api-validations/error-validations';
import * as header from '../../../src/constants/header-files';
import * as queryParams from '../../../src/constants/queryParams-files';
import * as payLoad from '../../../src/constants/requestBody';
import { responseErrors } from '../../../src/constants/response-errors';
import { nonOpenCNIAccIds } from '../../../src/data/nonOpenDatamerge';

globals.describe('CAT CNI R4 -GET Billing APIs', () => {
  let bearerTokens: string[][] = [];
  const bearerTokensTitle: string[] = ['Open Accounts', 'Closed Accounts', 'New Accounts', 'Cancelled Accounts'];
  globals.beforeAll(async () => {
    bearerTokens = await Promise.all([
      await tokenGenerator.CNIOpenTokenGen(),
      await tokenGenerator.CNIClosedTokenGen(),
      await tokenGenerator.CNINewTokenGen(),
      await tokenGenerator.CNICancelledTokenGen(),
    ]);
  });
  globals.test('CAT CNI R4 - Get Billing API 200, 404, 422 Status Codes Test Run', async () => {
    log.bgYellow('CAT CNI GET Billing NON Reads Test Run');
    for (let i = 0; i < bearerTokens.length; i++) {
      log.bgRed(`++++++++++ ${bearerTokensTitle[i]} +++++++++`);
      for (let j = 0; j < bearerTokens[i].length; j++) {
        header.headers.Authorization = `Bearer ${bearerTokens[i][j]}`;
        const bulkBillingWithDatesReadsResponse = await billingHelper.getBulkBilling(header.headers);
        log.blue('Bulk Billing Response : ' + JSON.stringify(bulkBillingWithDatesReadsResponse.body));
        log.green('Bulk Billing Status Code : ' + bulkBillingWithDatesReadsResponse.statusCode);
        const bulkBillingResponse = await billingHelper.getBulkBilling(header.headers);
        log.blue('Bulk Billing Response : ' + JSON.stringify(bulkBillingResponse.body));
        log.green('Bulk Billing Status Code : ' + bulkBillingResponse.statusCode);
        const transactions = bulkBillingResponse.body.data.transactions;
        if (transactions.length !== 0) {
          for (let k = 0; k <= transactions.length; k++) {
            if (transactions.length > 1) {
              header.headers.Authorization = `Bearer ${bearerTokens[i][j]}`;
              const balancesForEnergyAccountResponse = await billingHelper.getBillingForAccount(
                header.headers,
                transactions[k].accountId,
                queryParams.time_reads,
              );
              log.red('Billing For Energy Account Response : ' + JSON.stringify(balancesForEnergyAccountResponse.body));
              log.green('Billing For Energy Account Status Code : ' + balancesForEnergyAccountResponse.statusCode);
              header.headers.Authorization = `Bearer ${bearerTokens[i][j]}`;
              const requestBody: payLoad.requestBody_accounts = {
                data: { accountIds: [transactions[k].accountId] },
              };
              const balancesForSpecificEnergyAccountResponse = await billingHelper.getBillingForSpecificAccounts(
                { ...requestBody },
                header.headers,
                queryParams.time_reads,
              );
              log.magenta(
                'Billing For Specific Energy Account Response : ' +
                  JSON.stringify(balancesForSpecificEnergyAccountResponse.body),
              );
              log.green(
                'Billing For Specific Energy Account Status Code : ' +
                  balancesForSpecificEnergyAccountResponse.statusCode,
              );
              break;
            }
          }
        } else if (transactions.length === 0) {
          const data = await nonOpenCNIAccIds();
          for (let l = 0; l <= data.length - 9; l++) {
            header.headers.Authorization = `Bearer ${bearerTokens[i][j]}`;
            const balancesForEnergyAccountResponse = await billingHelper.getBillingForAccount(header.headers, data[l]);
            log.red(
              'Billing For Energy Accounts Response When Bulk Balances Response is Empty : ' +
                JSON.stringify(balancesForEnergyAccountResponse.body),
            );
            log.green(
              'Billing For Energy Accounts Status Code When Bulk Balances Response is Empty : ' +
                balancesForEnergyAccountResponse.statusCode,
            );
            errorValidator.validateErrorResponse(
              balancesForEnergyAccountResponse,
              responseErrors.INVALID_ENERGY_ACCOUNT,
            );
            header.headers.Authorization = `Bearer ${bearerTokens[i][j]}`;
            const requestBody: payLoad.requestBody_accounts = {
              data: { accountIds: [data[l]] },
            };

            const balancesForSpecificEnergyAccountResponse = await billingHelper.getBillingForSpecificAccounts(
              { ...requestBody },
              header.headers,
            );
            log.magenta(
              'Billing For Specific Energy Account Response : ' +
                JSON.stringify(balancesForSpecificEnergyAccountResponse.body),
            );
            log.green(
              'Billing For Specific Energy Account Status Code : ' +
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
  globals.test('CAT CNI R4 - Get Billing API 2 Years Oldest Date 200, 404, 422 Status Codes Test Run', async () => {
    log.bgYellow('CAT CNI GET Billing 2 Years oldest Time Reads Test Run');
    for (let i = 0; i < bearerTokens.length; i++) {
      log.bgRed(`++++++++++ ${bearerTokensTitle[i]} +++++++++`);
      for (let j = 0; j < bearerTokens[i].length; j++) {
        header.headers.Authorization = `Bearer ${bearerTokens[i][j]}`;
        const bulkBillingWithDatesReadsResponse = await billingHelper.getBulkBilling(
          header.headers,
          queryParams.time_reads,
        );
        log.blue(
          'Bulk Billing 2 Years Oldest Time Reads Response : ' + JSON.stringify(bulkBillingWithDatesReadsResponse.body),
        );
        log.green(
          'Bulk Billing 2 Years Oldest Time Reads Status Code : ' + bulkBillingWithDatesReadsResponse.statusCode,
        );
        const transactions = bulkBillingWithDatesReadsResponse.body.data.transactions;
        if (transactions.length !== 0) {
          for (let k = 0; k <= transactions.length - 25; k++) {
            log.bgLightBlue(transactions[k].accountId);
            header.headers.Authorization = `Bearer ${bearerTokens[i][j]}`;
            const balancesForEnergyAccountResponse = await billingHelper.getBillingForAccount(
              header.headers,
              transactions[k].accountId,
              queryParams.time_reads,
            );
            log.red(
              'Billing For Energy Account 2 Years Oldest Time Reads Response : ' +
                JSON.stringify(balancesForEnergyAccountResponse.body),
            );
            log.green(
              'Billing For Energy Account 2 Years Oldest Time Reads Status Code : ' +
                balancesForEnergyAccountResponse.statusCode,
            );
            header.headers.Authorization = `Bearer ${bearerTokens[i][j]}`;
            const requestBody: payLoad.requestBody_accounts = {
              data: { accountIds: [transactions[k].accountId] },
            };
            const balancesForSpecificEnergyAccountResponse = await billingHelper.getBillingForSpecificAccounts(
              { ...requestBody },
              header.headers,
              queryParams.time_reads,
            );
            log.magenta(
              'Billing For Specific Energy Account 2 Years Oldest Time Reads Response : ' +
                JSON.stringify(balancesForSpecificEnergyAccountResponse.body),
            );
            log.green(
              'Billing For Specific Energy Account 2 Years Oldest Time Reads Status Code : ' +
                balancesForSpecificEnergyAccountResponse.statusCode,
            );
          }
        } else if (transactions.length === 0) {
          const data = await nonOpenCNIAccIds();
          for (let l = 0; l <= data.length - 9; l++) {
            header.headers.Authorization = `Bearer ${bearerTokens[i][j]}`;
            const balancesForEnergyAccountResponse = await billingHelper.getBillingForAccount(header.headers, data[l]);
            log.red(
              'Billing For Energy Accounts Response When Bulk Balances Response is Empty : ' +
                JSON.stringify(balancesForEnergyAccountResponse.body),
            );
            log.green(
              'Billing For Energy Accounts Status Code When Bulk Balances Response is Empty : ' +
                balancesForEnergyAccountResponse.statusCode,
            );
            errorValidator.validateErrorResponse(
              balancesForEnergyAccountResponse,
              responseErrors.INVALID_ENERGY_ACCOUNT,
            );
            header.headers.Authorization = `Bearer ${bearerTokens[i][j]}`;
            const requestBody: payLoad.requestBody_accounts = {
              data: { accountIds: [data[l]] },
            };

            const balancesForSpecificEnergyAccountResponse = await billingHelper.getBillingForSpecificAccounts(
              { ...requestBody },
              header.headers,
            );
            log.magenta(
              'Billing For Specific Energy Account Response : ' +
                JSON.stringify(balancesForSpecificEnergyAccountResponse.body),
            );
            log.green(
              'Billing For Specific Energy Account Status Code : ' +
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
