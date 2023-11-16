import * as globals from '@jest/globals';
import log from 'ololog';

import * as customerHelper from '../../../src/api-helpers/customer-api-helper';
import * as tokenGenerator from '../../../src/api-helpers/tokenGeneration-api-helpers';
import * as header from '../../../src/constants/header-files';

globals.describe('CAT SDH R3 - GET Customer APIs Test Suite', () => {
  let bearerTokens: string[][] = [];
  const bearerTokensTitle: string[] = ['Secondary Users'];
  globals.beforeAll(async () => {
    bearerTokens = await Promise.all([await tokenGenerator.SDHTokenGen()]);
  });
  globals.test('CAT SDH R3 - GET Customer & Customer Detail API Test Run 200 OK', async () => {
    for (let i = 0; i < bearerTokens.length; i++) {
      log.bgRed(`++++++++++ ${bearerTokensTitle[i]} +++++++++`);
      for (let j = 0; j < bearerTokens[i].length; j++) {
        header.headers.Authorization = `Bearer ${bearerTokens[i][j]}`;
        const customerResponse = await customerHelper.getCustomer(header.headers);
        log.blue('Get Customer Response : ' + JSON.stringify(customerResponse.body));
        log.green('Get Customer Status Code : ' + customerResponse.statusCode);
        header.headers.Authorization = `Bearer ${bearerTokens[i][j]}`;
        const customerDetailResponse = await customerHelper.getCustomer(header.headers);
        log.red('Get Customer Detail Response : ' + JSON.stringify(customerDetailResponse.body));
        log.green('Get Customer Detail Status Code : ' + customerDetailResponse.statusCode);
      }
    }
  });
  globals.test('CAT SDH R3 - GET Customer Status & Customer Outages API Test Run', async () => {
    const customerStatusResponse = await customerHelper.getCustomerStatus(header.version2Headers);
    log.magenta('Get Customer Status Response : ' + JSON.stringify(customerStatusResponse.body));
    log.green('Get Customer Status Status Code : ' + customerStatusResponse.statusCode);
    const customerOutagesResponse = await customerHelper.getCustomerOutages(header.version2Headers);
    log.cyan('Get Customer Outgaes Response : ' + JSON.stringify(customerOutagesResponse.body));
    log.green('Get Customer Outages Status Code : ' + customerOutagesResponse.statusCode);
  });
});
