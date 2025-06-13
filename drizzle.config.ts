import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/database',
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.DB_FILE_NAME,
  },
});
