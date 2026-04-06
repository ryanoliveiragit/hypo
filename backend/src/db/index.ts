import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from './schema';

function getClient() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.warn('⚠ No DATABASE_URL set — running without database. Set it in .env');
    return postgres('postgresql://postgres:postgres@localhost:5432/hypo', { max: 10 });
  }

  return postgres(url, {
    max: 20,
    idle_timeout: 20,
    max_lifetime: 60 * 30,
    ssl: true,
  });
}

export const client = getClient();
export const db = drizzle(client, { schema });
export * from './schema';
