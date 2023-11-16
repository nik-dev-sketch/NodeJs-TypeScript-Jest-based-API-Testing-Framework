/* GET Usage API
Bulk Usage Endpoint: https://mtls.authncdr-test.energyaustralia.com.au/cds-au/v1/energy/electricity/servicepoints/usage
Usage For Service Points Endpoint: https://mtls.authncdr-test.energyaustralia.com.au/cds-au/v1/energy/electricity/servicepoints/{{servicePointId}}/usage
Usage For Specific Service Points Endpoint: https://mtls.authncdr-test.energyaustralia.com.au/cds-au/v1/energy/electricity/servicepoints/usage
Usage For Service Points and Specific Service Points Relies on Bulk Usage API for generating the Servicepoint ID*/

import * as globals from '@jest/globals';
import log from 'ololog';

import * as tokenGenerator from '../../../src/api-helpers/tokenGeneration-api-helpers';
import * as usageHelper from '../../../src/api-helpers/usage-api-helpers';
import * as header from '../../../src/constants/header-files';
import * as queryParams from '../../../src/constants/queryParams-files';
import * as payLoad from '../../../src/constants/requestBody';

globals.describe('CAT C&I R4 - Usage APIs Test Suite ', () => {
  log.bgGreen(`***********************CAT CNI Usage APIs Test Suite Started********************************`);
  let bearerTokens: string[][] = [];
  const bearerTokensTitle: string[] = ['Secondary Users Open Accounts'];
  globals.beforeAll(async () => {
    bearerTokens = await Promise.all([await tokenGenerator.SDHTokenGen()]);
  });
  globals.test('CAT SDH R3 - GET Usage APIs (Bulk, GET, POST) 200 OK, 404 & 422 Test Run', async () => {
    log.bgYellow('CAT SDH GET Usage API With NONE Interval Reads Test Run');
    for (let i = 0; i < bearerTokens.length; i++) {
      log.bgRed(`++++++++++ ${bearerTokensTitle[i]} +++++++++`);
      for (let j = 0; j < bearerTokens[i].length; j++) {
        header.headers.Authorization = `Bearer ${bearerTokens[i][j]}`;
        const bulkUsageResponse = await usageHelper.getBulkUsage(header.headers);
        const bulkUsageRespStringify = JSON.stringify(bulkUsageResponse.body);
        log.cyan('Get Bulk Usage Response : ', bulkUsageRespStringify);
        log.green(' Get Bulk Usage Status Code : ' + bulkUsageResponse.statusCode);
        const reads = bulkUsageResponse.body.data.reads;
        if (reads.length !== 0) {
          for (let k = 0; k < reads.length; k++) {
            if (reads.length > 1) {
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
              break;
            }
          }
        } else if (reads.length === 0) {
          log.red('No Non Open Accounts Available for Secondary Users');
        }
      }
    }
  });
  globals.test(
    'CAT SDH R3 - GET Usage API FULl Interval Reads (Bulk, GET, POST) 200 OK, 404 & 422 Test Run',
    async () => {
      log.bgYellow('CAT SDH GET Usage API With Full Interval Reads Test Run');
      for (let i = 0; i < bearerTokens.length; i++) {
        log.bgRed(`++++++++++ ${bearerTokensTitle[i]} +++++++++`);
        for (let j = 0; j < bearerTokens[i].length; j++) {
          header.headers.Authorization = `Bearer ${bearerTokens[i][j]}`;
          const bulkUsageFullIntervalreadsResponse = await usageHelper.getBulkUsage(
            header.headers,
            queryParams.full_interval_reads,
          );
          const bulkUsageRespStringify = JSON.stringify(bulkUsageFullIntervalreadsResponse.body);
          log.cyan('Get Bulk Usage With FULL Interval Reads : ', bulkUsageRespStringify);
          log.green(
            ' Get Bulk Usage with Full Interval Reads Status Code : ' + bulkUsageFullIntervalreadsResponse.statusCode,
          );
          const reads = bulkUsageFullIntervalreadsResponse.body.data.reads;
          if (reads.length !== 0) {
            for (let k = 0; k < reads.length; k++) {
              if (reads.length > 1) {
                const getUsageForServicePointResponse = await usageHelper.getUsageForServicepoint(
                  header.headers,
                  reads[k].servicePointId,
                  queryParams.full_interval_reads,
                );
                const getUsageForServicePointResponseStringify = JSON.stringify(getUsageForServicePointResponse.body);
                log.magenta(
                  'Get Usage For Service Points With Full Interval Reads Response: ' +
                    getUsageForServicePointResponseStringify,
                );
                log.green(
                  'Get Usage For Service Points Full Interval Reads Status Code : ' +
                    getUsageForServicePointResponse.statusCode,
                );
                const requestBody: payLoad.requestBody_servicePoints = {
                  data: {
                    servicePointIds: [reads[k].servicePointId],
                  },
                };
                const postUsageForSpecificServicePointResponse = await usageHelper.getUsageForSpecificServicePoints(
                  { ...requestBody },
                  header.headers,
                  queryParams.full_interval_reads,
                );

                const postUsageForServicePointResponseStringify = JSON.stringify(
                  postUsageForSpecificServicePointResponse.body,
                );
                log.yellow(
                  'Post Usage For Specific Service Points Full Interval Reads Response : ' +
                    postUsageForServicePointResponseStringify,
                );
                log.green(
                  'Post Usage For Specific Service Points Full Interval Reads Status Code : ' +
                    postUsageForSpecificServicePointResponse.statusCode,
                );
                break;
              }
            }
          } else if (reads.length === 0) {
            log.red('No Non Open Accounts Available for Secondary Users');
          }
        }
      }
    },
  );

  globals.test(
    'CAT SDH R3 - GET Usage API MIN_30 Interval Reads (Bulk, GET, POST) 200 OK, 404 & 422 Test Run',
    async () => {
      log.bgYellow('CAT SDH GET Usage API With MIN_30 Interval Reads Test Run');
      for (let i = 0; i < bearerTokens.length; i++) {
        log.bgRed(`++++++++++ ${bearerTokensTitle[i]} +++++++++`);
        for (let j = 0; j < bearerTokens[i].length; j++) {
          header.headers.Authorization = `Bearer ${bearerTokens[i][j]}`;
          const bulkUsageMinIntervalreadsResponse = await usageHelper.getBulkUsage(
            header.headers,
            queryParams.min_interval_reads,
          );
          const bulkUsageRespStringify = JSON.stringify(bulkUsageMinIntervalreadsResponse.body);
          log.cyan('Get Bulk Usage with MIN_30 Interval Reads : ', bulkUsageRespStringify);
          log.green(
            ' Get Bulk Usage with Full MIN_30 Reads Status Code : ' + bulkUsageMinIntervalreadsResponse.statusCode,
          );
          const reads = bulkUsageMinIntervalreadsResponse.body.data.reads;
          if (reads.length !== 0) {
            for (let k = 0; k < reads.length; k++) {
              if (reads.length > 1) {
                const getUsageForServicePointResponse = await usageHelper.getUsageForServicepoint(
                  header.headers,
                  reads[k].servicePointId,
                  queryParams.min_interval_reads,
                );
                const getUsageForServicePointResponseStringify = JSON.stringify(getUsageForServicePointResponse.body);
                log.magenta(
                  'Get Usage For Service Points MIN_30 Interval Reads Response : ' +
                    getUsageForServicePointResponseStringify,
                );
                log.green(
                  'Get Usage For Service Points MIN_30 Interval Reads Status Code : ' +
                    getUsageForServicePointResponse.statusCode,
                );
                const requestBody: payLoad.requestBody_servicePoints = {
                  data: {
                    servicePointIds: [reads[k].servicePointId],
                  },
                };
                const postUsageForSpecificServicePointResponse = await usageHelper.getUsageForSpecificServicePoints(
                  { ...requestBody },
                  header.headers,
                  queryParams.min_interval_reads,
                );

                const postUsageForServicePointResponseStringify = JSON.stringify(
                  postUsageForSpecificServicePointResponse.body,
                );
                log.yellow(
                  'Post Usage For Specific Service Points MIN_30 Interval Reads Response : ' +
                    postUsageForServicePointResponseStringify,
                );
                log.green(
                  'Post Usage For Specific Service Points MIN_30 Interval Reads Status Code : ' +
                    postUsageForSpecificServicePointResponse.statusCode,
                );
                break;
              }
            }
          } else if (reads.length === 0) {
            log.red('No Non Open Accounts Available for Secondary Users');
          }
        }
      }
    },
  );
});
