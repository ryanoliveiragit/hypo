import 'dotenv/config';
import { db, inviteCodes as schema } from './db';

const VALID_CODES = ['HYPO-ALPHA', 'HYPO-BETA', 'VIP-2024', 'EARLY-XYZ'];

async function main() {
  const existing = await db.select({ code: schema.code }).from(schema);
  const existingSet = new Set(existing.map((r) => r.code));
  const toCreate = VALID_CODES.filter((c) => !existingSet.has(c));

  for (const code of toCreate) {
    await db.insert(schema).values({ code });
    console.log(`Created invite code: ${code}`);
  }

  console.log('Seed complete');
  process.exit(0);
}

main();
