import 'dotenv/config';
import postgres from 'postgres';
import bcrypt from 'bcryptjs';

const sql = postgres(process.env.DATABASE_URL!, {
  max: 1,
  ssl: true,
});

async function main() {
  const passwordHash = await bcrypt.hash('demo123', 10);

  // Delete existing users first
  await sql`DELETE FROM users WHERE username IN ('hypo', 'demo_user')`;

  // Create user 'hypo'
  const [hypo] = await sql`
    INSERT INTO users (username, display_name, password_hash, is_premium)
    VALUES ('hypo', 'Hypo', ${passwordHash}, true)
    RETURNING *
  `;
  console.log('Created user:', hypo.username);

  await sql`
    INSERT INTO profiles (user_id, bio, layout, effect, font, accent_color, bg_preset)
    VALUES (${hypo.id}, 'hypo.lol — Link-in-bio exclusivo por invite.', 'centered', 'red-fog', 'inter', '#cc1111', 'red-fog')
  `;

  // Create user 'demo_user'
  const [demo] = await sql`
    INSERT INTO users (username, display_name, password_hash, is_premium)
    VALUES ('demo_user', 'demo_user', ${passwordHash}, true)
    RETURNING *
  `;
  console.log('Created user:', demo.username);

  await sql`
    INSERT INTO profiles (user_id, bio, layout, effect, font, bg_preset)
    VALUES (${demo.id}, 'perfil de demonstração — crie o seu em hypo.lol', 'centered', 'gradient', 'inter', 'noise')
  `;

  console.log('\nCredentials for both users:');
  console.log('  Username: hypo    Password: demo123');
  console.log('  Username: demo_user  Password: demo123');

  await sql.end();
  process.exit(0);
}

main();
