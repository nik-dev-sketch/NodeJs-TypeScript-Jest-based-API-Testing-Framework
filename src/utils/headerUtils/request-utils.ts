import fs from 'fs';

import { expect } from '@jest/globals';
import request from 'supertest-with-proxy';

export interface RequestParams {
  baseUrl: string;
  apiUrl: string;
  body?: any;
  queryParams?: any;
  headers: any;
}

export class RequestUtils {
  static logFileName = 'e2e-test-logs';
  static MTLS_AUTH_CERTIFICATE = process.env.MTLS_AUTH_CERTIFICATE || '';
  static MTLS_AUTH_KEY = process.env.MTLS_AUTH_KEY || '';

  async get(requestParams: RequestParams) {
    const cert = fs.readFileSync('src/environments/mtls.certificate.env', 'utf8');
    const key = fs.readFileSync('src/environments/mtls.key.env', 'utf8');

    let response: request.Response;
    const { baseUrl, apiUrl, queryParams, headers } = requestParams;
    const apiRequest: request.Request = request(baseUrl)
      .get(apiUrl)
      .set(headers)
      .key(key)
      .cert(cert)
      .proxy(process.env.HTTPS_PROXY);
    if (queryParams) response = await apiRequest.query(queryParams);
    else response = await apiRequest;
    if (process.env.ENABLE_LOGGING) this.logger(requestParams, response);
    return response;
  }

  async post(requestParams: RequestParams) {
    const cert = fs.readFileSync('src/environments/mtls.certificate.env', 'utf8');
    const key = fs.readFileSync('src/environments/mtls.key.env', 'utf8');
    const { baseUrl, apiUrl, body, queryParams, headers } = requestParams;
    const apiRequest: request.Request = request(baseUrl)
      .post(apiUrl)
      .send(body)
      .set(headers)
      .key(key)
      .cert(cert)
      .proxy(process.env.HTTPS_PROXY);
    if (queryParams) return await apiRequest.query(queryParams);
    const response = await apiRequest;
    if (process.env.ENABLE_LOGGING) this.logger(requestParams, response);
    return response;
  }

  logger(request: RequestParams, response: request.Response) {
    console.log(`*********** Starting Test Execution: ${expect.getState().currentTestName} **************`);
    console.log(JSON.stringify(request));
    console.log(JSON.stringify(response.body));
    console.log('************************* Ending Test Execution *******************************');
  }
}
