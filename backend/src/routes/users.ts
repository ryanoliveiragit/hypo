import { Hono } from 'hono';
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { db, users, profiles } from '../db';
import { auth } from '../middleware/auth';

export const usersRoutes = new Hono();

// GET /api/me — get current user data
usersRoutes.get('/me', auth, async (c) => {
  const userId = c.get('userId');

  const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  if (!user) return c.json({ error: 'not_found' }, 404);

  const [profile] = await db.select().from(profiles).where(eq(profiles.userId, userId)).limit(1);

  return c.json({
    id: user.id,
    username: user.username,
    displayName: user.displayName,
    isPremium: user.isPremium,
    createdAt: user.createdAt,
    profile,
  });
});

// PATCH /api/users/username — change username (1x/month free)
const usernameSchema = z.object({ username: z.string().min(3).max(30).regex(/^[a-z0-9-_]+$/) });
usersRoutes.patch('/users/username', auth, async (c) => {
  const userId = c.get('userId');
  const body = await c.req.json().catch(() => ({}));
  const parsed = usernameSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: 'invalid_input' }, 400);

  const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);

  const oneMonth = 30 * 24 * 60 * 60 * 1000;
  if (user.usernameChangeAt && Date.now() - user.usernameChangeAt.getTime() < oneMonth) {
    return c.json({ error: 'rate_limited' }, 429);
  }

  const taken = await db.select().from(users).where(eq(users.username, parsed.data.username)).limit(1);
  if (taken.length > 0) return c.json({ error: 'username_taken' }, 400);

  await db
    .update(users)
    .set({ username: parsed.data.username, usernameChangeAt: new Date(), updatedAt: new Date() })
    .where(eq(users.id, userId));

  return c.json({ ok: true, username: parsed.data.username });
});

// POST /api/users/delete — delete account
usersRoutes.post('/users/delete', auth, async (c) => {
  const userId = c.get('userId');
  // Cascade onDelete handles profile, links, images, views
  await db.delete(users).where(eq(users.id, userId));
  return c.json({ ok: true });
});

// GET /api/username/check/:slug — check availability
usersRoutes.get('/username/check/:slug', async (c) => {
  const slug = c.req.param('slug');
  if (slug.length < 3) return c.json({ available: false });

  const exists = await db.select().from(users).where(eq(users.username, slug)).limit(1);
  return c.json({ available: exists.length === 0 });
});
