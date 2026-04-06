import { Hono } from 'hono';
import { z } from 'zod';
import { eq, asc } from 'drizzle-orm';
import { db, links } from '../db';
import { auth } from '../middleware/auth';

export const linksRoutes = new Hono();

linksRoutes.use('*', auth);

// GET /api/links
linksRoutes.get('/', async (c) => {
  const userId = c.get('userId');
  const userLinks = await db.select().from(links).where(eq(links.userId, userId)).orderBy(asc(links.order));
  return c.json(userLinks);
});

// POST /api/links
const createLinkSchema = z.object({
  label: z.string().max(40),
  url: z.string().max(500),
  icon: z.string().default('link'),
});

linksRoutes.post('/', async (c) => {
  const userId = c.get('userId');
  const body = await c.req.json().catch(() => ({}));
  const parsed = createLinkSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: 'invalid_input' }, 400);

  // Get max order
  const maxOrder = await db.select({ order: links.order }).from(links).where(eq(links.userId, userId)).orderBy(links.order).limit(1);
  const order = maxOrder.length > 0 ? maxOrder[0].order + 1 : 0;

  const [link] = await db
    .insert(links)
    .values({ ...parsed.data, userId, order })
    .returning();

  return c.json(link, 201);
});

// PATCH /api/links/:id
const updateLinkSchema = z.object({
  label: z.string().max(40).optional(),
  url: z.string().max(500).optional(),
  active: z.boolean().optional(),
  order: z.number().optional(),
});

linksRoutes.patch('/:id', async (c) => {
  const userId = c.get('userId');
  const id = c.req.param('id');
  const body = await c.req.json().catch(() => ({}));
  const parsed = updateLinkSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: 'invalid_input' }, 400);

  await db
    .update(links)
    .set(parsed.data)
    .where(eq(links.id, id));

  return c.json({ ok: true });
});

// DELETE /api/links/:id
linksRoutes.delete('/:id', async (c) => {
  const userId = c.get('userId');
  const id = c.req.param('id');

  await db.delete(links).where(eq(links.id, id));

  return c.json({ ok: true });
});

// PUT /api/links/reorder
const reorderSchema = z.object({
  ids: z.array(z.string()),
});

linksRoutes.put('/reorder', async (c) => {
  const userId = c.get('userId');
  const body = await c.req.json().catch(() => ({}));
  const parsed = reorderSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: 'invalid_input' }, 400);

  for (let i = 0; i < parsed.data.ids.length; i++) {
    await db.update(links).set({ order: i }).where(eq(links.id, parsed.data.ids[i]));
  }

  return c.json({ ok: true });
});
