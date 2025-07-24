import 'server-only';

import { drizzle } from 'drizzle-orm/libsql';

function getEnv() {
  let dbFileName = process.env.DB_FILE_NAME;
  if (!dbFileName) {
    if (!process.env.CI) {
      throw new Error('DB_FILE_NAME environment variable is not set');
    }
    // Create a local database file so that `next build` doesn't fail
    dbFileName = 'file:local.db';
  }
  return dbFileName;
}

export const db = drizzle(getEnv());

export * from './schema';
