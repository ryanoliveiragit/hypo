import { Hono } from 'hono';
import { eq } from 'drizzle-orm';
import { db, users } from '../db';
import { auth } from '../middleware/auth';

export const premiumRoutes = new Hono();

// GET /api/premium/status
premiumRoutes.get('/status', auth, async (c) => {
  const userId = c.get('userId');

  const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  if (!user) return c.json({ error: 'not_found' }, 404);

  return c.json({ isPremium: user.isPremium });
});

// POST /api/premium/upgrade — called by payment webhook
premiumRoutes.post('/upgrade', async (c) => {
  const body = await c.req.json().catch(() => ({}));

  const { sessionToken } = body as { sessionToken?: string };
  if (!sessionToken) return c.json({ error: 'missing_session' }, 400);

  await db
    .update(users)
    .set({ isPremium: true })
    .where(eq(users.sessionToken, sessionToken));

  return c.json({ ok: true });
});
