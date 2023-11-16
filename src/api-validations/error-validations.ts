import { expect } from '@jest/globals';
import { Response } from 'supertest';

import { responseErrors } from '../constants/response-errors';
import { IErrorResponseBody } from '../models/errorResponses/error-templates.interface';
import { getExpectedResponseErrorDetails } from '../models/errorResponses/response-error-details';

export function validateErrorResponse(response: Response, errorType: responseErrors): void {
  const expectedErrorDetails = getExpectedResponseErrorDetails(errorType);
  const actualResponse = response.body as IErrorResponseBody;
  expect(response.status).toBe(expectedErrorDetails.statusCode);
  expect(actualResponse.errors.length > 0).toBeTruthy();
  const [errorDetails] = actualResponse.errors;
  expect(errorDetails.code).toBe(expectedErrorDetails.response.code);
  expect(errorDetails.title).toBe(expectedErrorDetails.response.title);
  expect(errorDetails.detail).not.toBeUndefined();
}
