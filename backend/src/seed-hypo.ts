import 'dotenv/config';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!, {
  max: 1,
  ssl: true,
});

async function main() {
  // Check if user already exists
  const existing = await sql`SELECT id FROM users WHERE username = 'hypo'`;
  if (existing.length > 0) {
    console.log('User "hypo" already exists, skipping');
    await sql.end();
    process.exit(0);
  }

  const sessionToken = crypto.randomUUID();

  // 1. Create user
  const [user] = await sql`
    INSERT INTO users (username, display_name, session_token, is_premium)
    VALUES ('hypo', 'Hypo', ${sessionToken}, true)
    RETURNING *
  `;
  console.log('Created user:', user.username);

  // 2. Create profile
  await sql`
    INSERT INTO profiles (user_id, bio, layout, effect, font, accent_color, bg_preset)
    VALUES (${user.id}, 'hypo.lol — Link-in-bio exclusivo por invite.', 'centered', 'red-fog', 'inter', '#cc1111', 'red-fog')
  `;
  console.log('Created profile');

  // 3. Create default links
  const linksData = [
    { label: 'Discord', url: '#', icon: 'discord' },
    { label: 'Github', url: 'https://github.com/Hypo', icon: 'github' },
    { label: 'Twitter / X', url: '#', icon: 'twitter' },
  ];

  for (let i = 0; i < linksData.length; i++) {
    const link = linksData[i];
    await sql`
      INSERT INTO links (user_id, label, url, icon, "order")
      VALUES (${user.id}, ${link.label}, ${link.url}, ${link.icon}, ${i})
    `;
    console.log('Created link:', link.label);
  }

  console.log('\n✅ "hypo" profile created!');
  await sql.end();
  process.exit(0);
}

main();
