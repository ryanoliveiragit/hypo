import { defineConfig } from 'drizzle-kit';
import { env } from 'node:process';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL ?? 'postgresql://postgres:postgres@localhost:5432/hypo',
  },
});
