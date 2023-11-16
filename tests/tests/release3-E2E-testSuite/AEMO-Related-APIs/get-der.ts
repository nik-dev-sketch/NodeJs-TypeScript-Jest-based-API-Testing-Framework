/* GET DER API
Bulk DER Endpoint: https://mtls.authncdr-test.energyaustralia.com.au/cds-au/v1/energy/electricity/servicepoints/der
DER For Service Points Endpoint: https://mtls.authncdr-test.energyaustralia.com.au/cds-au/v1/energy/electricity/servicepoints/{{servicePointId}}/der
DER For Specific Service Points Endpoint: https://mtls.authncdr-test.energyaustralia.com.au/cds-au/v1/energy/electricity/servicepoints/der
DER For Service Points and Specific Service Points Relies on Bulk DER API for generating the Servicepoint ID*/

import * as globals from '@jest/globals';
import log from 'ololog';

import * as derHelper from '../../../src/api-helpers/der-api-helpers';
import * as tokenGenerator from '../../../src/api-helpers/tokenGeneration-api-helpers';
import * as header from '../../../src/constants/header-files';
import * as queryParams from '../../../src/constants/queryParams-files';
import * as payLoad from '../../../src/constants/requestBody';

globals.describe('CAT SDH R3 - DER APIs Test Suite ', () => {
  let bearerTokens: string[][] = [];
  const bearerTokensTitle: string[] = ['Secondary Users Open Accounts'];
  globals.beforeAll(async () => {
    bearerTokens = await Promise.all([await tokenGenerator.SDHTokenGen()]);
  });
  globals.test('CAT SDH R3 - GET DER for Service Points 200 OK, 404 and 422 Status Code Test Run', async () => {
    log.bgYellow('CAT SDH GET DER API With NONE Interval Reads Test Run');
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
            if (derRecords.length > 1) {
              const getDerForServicePointResponse = await derHelper.getDerForServicepoint(
                header.headers,
                derRecords[k].servicePointId,
              );
              log.red('Get DER for Service Points Response : ' + JSON.stringify(getDerForServicePointResponse.body));
              log.green('Get DER for Service Points Status Code : ' + getDerForServicePointResponse.statusCode);
              const requestBody: payLoad.requestBody_servicePoints = {
                data: { servicePointIds: [derRecords[k].servicePointId] },
              };
              const postDerForSpecificServicePointResponse = await derHelper.getDerForSpecificServicepoint(
                { ...requestBody },
                header.headers,
              );
              log.yellow(
                'Get DER for Specific Service Points Response : ' +
                  JSON.stringify(postDerForSpecificServicePointResponse.body),
              );
              log.green(
                'Get DER for Specific Service Points Status Code : ' +
                  postDerForSpecificServicePointResponse.statusCode,
              );
              break;
            }
          }
        } else if (derRecords.length === 0) {
          log.red('No Non Open Accounts Available for Secondary Users');
        }
      }
    }
  });

  globals.test(
    'CAT SDH R3 - GET DER for Service Points MIN_30 Interval Reads 200 OK, 404 and 422 Status Code Test Run',
    async () => {
      log.bgYellow('CAT SDH GET DER API With MIN_30 Interval Reads Test Run');
      for (let i = 0; i < bearerTokens.length; i++) {
        log.bgRed(`++++++++++ ${bearerTokensTitle[i]} +++++++++`);
        for (let j = 0; j < bearerTokens[i].length; j++) {
          header.headers.Authorization = `Bearer ${bearerTokens[i][j]}`;
          const bulkDerResponse = await derHelper.getBulkDer(header.headers, queryParams.min_interval_reads);
          const bulkDerResponseStringify = JSON.stringify(bulkDerResponse.body);
          log.blue('Get Bulk DER MIN_30 Interval Reads Response : ' + bulkDerResponseStringify);
          log.green('Get Bulk DER MIN_30 Interval Reads Status Code : ' + bulkDerResponse.statusCode);
          const bulkDerJSONresponse = JSON.parse(bulkDerResponseStringify);
          const derRecords = bulkDerJSONresponse.data.derRecords;
          if (derRecords.length !== 0) {
            for (let k = 0; k < derRecords.length; k++) {
              if (derRecords.length > 1) {
                const getDerForServicePointResponse = await derHelper.getDerForServicepoint(
                  header.headers,
                  derRecords[k].servicePointId,
                  queryParams.min_interval_reads,
                );
                log.red(
                  'Get DER for Service Points MIN_30 Interval Reads Response : ' +
                    JSON.stringify(getDerForServicePointResponse.body),
                );
                log.green(
                  'Get DER for Service Points MIN_30 Interval Reads Status Code : ' +
                    getDerForServicePointResponse.statusCode,
                );
                const requestBody: payLoad.requestBody_servicePoints = {
                  data: { servicePointIds: [derRecords[k].servicePointId] },
                };
                const postDerForSpecificServicePointResponse = await derHelper.getDerForSpecificServicepoint(
                  { ...requestBody },
                  header.headers,
                  queryParams.min_interval_reads,
                );
                log.yellow(
                  'Get DER for Specific Service Points MIN_30 Interval Reads Response : ' +
                    JSON.stringify(postDerForSpecificServicePointResponse.body),
                );
                log.green(
                  'Get DER for Specific Service Points MIN_30 Interval Reads Status Code : ' +
                    postDerForSpecificServicePointResponse.statusCode,
                );
                break;
              }
            }
          } else if (derRecords.length === 0) {
            log.red('No Non Open Accounts Available for Secondary Users');
          }
        }
      }
    },
  );
});
