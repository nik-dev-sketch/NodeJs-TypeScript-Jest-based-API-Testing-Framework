import { errorCodes } from '../../constants/error-codes';
import { errorTitles } from '../../constants/error-titles';
import { HttpStatus } from '../../constants/httpStatus';
import { responseErrors } from '../../constants/response-errors';

import { IErrorResponseValidatorTemplate } from './error-templates.interface';

export function getExpectedResponseErrorDetails(errorType: responseErrors): IErrorResponseValidatorTemplate {
  const errorResponse: IErrorResponseValidatorTemplate = {
    statusCode: HttpStatus.DEFAULT,
    response: {
      code: '',
      title: '',
    },
  };

  switch (errorType) {
    //Status Code: 400 - BAD_REQUEST
    case responseErrors.MISSING_REQUIRED_FIELD: {
      errorResponse.statusCode = HttpStatus.BAD_REQUEST;
      errorResponse.response.title = errorTitles.MISSING_REQUIRED_FIELD;
      errorResponse.response.code = errorCodes.MISSING_REQUIRED_FIELD;
      break;
    }
    case responseErrors.MISSING_REQUIRED_HEADER: {
      errorResponse.statusCode = HttpStatus.BAD_REQUEST;
      errorResponse.response.title = errorTitles.MISSING_REQUIRED_HEADER;
      errorResponse.response.code = errorCodes.MISSING_REQUIRED_HEADER;
      break;
    }
    case responseErrors.INVALID_FIELD: {
      errorResponse.statusCode = HttpStatus.BAD_REQUEST;
      errorResponse.response.title = errorTitles.INVALID_FIELD;
      errorResponse.response.code = errorCodes.INVALID_FIELD;
      break;
    }
    case responseErrors.INVALID_HEADER: {
      errorResponse.statusCode = HttpStatus.BAD_REQUEST;
      errorResponse.response.title = errorTitles.INVALID_HEADER;
      errorResponse.response.code = errorCodes.INVALID_HEADER;
      break;
    }
    case responseErrors.INVALID_DATE: {
      errorResponse.statusCode = HttpStatus.BAD_REQUEST;
      errorResponse.response.title = errorTitles.INVALID_DATE;
      errorResponse.response.code = errorCodes.INVALID_DATE;
      break;
    }
    case responseErrors.INVALID_PAGE_SIZE: {
      errorResponse.statusCode = HttpStatus.BAD_REQUEST;
      errorResponse.response.title = errorTitles.INVALID_PAGE_SIZE;
      errorResponse.response.code = errorCodes.INVALID_PAGE_SIZE;
      break;
    }
    case responseErrors.INVALID_VERSION: {
      errorResponse.statusCode = HttpStatus.BAD_REQUEST;
      errorResponse.response.title = errorTitles.INVALID_VERSION;
      errorResponse.response.code = errorCodes.INVALID_VERSION;
      break;
    }

    //Status Code: 403 - FORBIDDEN
    case responseErrors.ADR_STATUS_NOT_ACTIVE: {
      errorResponse.statusCode = HttpStatus.FORBIDDEN;
      errorResponse.response.title = errorTitles.ADR_STATUS_NOT_ACTIVE;
      errorResponse.response.code = errorCodes.ADR_STATUS_NOT_ACTIVE;
      break;
    }
    case responseErrors.CONSENT_IS_REVOKED: {
      errorResponse.statusCode = HttpStatus.FORBIDDEN;
      errorResponse.response.title = errorTitles.CONSENT_IS_REVOKED;
      errorResponse.response.code = errorCodes.CONSENT_IS_REVOKED;
      break;
    }
    case responseErrors.CONSENT_IS_INVALID: {
      errorResponse.statusCode = HttpStatus.FORBIDDEN;
      errorResponse.response.title = errorTitles.CONSENT_IS_INVALID;
      errorResponse.response.code = errorCodes.CONSENT_IS_INVALID;
      break;
    }

    //Status Code: 404
    case responseErrors.RESOURCE_NOT_IMPLEMENTED: {
      errorResponse.statusCode = HttpStatus.NOT_FOUND;
      errorResponse.response.title = errorTitles.RESOURCE_NOT_IMPLEMENTED;
      errorResponse.response.code = errorCodes.RESOURCE_NOT_IMPLEMENTED;
      break;
    }
    case responseErrors.RESOURCE_NOT_FOUND: {
      errorResponse.statusCode = HttpStatus.NOT_FOUND;
      errorResponse.response.title = errorTitles.RESOURCE_NOT_FOUND;
      errorResponse.response.code = errorCodes.RESOURCE_NOT_FOUND;
      break;
    }
    case responseErrors.INVALID_RESOURCE: {
      errorResponse.statusCode = HttpStatus.NOT_FOUND;
      errorResponse.response.title = errorTitles.INVALID_RESOURCE;
      errorResponse.response.code = errorCodes.INVALID_RESOURCE;
      break;
    }
    case responseErrors.UNAVAILABLE_RESOURCE: {
      errorResponse.statusCode = HttpStatus.NOT_FOUND;
      errorResponse.response.title = errorTitles.UNAVAILABLE_RESOURCE;
      errorResponse.response.code = errorCodes.UNAVAILABLE_RESOURCE;
      break;
    }
    case responseErrors.INVALID_ENERGY_ACCOUNT: {
      errorResponse.statusCode = HttpStatus.NOT_FOUND;
      errorResponse.response.title = errorTitles.INVALID_ENERGY_ACCOUNT;
      errorResponse.response.code = errorCodes.INVALID_ENERGY_ACCOUNT;
      break;
    }
    case responseErrors.UNAVAILABLE_ENERGY_ACCOUNT: {
      errorResponse.statusCode = HttpStatus.NOT_FOUND;
      errorResponse.response.title = errorTitles.UNAVAILABLE_ENERGY_ACCOUNT;
      errorResponse.response.code = errorCodes.UNAVAILABLE_ENERGY_ACCOUNT;
      break;
    }
    case responseErrors.INVALID_SERVICE_POINT: {
      errorResponse.statusCode = HttpStatus.NOT_FOUND;
      errorResponse.response.title = errorTitles.INVALID_SERVICE_POINT;
      errorResponse.response.code = errorCodes.INVALID_SERVICE_POINT;
      break;
    }
    case responseErrors.UNAVAILABLE_SERVICE_POINT: {
      errorResponse.statusCode = HttpStatus.NOT_FOUND;
      errorResponse.response.title = errorTitles.UNAVAILABLE_SERVICE_POINT;
      errorResponse.response.code = errorCodes.UNAVAILABLE_SERVICE_POINT;
      break;
    }

    //Status Code: 406 - NOT_ACCEPTABLE
    case responseErrors.UNSUPPORTED_VERSION: {
      errorResponse.statusCode = HttpStatus.NOT_ACCEPTABLE;
      errorResponse.response.title = errorTitles.UNSUPPORTED_VERSION;
      errorResponse.response.code = errorCodes.UNSUPPORTED_VERSION;
      break;
    }

    //Status Code: 422 - UNPROCESSABLE_ENTITY
    case responseErrors.INVALID_CONSENT_ARRANGEMENT: {
      errorResponse.statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
      errorResponse.response.title = errorTitles.INVALID_CONSENT_ARRANGEMENT;
      errorResponse.response.code = errorCodes.INVALID_CONSENT_ARRANGEMENT;
      break;
    }

    case responseErrors.INVALID_PAGE: {
      errorResponse.statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
      errorResponse.response.title = errorTitles.INVALID_PAGE;
      errorResponse.response.code = errorCodes.INVALID_PAGE;
      break;
    }

    //Status Code: 422 - UNPROCESSABLE_ENTITY
    case responseErrors.UNPROCESSABLE_ENTITY: {
      errorResponse.statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
      errorResponse.response.title = errorTitles.INVALID_SERVICE_POINT;
      errorResponse.response.code = errorCodes.INVALID_SERVICE_POINT;
      break;
    }

    case responseErrors.UNPROCESSABLE_ENTITY_INVALID_ENERGY_ACCOUNT: {
      errorResponse.statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
      errorResponse.response.title = errorTitles.INVALID_ENERGY_ACCOUNT;
      errorResponse.response.code = errorCodes.INVALID_ENERGY_ACCOUNT;
      break;
    }
    case responseErrors.UNPROCESSABLE_ENTITY_UNAVAILABLE_ENERGY: {
      errorResponse.statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
      errorResponse.response.title = errorTitles.UNAVAILABLE_ENERGY_ACCOUNT;
      errorResponse.response.code = errorCodes.UNAVAILABLE_ENERGY_ACCOUNT;
      break;
    }

    case responseErrors.UNPROCESSABLE_ENTITY_INVALID_SERVICE: {
      errorResponse.statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
      errorResponse.response.title = errorTitles.UNPROCESSABLE_ENTITY_INVALID_SERVICE_POINT;
      errorResponse.response.code = errorCodes.UNPROCESSABLE_ENTITY_INVALID_SERVICE_POINT;
      break;
    }

    case responseErrors.UNPROCESSABLE_ENTITY_UNAVAILABLE_SERVICE: {
      errorResponse.statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
      errorResponse.response.title = errorTitles.UNPROCESSABLE_ENTITY_UNAVAILABLE_SERVICE_POINT;
      errorResponse.response.code = errorCodes.UNPROCESSABLE_ENTITY_UNAVAILABLE_SERVICE_POINT;
    }
  }
  return errorResponse;
}
