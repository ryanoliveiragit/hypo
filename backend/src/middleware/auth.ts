import type { Context, Next } from 'hono';
import { getCookie, setCookie } from 'hono/cookie';
import { SignJWT, jwtVerify } from 'jose';

declare module 'hono' {
  interface ContextVariableMap {
    userId: string;
  }
}

function getSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not set in environment');
  }
  return new TextEncoder().encode(secret);
}

const TOKEN_EXPIRY = '7d';

export async function signToken(userId: string): Promise<string> {
  const secret = getSecret();
  return new SignJWT({ sub: userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(secret);
}

export async function verifyToken(token: string): Promise<string | null> {
  try {
    const secret = getSecret();
    const { payload } = await jwtVerify(token, secret);
    return payload.sub as string;
  } catch {
    return null;
  }
}

export async function auth(c: Context, next: Next) {
  const token = getCookie(c, 'hypo_session');

  if (!token) return c.json({ error: 'unauthorized' }, 401);

  const userId = await verifyToken(token);
  if (!userId) return c.json({ error: 'invalid_session' }, 401);

  c.set('userId', userId);
  return next();
}

export function setSessionCookie(c: Context, token: string) {
  setCookie(c, 'hypo_session', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/',
  });
}
