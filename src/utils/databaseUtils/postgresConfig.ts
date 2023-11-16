import * as dotenv from 'dotenv';

dotenv.config({ path: 'src/environments/postgres_db.env' });

export interface Config {
  user?: string;
  password?: string;
  host?: string;
  database?: string;
  port?: string;
  connectionString?: string;
  ssl?: any;
  types?: any;
  statement_timeout?: number;
  query_timeout?: number;
  application_name?: string;
  connectionTimeoutMills?: number;
  idle_in_transaction_session_timeout?: number;
}

export const postGresConfig: Config = {
  user: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  host: process.env.DB_HOST || '',
  database: process.env.DB_NAME || '',
  port: process.env.DB_PORT || '5432',
};
