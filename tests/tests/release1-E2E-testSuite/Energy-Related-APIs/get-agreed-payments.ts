import * as globals from '@jest/globals';
import log from 'ololog';

import * as agreedPaymentHelper from '../../../src/api-helpers/agreed-paymements-api-helper';
import * as accountHelper from '../../../src/api-helpers/energy-accounts-api-helper';
import * as tokenGenerator from '../../../src/api-helpers/tokenGeneration-api-helpers';
import * as errorValidator from '../../../src/api-validations/error-validations';
import * as agreedPaymentValidator from '../../../src/api-validations/paymentSchedule-validations';
import * as header from '../../../src/constants/header-files';
import * as errorResponse from '../../../src/constants/response-errors';
import { nonOpenRESIAccIds } from '../../../src/data/nonOpenDatamerge';

globals.describe('CAT RESI R1 - GET Agreed Payment Schedule API', () => {
  let bearerTokens: string[][] = [];
  const bearerTokensTitle: string[] = ['Open Accounts', 'New Accounts', 'Cancelled Accounts'];
  globals.beforeAll(async () => {
    bearerTokens = await Promise.all([
      await tokenGenerator.RESIOpenTokenGen(),
      await tokenGenerator.RESIClosedTokenGen(),
      await tokenGenerator.RESINewTokenGen(),
      await tokenGenerator.RESICancelledTokenGen(),
    ]);
  });
  globals.test('CAT RESI R1 - GET Agreed Payment API Test Run 200 404 Status Code', async () => {
    for (let i = 0; i < bearerTokens.length; i++) {
      log.bgRed(`++++++++++ ${bearerTokensTitle[i]} +++++++++`);
      for (let j = 0; j < bearerTokens[i].length; j++) {
        header.EnergyHeaders.Authorization = `Bearer ${bearerTokens[i][j]}`;
        const accountsResponse = await accountHelper.getEnergyAccountsResponse(header.EnergyHeaders);
        const accounts = accountsResponse.body.data.accounts;
        if (accounts.length !== 0) {
          for (let k = 0; k < accounts.length; k++) {
            header.headers.Authorization = `Bearer ${bearerTokens[i][j]}`;
            const agreedPaymentResponse = await agreedPaymentHelper.getAgreedPaymentSchedule(
              header.headers,
              accounts[k].accountId,
            );
            log.cyan('Agreed Payment Schedule Response : ' + JSON.stringify(agreedPaymentResponse.body));
            log.green('Agreed Payment Schedule Status Code : ' + agreedPaymentResponse.statusCode);
            agreedPaymentValidator.validateAgreedPaymentResponse(agreedPaymentResponse);
          }
        } else if (accounts.length === 0) {
          const data = await nonOpenRESIAccIds();
          for (let l = 0; l <= data.length - 12; l++) {
            header.headers.Authorization = `Bearer ${bearerTokens[i][j]}`;
            const agreedPaymentResponse = await agreedPaymentHelper.getAgreedPaymentSchedule(header.headers, data[l]);
            const agreePaymentResponseStringify = JSON.stringify(agreedPaymentResponse.body);
            log.cyan(
              'Agreed Payment Schedule Response For Non Open Accounts is Empty : ' + agreePaymentResponseStringify,
            );
            log.green(
              'Agreed Payment Schedule Status Code When Energy Accounts is Empty : ' + agreedPaymentResponse.statusCode,
            );
            errorValidator.validateErrorResponse(
              agreedPaymentResponse,
              errorResponse.responseErrors.INVALID_ENERGY_ACCOUNT,
            );
          }
        }
      }
    }
  });
});
