import { HttpStatus } from '../../constants/httpStatus';

export interface IErrorResponseValidatorTemplate {
  statusCode: HttpStatus;
  response: IErrorTemplate;
}

export interface IErrorResponseBody {
  errors: IErrorTemplate[];
}

export interface IErrorTemplate {
  code: string;
  title: string;
  detail?: string;
}
