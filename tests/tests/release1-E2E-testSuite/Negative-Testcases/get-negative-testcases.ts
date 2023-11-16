import * as globals from '@jest/globals';
import log from 'ololog';

import * as balancesHelper from '../../../src/api-helpers/balances-api-helpers';
import * as billingHelper from '../../../src/api-helpers/billing-api-helpers';
import * as derHelper from '../../../src/api-helpers/der-api-helpers';
import * as accountHelper from '../../../src/api-helpers/energy-accounts-api-helper';
import * as invoicesHelper from '../../../src/api-helpers/invoices-api-helpers';
import * as servicepointsHelper from '../../../src/api-helpers/servicepoints-api-helper';
import * as tokenGenerator from '../../../src/api-helpers/tokenGeneration-api-helpers';
import * as usageHelper from '../../../src/api-helpers/usage-api-helpers';
import * as errorValidation from '../../../src/api-validations/error-validations';
import * as header from '../../../src/constants/header-files';
import * as payLoad from '../../../src/constants/requestBody';
import { responseErrors } from '../../../src/constants/response-errors';
import * as db from '../../../src/utils/databaseUtils/postgreSQL';

globals.describe('CAT RESI R1 - Negative Test Cases Test Suite', () => {
  let bearerTokens: string[][] = [];
  globals.beforeAll(async () => {
    bearerTokens = await Promise.all([await tokenGenerator.RESIOpenTokenGen()]);
  });

  globals.test('CAT RESI R1 - Negative Test Cases Invalid Version & Unsupported Version Test Run', async () => {
    for (let i = 0; i < bearerTokens.length; i++) {
      for (let j = 0; j < bearerTokens[i].length; j++) {
        header.invalidVersionHeaders.Authorization = `Bearer ${bearerTokens[i][j]}`;
        const accountsIResponse = await accountHelper.getEnergyAccountsResponse(header.invalidVersionHeaders);
        log.blue('Get Energy Accounts Invalid Version Response : ', JSON.stringify(accountsIResponse.body));
        log.green('Get Energy Accounts Status Code : ' + accountsIResponse.statusCode);
        errorValidation.validateErrorResponse(accountsIResponse, responseErrors.INVALID_VERSION);

        header.invalidVersionHeaders.Authorization = `Bearer ${bearerTokens[i][j]}`;
        const servicePointsIResponse = await servicepointsHelper.getServicepointsResponse(header.invalidVersionHeaders);
        log.red('Get Service Points Invalid Version Response : ', JSON.stringify(servicePointsIResponse.body));
        log.green('Get Service Points Invalid Version Status Code : ' + servicePointsIResponse.statusCode);
        errorValidation.validateErrorResponse(servicePointsIResponse, responseErrors.INVALID_VERSION);

        header.invalidVersionHeaders.Authorization = `Bearer ${bearerTokens[i][j]}`;
        const bulkBillingIResponse = await billingHelper.getBulkBilling(header.invalidVersionHeaders);
        log.magenta('Get Bulk Billing Invalid Version Response : ', JSON.stringify(bulkBillingIResponse.body));
        log.green('GetBulk Billing Invalid Version Status Code : ' + bulkBillingIResponse.statusCode);
        errorValidation.validateErrorResponse(bulkBillingIResponse, responseErrors.INVALID_VERSION);

        header.invalidVersionHeaders.Authorization = `Bearer ${bearerTokens[i][j]}`;
        const bulkBalancesIResponse = await balancesHelper.getBulkBalances(header.invalidVersionHeaders);
        log.yellow('Get Bulk Balances Invalid Version Response : ', JSON.stringify(bulkBalancesIResponse.body));
        log.green('Get Bulk Balances Invalid Version Status Code : ' + bulkBalancesIResponse.statusCode);
        errorValidation.validateErrorResponse(bulkBalancesIResponse, responseErrors.INVALID_VERSION);

        header.invalidVersionHeaders.Authorization = `Bearer ${bearerTokens[i][j]}`;
        const bulkInvoicesIResponse = await invoicesHelper.getBulkInvoices(header.invalidVersionHeaders);
        log.cyan('Get Bulk Invoices Invalid Version Response : ', JSON.stringify(bulkInvoicesIResponse.body));
        log.green('Get Bulk Invoices Invalid Version Status Code : ' + bulkInvoicesIResponse.statusCode);
        errorValidation.validateErrorResponse(bulkInvoicesIResponse, responseErrors.INVALID_VERSION);

        header.invalidVersionHeaders.Authorization = `Bearer ${bearerTokens[i][j]}`;
        const bulkUsageIResponse = await usageHelper.getBulkUsage(header.invalidVersionHeaders);
        log.blue('Get Bulk Usage Invalid Version Response : ', JSON.stringify(bulkUsageIResponse.body));
        log.green('Get Bulk Usage Invalid Version Status Code : ' + bulkUsageIResponse.statusCode);
        errorValidation.validateErrorResponse(bulkUsageIResponse, responseErrors.INVALID_VERSION);

        header.invalidVersionHeaders.Authorization = `Bearer ${bearerTokens[i][j]}`;
        const bulkDERIResponse = await derHelper.getBulkDer(header.invalidVersionHeaders);
        log.red('Get Bulk DER Invalid Version Response : ', JSON.stringify(bulkDERIResponse.body));
        log.green('Get Bulk DER Invalid Version Status Code : ' + bulkDERIResponse.statusCode);
        errorValidation.validateErrorResponse(bulkDERIResponse, responseErrors.INVALID_VERSION);

        header.unsupportedVersionHeaders.Authorization = `Bearer ${bearerTokens[i][j]}`;
        const accountsUResponse = await accountHelper.getEnergyAccountsResponse(header.unsupportedVersionHeaders);
        log.yellow('Get Energy Accounts Unsupported Version Response : ', JSON.stringify(accountsUResponse.body));
        log.green('Get Energy Accounts Unsupported Status Code : ' + accountsUResponse.statusCode);
        errorValidation.validateErrorResponse(accountsUResponse, responseErrors.UNSUPPORTED_VERSION);

        header.unsupportedVersionHeaders.Authorization = `Bearer ${bearerTokens[i][j]}`;
        const servicePointsUResponse = await servicepointsHelper.getServicepointsResponse(
          header.unsupportedVersionHeaders,
        );
        log.cyan('Get Service Points Unsupported Version Response : ', JSON.stringify(servicePointsUResponse.body));
        log.green('Get Service Points Unsupported Version Status Code : ' + servicePointsUResponse.statusCode);
        errorValidation.validateErrorResponse(servicePointsUResponse, responseErrors.UNSUPPORTED_VERSION);

        header.unsupportedVersionHeaders.Authorization = `Bearer ${bearerTokens[i][j]}`;
        const bulkBillingUResponse = await billingHelper.getBulkBilling(header.unsupportedVersionHeaders);
        log.red('Get Bulk Billing Unsupported Version Response : ', JSON.stringify(bulkBillingUResponse.body));
        log.green('Get Bulk Billing Unsupported Version Status Code : ' + bulkBillingUResponse.statusCode);
        errorValidation.validateErrorResponse(bulkBillingUResponse, responseErrors.UNSUPPORTED_VERSION);

        header.unsupportedVersionHeaders.Authorization = `Bearer ${bearerTokens[i][j]}`;
        const bulkBalancesUResponse = await balancesHelper.getBulkBalances(header.unsupportedVersionHeaders);
        log.blue('Get Bulk Balances Unsupported Version Response : ', JSON.stringify(bulkBalancesUResponse.body));
        log.green('Get Service Points Unsupported Version Status Code : ' + bulkBalancesUResponse.statusCode);
        errorValidation.validateErrorResponse(bulkBalancesUResponse, responseErrors.UNSUPPORTED_VERSION);

        header.unsupportedVersionHeaders.Authorization = `Bearer ${bearerTokens[i][j]}`;
        const bulkInvoicesUResponse = await invoicesHelper.getBulkInvoices(header.unsupportedVersionHeaders);
        log.yellow('Get Bulk Invoices Unsupported Version Response : ', JSON.stringify(bulkInvoicesUResponse.body));
        log.green('Get Service Points Unsupported Version Status Code : ' + bulkInvoicesUResponse.statusCode);
        errorValidation.validateErrorResponse(bulkInvoicesUResponse, responseErrors.UNSUPPORTED_VERSION);

        header.unsupportedVersionHeaders.Authorization = `Bearer ${bearerTokens[i][j]}`;
        const bulkUsageUResponse = await usageHelper.getBulkUsage(header.unsupportedVersionHeaders);
        log.magenta('Get Bulk Usagae Unsupported Version Response : ', JSON.stringify(bulkUsageUResponse.body));
        log.green('Get Bulk Usage Unsupported Version Status Code : ' + bulkUsageUResponse.statusCode);
        errorValidation.validateErrorResponse(bulkUsageUResponse, responseErrors.UNSUPPORTED_VERSION);

        header.unsupportedVersionHeaders.Authorization = `Bearer ${bearerTokens[i][j]}`;
        const bulkDERUResponse = await derHelper.getBulkDer(header.unsupportedVersionHeaders);
        log.cyan('Get Bulk DER Unsupported Version Response : ', JSON.stringify(bulkDERUResponse.body));
        log.green('Get Bulk DER Unsupported Version Status Code : ' + bulkDERUResponse.statusCode);
        errorValidation.validateErrorResponse(bulkDERUResponse, responseErrors.UNSUPPORTED_VERSION);

        const cniOpenData = await db.getCNIOpenAccounts();
        for (let j = 0; j < cniOpenData.length - 3; j++) {
          const requestBody: payLoad.requestBody_accounts = {
            data: { accountIds: [cniOpenData[j]] },
          };

          const AEMORequestBody: payLoad.requestBody_servicePoints = {
            data: { servicePointIds: [cniOpenData[j]] },
          };
          header.invalidVersionHeaders.Authorization = `Bearer ${bearerTokens[i][j]}`;
          const accountDetailsIResponse = await accountHelper.getEnergyAccountsdetailResponse(
            header.invalidVersionHeaders,
            cniOpenData[i],
          );
          log.blue(
            'Get Energy Account Detail Invalid Version Response : ',
            JSON.stringify(accountDetailsIResponse.body),
          );
          log.green('Get Energy Account Detail Imvalid Version Status Code : ' + accountDetailsIResponse.statusCode);
          errorValidation.validateErrorResponse(accountDetailsIResponse, responseErrors.INVALID_VERSION);

          header.invalidVersionHeaders.Authorization = `Bearer ${bearerTokens[i][j]}`;
          const servicePointDetailIResponse = await servicepointsHelper.getServicePointDetailResponse(
            header.invalidVersionHeaders,
            cniOpenData[i],
          );
          log.red(
            'Get Service Point Detail Invalid Version Response : ',
            JSON.stringify(servicePointDetailIResponse.body),
          );
          log.green('Get Service Point Detail Invalid Version Status Code : ' + servicePointDetailIResponse.statusCode);
          errorValidation.validateErrorResponse(servicePointDetailIResponse, responseErrors.INVALID_VERSION);

          header.invalidVersionHeaders.Authorization = `Bearer ${bearerTokens[i][j]}`;
          const getBillingIResponse = await billingHelper.getBillingForAccount(
            header.invalidVersionHeaders,
            cniOpenData[i],
          );
          log.magenta(
            'Get Billing For Energy Account Invalid Version Response : ',
            JSON.stringify(getBillingIResponse.body),
          );
          log.green('Get Billing For Energy Account Invalid Version Status Code : ' + getBillingIResponse.statusCode);
          errorValidation.validateErrorResponse(getBillingIResponse, responseErrors.INVALID_VERSION);

          const getBillingForSpecificIResponse = await billingHelper.getBillingForSpecificAccounts(
            { ...requestBody },
            header.invalidVersionHeaders,
          );
          log.magenta(
            'Get Billing For Specific Energy Account Invalid Version Response : ',
            JSON.stringify(getBillingIResponse.body),
          );
          log.green(
            'Get Billing For Energy Account Invalid Version Status Code : ' + getBillingForSpecificIResponse.statusCode,
          );
          errorValidation.validateErrorResponse(getBillingForSpecificIResponse, responseErrors.INVALID_VERSION);

          header.invalidVersionHeaders.Authorization = `Bearer ${bearerTokens[i][j]}`;
          const getBalancesIResponse = await balancesHelper.getBalancesForEnergyAccounts(
            header.invalidVersionHeaders,
            cniOpenData[i],
          );
          log.yellow(
            'Get Balances For Energy Account Invalid Version Response : ',
            JSON.stringify(getBalancesIResponse.body),
          );
          log.green('Get Balances For Energy Account Invalid Version Status Code : ' + getBalancesIResponse.statusCode);
          errorValidation.validateErrorResponse(getBalancesIResponse, responseErrors.INVALID_VERSION);

          const getBalancesForSpecificIResponse = await balancesHelper.getBalanceForSpecificAccountResponse(
            { ...requestBody },
            header.invalidVersionHeaders,
          );
          log.magenta(
            'Get Balances For Specific Energy Account Invalid Version Response : ',
            JSON.stringify(getBillingIResponse.body),
          );
          log.green(
            'Get Balances For Energy Account Invalid Version Status Code : ' +
              getBalancesForSpecificIResponse.statusCode,
          );
          errorValidation.validateErrorResponse(getBalancesForSpecificIResponse, responseErrors.INVALID_VERSION);

          header.invalidVersionHeaders.Authorization = `Bearer ${bearerTokens[i][j]}`;
          const getnvoicesIResponse = await invoicesHelper.getInvoicesForAccount(
            header.invalidVersionHeaders,
            cniOpenData[i],
          );
          log.white(
            'Get Invoices For Energy Account Invalid Version Response : ',
            JSON.stringify(getnvoicesIResponse.body),
          );
          log.green('Get Invoices For Energy Account Invalid Version Status Code : ' + getnvoicesIResponse.statusCode);
          errorValidation.validateErrorResponse(getBalancesIResponse, responseErrors.INVALID_VERSION);

          const getInvoicesForSpecificIResponse = await invoicesHelper.getInvoicesForSpecificAccounts(
            { ...requestBody },
            header.invalidVersionHeaders,
          );
          log.magenta(
            'Get Invoices For Specific Energy Account Invalid Version Response : ',
            JSON.stringify(getInvoicesForSpecificIResponse.body),
          );
          log.green(
            'Get Invoices For Energy Account Invalid Version Status Code : ' +
              getInvoicesForSpecificIResponse.statusCode,
          );
          errorValidation.validateErrorResponse(getInvoicesForSpecificIResponse, responseErrors.INVALID_VERSION);

          header.invalidVersionHeaders.Authorization = `Bearer ${bearerTokens[i][j]}`;
          const getUsageIResponse = await usageHelper.getUsageForServicepoint(
            header.invalidVersionHeaders,
            cniOpenData[i],
          );
          log.white('Get Usage For Service Point Invalid Version Response : ', JSON.stringify(getUsageIResponse.body));
          log.green('Get Usage For Service Point Invalid Version Status Code : ' + getUsageIResponse.statusCode);
          errorValidation.validateErrorResponse(getUsageIResponse, responseErrors.INVALID_VERSION);

          header.invalidVersionHeaders.Authorization = `Bearer ${bearerTokens[i][j]}`;
          const getUsageForSpecificIResponse = await usageHelper.getUsageForSpecificServicePoints(
            { ...AEMORequestBody },
            header.invalidVersionHeaders,
          );
          log.white(
            'Get Usage For Specific Service Point Invalid Version Response : ',
            JSON.stringify(getUsageForSpecificIResponse.body),
          );
          log.green(
            'Get Usage For Service Point Invalid Version Status Code : ' + getUsageForSpecificIResponse.statusCode,
          );
          errorValidation.validateErrorResponse(getUsageForSpecificIResponse, responseErrors.INVALID_VERSION);

          header.invalidVersionHeaders.Authorization = `Bearer ${bearerTokens[i][j]}`;
          const getDERIResponse = await derHelper.getDerForServicepoint(header.invalidVersionHeaders, cniOpenData[i]);
          log.white('Get DER For Service Point Invalid Version Response : ', JSON.stringify(getDERIResponse.body));
          log.green('Get DER For Service Point Invalid Version Status Code : ' + getDERIResponse.statusCode);
          errorValidation.validateErrorResponse(getDERIResponse, responseErrors.INVALID_VERSION);

          header.invalidVersionHeaders.Authorization = `Bearer ${bearerTokens[i][j]}`;
          const getDERForSpecificIResponse = await derHelper.getDerForSpecificServicepoint(
            { ...AEMORequestBody },
            header.invalidVersionHeaders,
          );
          log.white(
            'Get DER For Service Point Invalid Version Response : ',
            JSON.stringify(getDERForSpecificIResponse.body),
          );
          log.green('Get DER For Service Point Invalid Version Status Code : ' + getDERForSpecificIResponse.statusCode);
          errorValidation.validateErrorResponse(getDERForSpecificIResponse, responseErrors.INVALID_VERSION);

          header.unsupportedVersionHeaders.Authorization = `Bearer ${bearerTokens[i][j]}`;
          const accountDetailsUResponse = await accountHelper.getEnergyAccountsdetailResponse(
            header.unsupportedVersionHeaders,
            cniOpenData[i],
          );
          log.blue(
            'Get Energy Account Detail Invalid Version Response : ',
            JSON.stringify(accountDetailsUResponse.body),
          );
          log.green('Get Energy Account Detail Status Code : ' + accountDetailsUResponse.statusCode);
          errorValidation.validateErrorResponse(accountDetailsUResponse, responseErrors.UNSUPPORTED_VERSION);

          header.unsupportedVersionHeaders.Authorization = `Bearer ${bearerTokens[i][j]}`;
          const servicePointDetailUResponse = await servicepointsHelper.getServicePointDetailResponse(
            header.unsupportedVersionHeaders,
            cniOpenData[i],
          );
          log.red(
            'Get Service Point Detail Invalid Version Response : ',
            JSON.stringify(servicePointDetailUResponse.body),
          );
          log.green('Get Service Point Detail Invalid Version Status Code : ' + servicePointDetailUResponse.statusCode);
          errorValidation.validateErrorResponse(servicePointDetailUResponse, responseErrors.UNSUPPORTED_VERSION);

          header.unsupportedVersionHeaders.Authorization = `Bearer ${bearerTokens[i][j]}`;
          const getBillingUResponse = await billingHelper.getBillingForAccount(
            header.unsupportedVersionHeaders,
            cniOpenData[i],
          );
          log.magenta(
            'Get Billing For Energy Account Invalid Version Response : ',
            JSON.stringify(getBillingUResponse.body),
          );
          log.green('Get Billing For Energy Account Invalid Version Status Code : ' + getBillingUResponse.statusCode);
          errorValidation.validateErrorResponse(getBillingUResponse, responseErrors.UNSUPPORTED_VERSION);

          header.unsupportedVersionHeaders.Authorization = `Bearer ${bearerTokens[i][j]}`;
          const getBalancesUResponse = await balancesHelper.getBalancesForEnergyAccounts(
            header.unsupportedVersionHeaders,
            cniOpenData[i],
          );
          log.yellow(
            'Get Balances For Energy Account Invalid Version Response : ',
            JSON.stringify(getBalancesUResponse.body),
          );
          log.green('Get Balances For Energy Account Invalid Version Status Code : ' + getBalancesUResponse.statusCode);
          errorValidation.validateErrorResponse(getBalancesUResponse, responseErrors.UNSUPPORTED_VERSION);

          header.unsupportedVersionHeaders.Authorization = `Bearer ${bearerTokens[i][j]}`;
          const getnvoicesUResponse = await invoicesHelper.getInvoicesForAccount(
            header.unsupportedVersionHeaders,
            cniOpenData[i],
          );
          log.white(
            'Get Invoices For Energy Account Invalid Version Response : ',
            JSON.stringify(getnvoicesUResponse.body),
          );
          log.green('Get Invoices For Energy Account Invalid Version Status Code : ' + getnvoicesUResponse.statusCode);
          errorValidation.validateErrorResponse(getnvoicesUResponse, responseErrors.UNSUPPORTED_VERSION);

          header.unsupportedVersionHeaders.Authorization = `Bearer ${bearerTokens[i][j]}`;
          const getUsageUResponse = await usageHelper.getUsageForServicepoint(
            header.unsupportedVersionHeaders,
            cniOpenData[i],
          );
          log.white('Get Usage For Service Point Invalid Version Response : ', JSON.stringify(getUsageUResponse.body));
          log.green('Get Usage For Service Point Invalid Version Status Code : ' + getUsageUResponse.statusCode);
          errorValidation.validateErrorResponse(getUsageUResponse, responseErrors.UNSUPPORTED_VERSION);

          header.unsupportedVersionHeaders.Authorization = `Bearer ${bearerTokens[i][j]}`;
          const getDERUResponse = await derHelper.getDerForServicepoint(
            header.unsupportedVersionHeaders,
            cniOpenData[i],
          );
          log.white('Get DER For Service Point Invalid Version Response : ', JSON.stringify(getDERUResponse.body));
          log.green('Get DER For Service Point Invalid Version Status Code : ' + getDERUResponse.statusCode);
          errorValidation.validateErrorResponse(getDERUResponse, responseErrors.UNSUPPORTED_VERSION);
        }
      }
    }
  });

  globals.test('CAT RESI R1 - Negative Test Cases Invalid Consent Test Run', async () => {
    const tokens = await tokenGenerator.RESIOpenAccountsNoScopesTokensGen();
    for (let i = 0; i < tokens.length - 3; i++) {
      header.headers.Authorization = `Bearer ${tokens[i]}`;
      const accountsICResponse = await accountHelper.getEnergyAccountsResponse(header.headers);
      log.blue('Get Energy Accounts Invalid Consent Response : ', JSON.stringify(accountsICResponse.body));
      log.green('Get Energy Accounts Invalid Consent Status Code : ' + accountsICResponse.statusCode);
      errorValidation.validateErrorResponse(accountsICResponse, responseErrors.CONSENT_IS_INVALID);
      const servicePointsICResponse = await servicepointsHelper.getServicepointsResponse(header.headers);
      log.red('Get Service Points Invalid Consent Response : ', JSON.stringify(servicePointsICResponse.body));
      log.green('Get Service Points Invalid COnsent Status Code : ' + servicePointsICResponse.statusCode);
      errorValidation.validateErrorResponse(servicePointsICResponse, responseErrors.CONSENT_IS_INVALID);
      const bulkBillingIResponse = await billingHelper.getBulkBilling(header.headers);
      log.magenta('Get Bulk Billing Invalid Consent Response : ', JSON.stringify(bulkBillingIResponse.body));
      log.green('Get Bulk Billing Invalid Consent Status Code : ' + bulkBillingIResponse.statusCode);
      errorValidation.validateErrorResponse(bulkBillingIResponse, responseErrors.CONSENT_IS_INVALID);
      const bulkBalancesIResponse = await balancesHelper.getBulkBalances(header.headers);
      log.yellow('Get Bulk Balances Invalid Consent Response : ', JSON.stringify(bulkBalancesIResponse.body));
      log.green('Get Bulk Balances Invalid Consent Status Code : ' + bulkBalancesIResponse.statusCode);
      errorValidation.validateErrorResponse(bulkBalancesIResponse, responseErrors.CONSENT_IS_INVALID);
      const bulkInvoicesIResponse = await invoicesHelper.getBulkInvoices(header.headers);
      log.white('Get Bulk Inoices Invalid Consent Response : ', JSON.stringify(bulkInvoicesIResponse.body));
      log.green('Get Bulk Invoices Invalid Consent Status Code : ' + bulkInvoicesIResponse.statusCode);
      errorValidation.validateErrorResponse(bulkInvoicesIResponse, responseErrors.CONSENT_IS_INVALID);
      const bulkUsageIResponse = await usageHelper.getBulkUsage(header.headers);
      log.white('Get Bulk Usage Invalid Consent Response : ', JSON.stringify(bulkUsageIResponse.body));
      log.green('Get Bulk Usage Invalid Consent Status Code : ' + bulkUsageIResponse.statusCode);
      errorValidation.validateErrorResponse(bulkUsageIResponse, responseErrors.CONSENT_IS_INVALID);
      const bulkDERIResponse = await derHelper.getBulkDer(header.headers);
      log.white('Get Bulk DER Invalid Consent Response : ', JSON.stringify(bulkDERIResponse.body));
      log.green('Get Bulk DER Invalid Consent Status Code : ' + bulkDERIResponse.statusCode);
      errorValidation.validateErrorResponse(bulkDERIResponse, responseErrors.CONSENT_IS_INVALID);
    }
  });
});
