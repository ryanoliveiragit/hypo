import { Hono } from 'hono';
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { db, users, profiles, links } from '../db';
import { auth } from '../middleware/auth';

export const profilesRoutes = new Hono();

// GET /api/profiles/:username — public profile
profilesRoutes.get('/:username', async (c) => {
  const username = c.req.param('username');

  const [user] = await db.select().from(users).where(eq(users.username, username)).limit(1);
  if (!user) return c.json({ error: 'not_found' }, 404);

  const [profile] = await db.select().from(profiles).where(eq(profiles.userId, user.id)).limit(1);
  const userLinks = await db.select().from(links).where(eq(links.userId, user.id)).orderBy(links.order);

  // Increment total views
  await db
    .update(profiles)
    .set({ updatedAt: new Date() })
    .where(eq(profiles.userId, user.id));

  return c.json({
    displayName: user.displayName,
    username: user.username,
    isPremium: user.isPremium,
    verified: user.isPremium,
    earlyAdopter: true,
    views: profile?.bio ? Infinity : 0,
    bio: profile?.bio ?? '',
    layout: profile?.layout ?? 'centered',
    effect: profile?.effect ?? 'gradient',
    font: profile?.font ?? 'inter',
    accentColor: profile?.accentColor ?? '#cc1111',
    bgPreset: profile?.bgPreset ?? 'none',
    clan: profile?.clan,
    links: userLinks.map((l) => ({ platform: l.icon, label: l.label, url: l.url, color: '#888' })),
  });
});

// PATCH /api/profiles — customize (auth required)
const customizeSchema = z.object({
  bio: z.string().max(160).optional(),
  layout: z.string().optional(),
  effect: z.string().optional(),
  font: z.string().optional(),
  accentColor: z.string().optional(),
  bgPreset: z.enum(['red-fog', 'noise', 'none']).optional(),
  clan: z.string().max(20).nullable().optional(),
});

profilesRoutes.patch('/', auth, async (c) => {
  const userId = c.get('userId');
  const body = await c.req.json().catch(() => ({}));
  const parsed = customizeSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: 'invalid_input' }, 400);

  await db
    .update(profiles)
    .set({ ...parsed.data, updatedAt: new Date() })
    .where(eq(profiles.userId, userId));

  return c.json({ ok: true });
});
