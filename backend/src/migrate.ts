import 'dotenv/config';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!, {
  max: 1,
  ssl: true,
});

async function main() {
  console.log('Dropping existing tables...');

  await sql`DROP TABLE IF EXISTS views CASCADE`;
  await sql`DROP TABLE IF EXISTS images CASCADE`;
  await sql`DROP TABLE IF EXISTS links CASCADE`;
  await sql`DROP TABLE IF EXISTS profiles CASCADE`;
  await sql`DROP TABLE IF EXISTS users CASCADE`;
  await sql`DROP TABLE IF EXISTS invite_codes CASCADE`;
  console.log('Tables dropped');

  // 1. invite_codes (no FKs)
  await sql`
    CREATE TABLE invite_codes (
      id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
      code TEXT NOT NULL UNIQUE,
      used_by TEXT,
      used_at TIMESTAMP,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL
    )
  `;
  console.log('1/6 invite_codes');

  // 2. users (FK to invite_codes — SET NULL to avoid circular)
  await sql`
    CREATE TABLE users (
      id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
      username TEXT NOT NULL UNIQUE,
      display_name TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      invite_code_id TEXT,
      session_token TEXT,
      is_premium BOOLEAN DEFAULT false NOT NULL,
      username_change_at TIMESTAMP,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL,
      updated_at TIMESTAMP DEFAULT NOW() NOT NULL
    )
  `;
  console.log('2/6 users');

  // Add FK invite_codes -> users (used_by) after users exists
  await sql`ALTER TABLE invite_codes ADD CONSTRAINT invite_codes_used_by_fkey FOREIGN KEY (used_by) REFERENCES users(id) ON DELETE SET NULL`;
  await sql`ALTER TABLE users ADD CONSTRAINT users_invite_code_fkey FOREIGN KEY (invite_code_id) REFERENCES invite_codes(id) ON DELETE SET NULL`;
  console.log('FKs for invite_codes <-> users');

  // 3. profiles
  await sql`
    CREATE TABLE profiles (
      id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      bio TEXT DEFAULT '' NOT NULL,
      layout TEXT DEFAULT 'centered' NOT NULL,
      effect TEXT DEFAULT 'gradient' NOT NULL,
      font TEXT DEFAULT 'inter' NOT NULL,
      accent_color TEXT DEFAULT '#cc1111' NOT NULL,
      bg_preset TEXT DEFAULT 'none' NOT NULL,
      clan TEXT,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL,
      updated_at TIMESTAMP DEFAULT NOW() NOT NULL
    )
  `;
  console.log('3/6 profiles');

  // 4. links
  await sql`
    CREATE TABLE links (
      id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      label TEXT NOT NULL,
      url TEXT NOT NULL,
      icon TEXT DEFAULT 'link' NOT NULL,
      "order" INTEGER DEFAULT 0 NOT NULL,
      active BOOLEAN DEFAULT true NOT NULL,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL
    )
  `;
  console.log('4/6 links');

  // 5. images
  await sql`
    CREATE TABLE images (
      id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      filename TEXT NOT NULL,
      file_url TEXT NOT NULL,
      file_size INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL
    )
  `;
  console.log('5/6 images');

  // 6. views
  await sql`
    CREATE TABLE views (
      id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      "timestamp" BIGINT NOT NULL,
      count INTEGER DEFAULT 1 NOT NULL
    )
  `;
  console.log('6/6 views');

  // Index
  await sql`CREATE INDEX views_user_ts_idx ON views(user_id, timestamp)`;
  console.log('Index created');

  // Seed invite codes
  const codes = ['HYPO-ALPHA', 'HYPO-BETA', 'VIP-2024', 'EARLY-XYZ'];
  for (const code of codes) {
    await sql`INSERT INTO invite_codes (id, code) VALUES (gen_random_uuid(), ${code})`;
    console.log('Seeded:', code);
  }

  console.log('\n✅ All tables created!');
  await sql.end();
  process.exit(0);
}

main();
