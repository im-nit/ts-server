import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const { NODE_ENV, PORT, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN } = process.env;
export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { DB_HOST, DB_PORT, DB_DATABASE, DB_URL } = process.env;
