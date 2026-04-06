import { Hono } from 'hono';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { db, inviteCodes, users, profiles } from '../db';
import { signToken, setSessionCookie } from '../middleware/auth';

export const authRoutes = new Hono();

// ── Rate limiting (simple in-memory) ──────────────────────────
const loginAttempts = new Map<string, { count: number; reset: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = loginAttempts.get(ip);

  if (!entry || now > entry.reset) {
    loginAttempts.set(ip, { count: 1, reset: now + 60_000 });
    return true;
  }

  entry.count++;
  if (entry.count > 5) return false;
  return true;
}

// ── Validate invite code ──────────────────────────────────────
const validateSchema = z.object({ code: z.string().min(4) });
authRoutes.post('/invite/validate', async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const parsed = validateSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: 'invalid input' }, 400);

  const exists = await db
    .select({ id: inviteCodes.id, code: inviteCodes.code, usedBy: inviteCodes.usedBy })
    .from(inviteCodes)
    .where(eq(inviteCodes.code, parsed.data.code))
    .limit(1);

  const found = exists[0];
  if (found && found.usedBy !== null) {
    return c.json({ valid: false, reason: 'already_used' }, 400);
  }

  const HARDCODED_CODES = ['HYPO-ALPHA', 'HYPO-BETA', 'VIP-2024', 'EARLY-XYZ', 'HYPO-OFFicial'];
  const isValid = (found && found.usedBy === null) || HARDCODED_CODES.includes(parsed.data.code.toUpperCase());
  return c.json({ valid: isValid });
});

// ── Register ──────────────────────────────────────────────────
const registerSchema = z.object({
  invite: z.string().min(4),
  username: z.string().min(3).max(30).regex(/^[a-z0-9-_]+$/),
  displayName: z.string().min(1).max(40),
  password: z.string().min(6),
});

authRoutes.post('/register', async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: 'invalid input' }, 400);

  const { username, displayName, password, invite } = parsed.data;

  const exists = await db.select().from(users).where(eq(users.username, username)).limit(1);
  if (exists.length > 0) return c.json({ error: 'username_taken' }, 400);

  const codeExists = await db.select().from(inviteCodes).where(eq(inviteCodes.code, invite)).limit(1);
  if (codeExists.length > 0 && codeExists[0].usedBy !== null) {
    return c.json({ error: 'invite_already_used' }, 400);
  }

  const HARDCODED_CODES = ['HYPO-ALPHA', 'HYPO-BETA', 'VIP-2024', 'EARLY-XYZ', 'HYPO-OFFicial'];
  const isCodeValid = codeExists.length > 0 || HARDCODED_CODES.includes(invite.toUpperCase());
  if (!isCodeValid) return c.json({ error: 'invalid_invite' }, 400);

  const passwordHash = await bcrypt.hash(password, 10);

  const [user] = await db
    .insert(users)
    .values({
      username,
      displayName,
      passwordHash,
      inviteCodeId: codeExists[0]?.id ?? null,
    })
    .returning();

  await db.insert(profiles).values({ userId: user.id });

  if (codeExists.length > 0) {
    await db
      .update(inviteCodes)
      .set({ usedBy: user.id, usedAt: new Date() })
      .where(eq(inviteCodes.id, codeExists[0].id));
  }

  const token = await signToken(user.id);
  setSessionCookie(c, token);

  return c.json({ ok: true, username, displayName });
});

// ── Login ─────────────────────────────────────────────────────
const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

authRoutes.post('/login', async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: 'invalid input' }, 400);

  const { username, password } = parsed.data;

  // Rate limit
  const ip = c.req.header('x-forwarded-for') ?? c.req.header('x-real-ip') ?? 'unknown';
  if (!checkRateLimit(ip)) {
    return c.json({ error: 'rate_limited', retryAfter: 60 }, 429);
  }

  const [user] = await db.select().from(users).where(eq(users.username, username)).limit(1);
  if (!user) return c.json({ error: 'invalid_credentials' }, 401);

  const validPassword = await bcrypt.compare(password, user.passwordHash);
  if (!validPassword) return c.json({ error: 'invalid_credentials' }, 401);

  const token = await signToken(user.id);
  setSessionCookie(c, token);

  return c.json({ ok: true, username: user.username, displayName: user.displayName });
});

// ── Recover ───────────────────────────────────────────────────
const recoverSchema = z.object({ username: z.string().min(3) });
authRoutes.post('/recover', async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const parsed = recoverSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: 'invalid input' }, 400);

  return c.json({ ok: true, message: 'solicitação enviada' });
});
