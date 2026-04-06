import { Hono } from 'hono';
import { eq, desc } from 'drizzle-orm';
import { db, images } from '../db';
import { auth } from '../middleware/auth';
import crypto from 'node:crypto';

export const imagesRoutes = new Hono();

imagesRoutes.use('*', auth);

// GET /api/images
imagesRoutes.get('/', async (c) => {
  const userId = c.get('userId');
  const list = await db.select().from(images).where(eq(images.userId, userId)).orderBy(desc(images.createdAt));
  return c.json(list);
});

// POST /api/images/upload (simple base64 or raw body upload)
imagesRoutes.post('/upload', async (c) => {
  const userId = c.get('userId');

  const body = await c.req.parseBody();
  const file = body['file'] as File;

  if (!file || !(file instanceof File)) {
    return c.json({ error: 'missing_file' }, 400);
  }

  const buffer = await file.arrayBuffer();
  const size = buffer.byteLength;
  if (size > 10 * 1024 * 1024) {
    return c.json({ error: 'too_large', max: '10MB' }, 400);
  }

  // Save locally in production (later migrate to R2/S3)
  const hash = crypto.randomUUID();
  const ext = file.name.split('.').pop() ?? 'png';
  const url = `/uploads/${hash}.${ext}`;

  await db.insert(images).values({
    userId,
    filename: file.name,
    fileUrl: url,
    fileSize: size,
  });

  const [img] = await db.select().from(images).where(eq(images.fileUrl, url)).limit(1);

  // In dev, we don't actually write to disk
  // In prod, serve from static uploads/ dir
  return c.json(img, 201);
});

// DELETE /api/images/:id
imagesRoutes.delete('/:id', async (c) => {
  const userId = c.get('userId');
  const id = c.req.param('id');

  await db.delete(images).where(eq(images.id, id));

  return c.json({ ok: true });
});
