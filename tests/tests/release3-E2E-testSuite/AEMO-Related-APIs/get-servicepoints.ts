import * as globals from '@jest/globals';
import log from 'ololog';

import * as serviceHelper from '../../../src/api-helpers/servicepoints-api-helper';
import * as tokenGenerator from '../../../src/api-helpers/tokenGeneration-api-helpers';
import * as header from '../../../src/constants/header-files';

globals.describe('C&I GET R3 - Service Points & Service Point Detail API Test Suite', () => {
  let bearerTokens: string[][] = [];
  const bearerTokensTitle: string[] = ['Secondary Users'];
  globals.beforeAll(async () => {
    bearerTokens = await Promise.all([await tokenGenerator.SDHTokenGen()]);
  });

  globals.test('SDH Service Points and Service Point Detail 200 OK & 404 Status Code Test Run', async () => {
    log.bgLightYellow('SDH Customers Service Points 200 & 404 Status Code Test Run Start');
    for (let i = 0; i < bearerTokens.length; i++) {
      log.bgRed(`++++++++++ ${bearerTokensTitle[i]} +++++++++`);
      for (let j = 0; j < bearerTokens[i].length; j++) {
        header.headers.Authorization = `Bearer ${bearerTokens[i][j]}`;
        const servicePointResponse = await serviceHelper.getServicepointsResponse(header.headers);
        const servicePointResponseStringify = JSON.stringify(servicePointResponse.body);
        log.red('Get Secondary DH Service Points Response : ' + servicePointResponseStringify);
        log.green('Get Secondary DH Service Points Status Code : ' + servicePointResponse.statusCode);
        const servicePoints = servicePointResponse.body.data.servicePoints;
        if (servicePoints.length !== 0) {
          for (let k = 0; k < servicePoints.length; k++) {
            const servicePointDetailResponse = await serviceHelper.getServicePointDetailResponse(
              header.headers,
              servicePoints[k].servicePointId,
            );
            const servicePointDetailStringify = JSON.stringify(servicePointDetailResponse.body);
            log.cyan('Get Secondary DH Service Point Detail Response : ' + servicePointDetailStringify);
            log.green('Get Secondary DH Service Point Detail Status Code : ' + servicePointDetailResponse.statusCode);
          }
        }
      }
    }
  });
});
