import 'dotenv/config';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!, { max: 1, ssl: true });

async function main() {
  // Get user hypo
  const users = await sql`SELECT id FROM users WHERE username = 'hypo'`;
  if (users.length === 0) {
    console.error('User "hypo" not found');
    process.exit(1);
  }
  const userId = users[0].id;

  // Create a dedicated invite code for hypo
  const codeValue = 'HYPO-OFFicial';
  const [newCode] = await sql`
    INSERT INTO invite_codes (id, code, used_by, used_at)
    VALUES (gen_random_uuid(), ${codeValue}, ${userId}, NOW())
    RETURNING *
  `;
  console.log('Created and linked invite code:', newCode.code);

  // Update users table to link the invite_code_id
  await sql`UPDATE users SET invite_code_id = ${newCode.id} WHERE id = ${userId}`;

  console.log('Linked invite code to user "hypo"');
  await sql.end();
  process.exit(0);
}

main();
