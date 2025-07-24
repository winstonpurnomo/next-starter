import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

const dbFileName = process.env.DB_FILE_NAME;
if (!dbFileName) {
  throw new Error('DB_FILE_NAME environment variable is not set');
}

export default defineConfig({
  out: './src/db/out',
  schema: './src/db/schema',
  dialect: 'sqlite',
  dbCredentials: {
    url: dbFileName,
  },
});
