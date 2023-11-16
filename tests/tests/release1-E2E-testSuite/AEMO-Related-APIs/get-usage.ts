import * as globals from '@jest/globals';
import log from 'ololog';

import * as tokenGenerator from '../../../src/api-helpers/tokenGeneration-api-helpers';
import * as usageHelper from '../../../src/api-helpers/usage-api-helpers';
import * as header from '../../../src/constants/header-files';
import * as queryParams from '../../../src/constants/queryParams-files';
import * as payLoad from '../../../src/constants/requestBody';
import { nonOpenRESIAccIds } from '../../../src/data/nonOpenDatamerge';

globals.describe('CAT RESI R1 - Usage APIs Test Suite ', () => {
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
  globals.test('CAT RESI R1 - GET Usage APIs (Bulk, GET, POST) 200 OK, 404 & 422 Test Run', async () => {
    for (let i = 0; i < bearerTokens.length; i++) {
      log.bgRed(`++++++++++ ${bearerTokensTitle[i]} +++++++++`);
      for (let j = 0; j < bearerTokens[i].length; j++) {
        header.headers.Authorization = `Bearer ${bearerTokens[i][j]}`;
        const bulkUsageFullIntervalreadsResponse = await usageHelper.getBulkUsage(
          header.headers,
          queryParams.full_interval_reads,
        );
        log.cyan('Get Bulk Usage with FULL Interval Reads : ', JSON.stringify(bulkUsageFullIntervalreadsResponse.body));
        log.green(
          ' Get Bulk Usage with Full Interval Reads Status Code : ' + bulkUsageFullIntervalreadsResponse.statusCode,
        );
        const bulkUsageMinIntervalreadsResponse = await usageHelper.getBulkUsage(
          header.headers,
          queryParams.min_interval_reads,
        );
        log.red('Get Bulk Usage with FULL Interval Reads : ', JSON.stringify(bulkUsageMinIntervalreadsResponse.body));
        log.green(
          ' Get Bulk Usage with Full Interval Reads Status Code : ' + bulkUsageMinIntervalreadsResponse.statusCode,
        );
        const bulkUsageResponse = await usageHelper.getBulkUsage(header.headers);
        const bulkUsageResponseStringify = JSON.stringify(bulkUsageResponse.body);
        log.blue('Get Bulk Usage Response : ' + bulkUsageResponseStringify);
        log.green(' Get Bulk Usage Status Code : ' + bulkUsageResponse.statusCode);
        const reads = bulkUsageResponse.body.data.reads;
        if (reads.length !== 0) {
          for (let k = 0; k < reads.length; k++) {
            const getUsageForServicePointResponse = await usageHelper.getUsageForServicepoint(
              header.headers,
              reads[k].servicePointId,
            );
            const getUsageForServicePointResponseStringify = JSON.stringify(getUsageForServicePointResponse.body);
            log.magenta('Get Usage For Service Points Response : ' + getUsageForServicePointResponseStringify);
            log.green('Get Usage For Service Points Status Code : ' + getUsageForServicePointResponse.statusCode);
            const requestBody: payLoad.requestBody_servicePoints = {
              data: {
                servicePointIds: [reads[k].servicePointId],
              },
            };
            const postUsageForSpecificServicePointResponse = await usageHelper.getUsageForSpecificServicePoints(
              { ...requestBody },
              header.headers,
            );

            const postUsageForServicePointResponseStringify = JSON.stringify(
              postUsageForSpecificServicePointResponse.body,
            );
            log.yellow(
              'Post Usage For Specific Service Points Response : ' + postUsageForServicePointResponseStringify,
            );
            log.green(
              'Post Usage For Specific Service Points Status Code : ' +
                postUsageForSpecificServicePointResponse.statusCode,
            );
          }
        } else if (reads.length === 0) {
          const data = await nonOpenRESIAccIds();
          for (let l = 0; l <= data.length - 12; l++) {
            const getUsageForServicePointResponse = await usageHelper.getUsageForServicepoint(header.headers, data[l]);
            const getUsageForServicePointResponseStringify = JSON.stringify(getUsageForServicePointResponse.body);
            log.cyan(
              ' Get Usage for Service Point Response When Reads are Empty : ' +
                getUsageForServicePointResponseStringify,
            );
            log.green(
              'Get Usage for Service Point Status Code When Reads are Empty : ' +
                getUsageForServicePointResponse.statusCode,
            );
            const requestBody: payLoad.requestBody_servicePoints = {
              data: { servicePointIds: [data[l]] },
            };

            const postUsageForSpecificServicePointResponse = await usageHelper.getUsageForSpecificServicePoints(
              { ...requestBody },
              header.headers,
            );

            const postUsageForServicePointResponseStringify = JSON.stringify(
              postUsageForSpecificServicePointResponse.body,
            );
            log.yellow(
              'Post Usage For Specific Service Points Response When Reads are Empty : ' +
                postUsageForServicePointResponseStringify,
            );
            log.green(
              'Post Usage For Specific Service Points Status Code When Reads are Empty: ' +
                postUsageForSpecificServicePointResponse.statusCode,
            );
          }
        }
      }
    }
  });
});
