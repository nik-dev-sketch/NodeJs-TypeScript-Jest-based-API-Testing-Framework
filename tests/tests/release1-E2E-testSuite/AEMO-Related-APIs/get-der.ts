import * as globals from '@jest/globals';
import log from 'ololog';

import * as derHelper from '../../../src/api-helpers/der-api-helpers';
import * as tokenGenerator from '../../../src/api-helpers/tokenGeneration-api-helpers';
import * as header from '../../../src/constants/header-files';
import * as payLoad from '../../../src/constants/requestBody';
import { nonOpenRESIAccIds } from '../../../src/data/nonOpenDatamerge';

globals.describe('CAT RESI R1 - DER APIs Test Suite ', () => {
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
  globals.test('CAT RESI R1 - GET DER for Service Points 200 OK, 404 and 422 Status Code Test Run', async () => {
    for (let i = 0; i < bearerTokens.length; i++) {
      log.bgRed(`++++++++++ ${bearerTokensTitle[i]} +++++++++`);
      for (let j = 0; j < bearerTokens[i].length; j++) {
        header.headers.Authorization = `Bearer ${bearerTokens[i][j]}`;
        const bulkDerResponse = await derHelper.getBulkDer(header.headers);
        const bulkDerResponseStringify = JSON.stringify(bulkDerResponse.body);
        log.blue('Get Bulk DER Response : ' + bulkDerResponseStringify);
        log.green('Get Bulk DER Status Code : ' + bulkDerResponse.statusCode);
        const bulkDerJSONresponse = JSON.parse(bulkDerResponseStringify);
        const derRecords = bulkDerJSONresponse.data.derRecords;
        if (derRecords.length !== 0) {
          for (let k = 0; k < derRecords.length; k++) {
            const getDerForServicePointResponse = await derHelper.getDerForServicepoint(
              header.headers,
              derRecords[k].servicePointId,
            );
            const getDerForServicePointResponseStringify = JSON.stringify(getDerForServicePointResponse.body);
            log.red('Get DER for Service Points Response : ' + getDerForServicePointResponseStringify);
            log.green('Get DER for Service Points Status Code : ' + getDerForServicePointResponse.statusCode);
            const requestBody: payLoad.requestBody_servicePoints = {
              data: { servicePointIds: [derRecords[k].servicePointId] },
            };
            const postDerForSpecificServicePointResponse = await derHelper.getDerForSpecificServicepoint(
              { ...requestBody },
              header.headers,
            );

            const postDerForServicePointResponseStringify = JSON.stringify(postDerForSpecificServicePointResponse.body);
            log.yellow('Get DER for Specific Service Points Response : ' + postDerForServicePointResponseStringify);
            log.green(
              'Get DER for Specific Service Points Status Code : ' + postDerForSpecificServicePointResponse.statusCode,
            );
          }
        } else if (derRecords.length === 0) {
          const data = await nonOpenRESIAccIds();
          for (let l = 0; l <= data.length - 12; l++) {
            const getDerForServicePointResponse = await derHelper.getDerForServicepoint(header.headers, data[l]);
            const getDerForServicePointResponseStringify = JSON.stringify(getDerForServicePointResponse.body);
            log.blue(
              'Get DER for Service Points Response when DER Records are Empty: ' +
                getDerForServicePointResponseStringify,
            );
            log.red(
              'Get DER for Service Points Status Code When DER Records are Empty: ' +
                getDerForServicePointResponse.statusCode,
            );
            const requestBody: payLoad.requestBody_servicePoints = {
              data: { servicePointIds: [data[l]] },
            };

            const postDerForSpecificServicePointResponse = await derHelper.getDerForSpecificServicepoint(
              { ...requestBody },
              header.headers,
            );

            const postDerForServicePointResponseStringify = JSON.stringify(postDerForSpecificServicePointResponse.body);
            log.yellow(
              'Get DER For Specific Service Points Response When DER Records are Empty : ' +
                postDerForServicePointResponseStringify,
            );
            log.green(
              'Get DER For Specific Service Points Status Code When DER Records are Empty: ' +
                postDerForSpecificServicePointResponse.statusCode,
            );
          }
        }
      }
    }
  });
});
