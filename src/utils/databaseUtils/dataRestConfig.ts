import * as dotenv from 'dotenv';

dotenv.config({ path: 'src/environments/dataRest_Services.env' });

export interface Config {
  host?: string;
  environment?: string;
  services?: string;
  endpoint?: string;
  query?: string;
  APIKEY?: string;
}

export const dataRestConfig: Config = {
  host: process.env.DATA_REST_HOST || '',
  environment: process.env.DATA_REST_ENVT || '',
  services: process.env.DATA_REST_SERVCIES || '',
  endpoint: process.env.DATA_REST_ENDPOINT || '',
  query: process.env.DATA_REST_QUERY || '',
  APIKEY: process.env.DATA_REST_APIKEY || '',
};
