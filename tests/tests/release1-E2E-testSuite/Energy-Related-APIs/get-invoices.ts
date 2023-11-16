import * as globals from '@jest/globals';
import log from 'ololog';

import * as InvoicesHelper from '../../../src/api-helpers/invoices-api-helpers';
import * as tokenGenerator from '../../../src/api-helpers/tokenGeneration-api-helpers';
import * as errorValidator from '../../../src/api-validations/error-validations';
import * as header from '../../../src/constants/header-files';
import * as queryParams from '../../../src/constants/queryParams-files';
import * as payLoad from '../../../src/constants/requestBody';
import { responseErrors } from '../../../src/constants/response-errors';
import { nonOpenRESIAccIds } from '../../../src/data/nonOpenDatamerge';

globals.describe('CAT RESI R1 - Invoices APIs Test Suite', () => {
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
  globals.test(
    'CAT RESI R1 - GET Invoices API (Bulk, GET, POST) Test Run 200, 404 & 422 Status Codes Test Run',
    async () => {
      for (let i = 0; i < bearerTokens.length; i++) {
        log.bgRed(`++++++++++ ${bearerTokensTitle[i]} +++++++++`);
        for (let j = 0; j < bearerTokens[i].length; j++) {
          header.headers.Authorization = `Bearer ${bearerTokens[i][j]}`;
          const bulkInvoicesWithDatesReadResponse = await InvoicesHelper.getBulkInvoices(
            header.headers,
            queryParams.date_reads,
          );
          log.blue(
            'Bulk Invoices Response With Interval Reads: ' + JSON.stringify(bulkInvoicesWithDatesReadResponse.body),
          );
          log.green('Bulk Invoices Status Code With Interval Reads: ' + bulkInvoicesWithDatesReadResponse.statusCode);
          const bulkInvoicesResponse = await InvoicesHelper.getBulkInvoices(header.headers);
          log.blue('Bulk Invoices Response : ' + JSON.stringify(bulkInvoicesResponse.body));
          log.green('Bulk Invoices Status Code : ' + bulkInvoicesResponse.statusCode);
          const invoices = bulkInvoicesResponse.body.data.invoices;
          if (invoices.length !== 0) {
            for (let k = 0; k < invoices.length; k++) {
              header.headers.Authorization = `Bearer ${bearerTokens[i][j]}`;
              const InvoiceForEnergyAccountResponse = await InvoicesHelper.getInvoicesForAccount(
                header.headers,
                invoices[0].accountId,
                queryParams.date_reads,
              );
              log.red('Invoices For Energy Account Response : ' + JSON.stringify(InvoiceForEnergyAccountResponse.body));
              log.green('Invoices For Energy Account Status Code : ' + InvoiceForEnergyAccountResponse.statusCode);
              const requestBody: payLoad.requestBody_accounts = {
                data: { accountIds: [invoices[0].accountId] },
              };
              header.headers.Authorization = `Bearer ${bearerTokens[i][j]}`;
              const InvoiceForSpecificEnergyAccountResponse = await InvoicesHelper.getInvoicesForSpecificAccounts(
                { ...requestBody },
                header.headers,
                queryParams.date_reads,
              );
              log.magenta(
                'Invoices For Specific Energy Account Response : ' +
                  JSON.stringify(InvoiceForSpecificEnergyAccountResponse.body),
              );
              log.green(
                'Invoices For Specific Energy Account Status Code : ' +
                  InvoiceForSpecificEnergyAccountResponse.statusCode,
              );
            }
          } else if (invoices.length === 0) {
            const data = await nonOpenRESIAccIds();
            for (let l = 0; l <= data.length - 3; l++) {
              const InvoiceForEnergyAccountResponse = await InvoicesHelper.getInvoicesForAccount(
                header.headers,
                data[l],
              );
              log.red(
                'Invoices For Energy Accounts Response When Bulk Balances Response is Empty : ' +
                  JSON.stringify(InvoiceForEnergyAccountResponse.body),
              );
              log.green(
                'Invoices For Energy Accounts Status Code When Bulk Balances Response is Empty : ' +
                  InvoiceForEnergyAccountResponse.statusCode,
              );
              errorValidator.validateErrorResponse(
                InvoiceForEnergyAccountResponse,
                responseErrors.INVALID_ENERGY_ACCOUNT,
              );

              const requestBody: payLoad.requestBody_accounts = {
                data: { accountIds: [data[l]] },
              };

              const InvoiceForSpecificEnergyAccountResponse = await InvoicesHelper.getInvoicesForSpecificAccounts(
                { ...requestBody },
                header.headers,
              );
              log.magenta(
                'Invoices For Specific Energy Account Response : ' +
                  JSON.stringify(InvoiceForSpecificEnergyAccountResponse.body),
              );
              log.green(
                'Invoices For Specific Energy Account Status Code : ' +
                  InvoiceForSpecificEnergyAccountResponse.statusCode,
              );
              errorValidator.validateErrorResponse(
                InvoiceForSpecificEnergyAccountResponse,
                responseErrors.UNPROCESSABLE_ENTITY_INVALID_ENERGY_ACCOUNT,
              );
            }
          }
        }
      }
    },
  );
});
