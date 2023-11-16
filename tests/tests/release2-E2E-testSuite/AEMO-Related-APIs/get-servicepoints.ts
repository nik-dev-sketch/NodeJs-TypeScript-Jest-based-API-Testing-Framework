/* GET Servicepoints API
Service Points Endpoint: https://mtls.authncdr-test.energyaustralia.com.au/cds-au/v1/energy/electricity/servicepoints/
Service Point Detail Endpoint: https://mtls.authncdr-test.energyaustralia.com.au/cds-au/v1/energy/electricity/servicepoints/{{servicePointId}}/
Service Points Detail and Service Points Relies on Bulk Usage API for generating the Servicepoint ID*/

import * as globals from '@jest/globals';
import log from 'ololog';

import * as serviceHelper from '../../../src/api-helpers/servicepoints-api-helper';
import * as tokenGenerator from '../../../src/api-helpers/tokenGeneration-api-helpers';
import * as header from '../../../src/constants/header-files';
import { nonOpenRESIAccIds } from '../../../src/data/nonOpenDatamerge';

globals.describe('CAT RESI R1 - GET Service Points & Service Point Detail API Test Suite', () => {
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

  globals.test('CAT RESI R1 - Service Points and Service Point Details 200 OK & 404 Status Code Test Run', async () => {
    for (let i = 0; i < bearerTokens.length; i++) {
      log.bgRed(`++++++++++ ${bearerTokensTitle[i]} +++++++++`);
      for (let j = 0; j < bearerTokens[i].length; j++) {
        header.headers.Authorization = `Bearer ${bearerTokens[i][j]}`;
        const servicePointResponse = await serviceHelper.getServicepointsResponse(header.headers);
        const servicePointResponseStringify = JSON.stringify(servicePointResponse.body);
        log.red('Get Service Points Response : ' + servicePointResponseStringify);
        log.green('Get Service Points Status Code : ' + servicePointResponse.statusCode);
        const servicePoints = servicePointResponse.body.data.servicePoints;
        if (servicePoints.length !== 0) {
          for (let k = 0; k < servicePoints.length; k++) {
            const servicePointDetailResponse = await serviceHelper.getSecondaryDHServicePointDetailResponse(
              header.headers,
              servicePoints[k].servicePointId,
            );
            const servicePointDetailStringify = JSON.stringify(servicePointDetailResponse.body);
            log.cyan('Get Service Point Detail Response : ' + servicePointDetailStringify);
            log.green('Get Service Point Detail Status Code : ' + servicePointDetailResponse.statusCode);
          }
        } else if (servicePoints.length === 0) {
          const data = await nonOpenRESIAccIds();
          for (let l = 0; l <= data.length - 12; l++) {
            const servicePointDetailResponse = await serviceHelper.getSecondaryDHServicePointDetailResponse(
              header.headers,
              data[l],
            );
            const servicePointDetailStringify = JSON.stringify(servicePointDetailResponse.body);
            log.cyan('Get Service Point Detail Response for Empty Service Points Resp: ' + servicePointDetailStringify);
            log.green(
              ' Get Service Point Detail Status Code for Empty Service Points Resp : ' +
                servicePointDetailResponse.statusCode,
            );
          }
        }
      }
    }
  });
});
