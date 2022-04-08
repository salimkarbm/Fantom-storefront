import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_TEST_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  NODE_ENV,
  POSTGRES_PORT,
} = process.env;

let client: Pool;

if (NODE_ENV === 'dev') {
  client = new Pool({
    host: POSTGRES_HOST,
    user: POSTGRES_USER,
    database: POSTGRES_DB,
    password: POSTGRES_PASSWORD,
    port: parseInt(POSTGRES_PORT as string, 10),
  });
} else {
  client = new Pool({
    host: POSTGRES_HOST,
    user: POSTGRES_USER,
    database: POSTGRES_TEST_DB,
    password: POSTGRES_PASSWORD,
    port: parseInt(POSTGRES_PORT as string, 10),
  });
}

export default client;
