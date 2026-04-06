import 'dotenv/config';
import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors';
import { authRoutes } from './routes/auth';
import { usersRoutes } from './routes/users';
import { profilesRoutes } from './routes/profiles';
import { linksRoutes } from './routes/links';
import { imagesRoutes } from './routes/images';
import { analyticsRoutes } from './routes/analytics';
import { premiumRoutes } from './routes/premium';

const app = new Hono();

// ── CORS ──────────────────────────────────────────────────────
const origins = (process.env.ALLOWED_ORIGINS ?? 'http://localhost:3000').split(',');

app.use('/api/*', cors({
  origin: origins,
  credentials: true,
  allowHeaders: ['Content-Type', 'x-session-token'],
  allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
}));

// ── Mount routes ──────────────────────────────────────────────
app.route('/api/auth', authRoutes);
app.route('/api', usersRoutes);
app.route('/api/profiles', profilesRoutes);
app.route('/api/links', linksRoutes);
app.route('/api/images', imagesRoutes);
app.route('/api/analytics', analyticsRoutes);
app.route('/api/premium', premiumRoutes);

// ── Health check ──────────────────────────────────────────────
app.get('/health', (c) => c.json({ ok: true }));

// ── Start ──────────────────────────────────────────────────────
const port = parseInt(process.env.PORT ?? '4000', 10);

serve({ fetch: app.fetch, port }, ({ port }) => {
  console.log(`Hypo API listening on port ${port}`);
});

export default app;
