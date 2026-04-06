import { Hono } from 'hono';
import { eq, sql, desc, gte, and } from 'drizzle-orm';
import { db, views, users } from '../db';
import { auth } from '../middleware/auth';

export const analyticsRoutes = new Hono();

// GET /api/analytics/views — last 24h view data (for recharts)
analyticsRoutes.get('/views', auth, async (c) => {
  const userId = c.get('userId');
  const now = Math.floor(Date.now() / 1000);
  const dayAgo = now - 24 * 60 * 60;

  const rows = await db
    .select()
    .from(views)
    .where(and(eq(views.userId, userId), gte(views.timestamp, dayAgo)))
    .orderBy(views.timestamp);

  // Format as { t: string, v: number } for recharts
  const chartData = rows.map((r: typeof views.$inferSelect) => ({
    t: new Date(r.timestamp * 1000).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    v: r.count,
  }));

  return c.json(chartData);
});

// POST /api/analytics/track/:username — increment view (public)
analyticsRoutes.post('/track/:username', async (c) => {
  const username = c.req.param('username');

  const [user] = await db.select().from(users).where(eq(users.username, username)).limit(1);
  if (!user) return c.json({ error: 'not_found' }, 404);

  const hourKey = Math.floor(Date.now() / 1000 / 3600) * 3600;

  // Upsert hourly count
  await db
    .insert(views)
    .values({ userId: user.id, timestamp: hourKey })
    .onConflictDoNothing();

  return c.json({ ok: true });
});

// GET /api/analytics/summary — total stats
analyticsRoutes.get('/summary', auth, async (c) => {
  const userId = c.get('userId');

  const total = await db
    .select({ total: sql<number>`COALESCE(SUM(${views.count}), 0)` })
    .from(views)
    .where(eq(views.userId, userId));

  return c.json({ totalViews: total[0]?.total ?? 0 });
});
