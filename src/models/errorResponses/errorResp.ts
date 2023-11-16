export interface ErrorResponse {
  errors: errors[];
}

export interface errors {
  code: string;
  title: string;
  detail: string;
}
