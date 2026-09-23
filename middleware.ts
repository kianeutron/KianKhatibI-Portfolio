import { type NextRequest, NextResponse } from 'next/server';
import { createRateLimiter } from '@/lib/rateLimiter';

const WINDOW_MS = 60_000;
const MAX_URL_LENGTH = 4_096;
const MAX_CLIENT_KEY_LENGTH = 64;
const ALLOWED_METHODS = ['GET', 'HEAD', 'OPTIONS'];

const checkRateLimit = createRateLimiter({
  windowMs: WINDOW_MS,
  maxPerClient: 180,
  maxGlobal: 12_000,
  maxTrackedClients: 10_000,
});

function clientKey(request: NextRequest): string {
  // The hosting proxy must overwrite these headers; do not trust arbitrary client-supplied values in a direct deployment.
  const forwarded = request.headers.get('x-real-ip') ?? request.headers.get('x-forwarded-for')?.split(',')[0];
  const candidate = forwarded?.trim();

  // Keep attacker-controlled headers from creating unbounded map keys.
  return candidate && candidate.length <= MAX_CLIENT_KEY_LENGTH ? candidate : 'anonymous';
}

function rejection(body: string, status: number, headers: Record<string, string> = {}) {
  return new NextResponse(body, { status, headers: { 'Cache-Control': 'no-store', ...headers } });
}

export function middleware(request: NextRequest) {
  // This portfolio has no write endpoints, so reject unexpected methods before rendering anything.
  if (!ALLOWED_METHODS.includes(request.method)) {
    return rejection('Method Not Allowed', 405, { Allow: ALLOWED_METHODS.join(', ') });
  }

  if (request.url.length > MAX_URL_LENGTH) return rejection('Request URI Too Long', 414);

  const now = Date.now();
  const result = checkRateLimit(clientKey(request), now);

  if (!result.allowed) {
    const retryAfter = Math.max(1, Math.ceil((result.resetAt - now) / 1000));
    return rejection('Too Many Requests', 429, { 'Retry-After': String(retryAfter) });
  }

  const response = NextResponse.next();
  response.headers.set('RateLimit-Limit', String(result.limit));
  response.headers.set('RateLimit-Remaining', String(result.remaining));
  response.headers.set('RateLimit-Reset', String(Math.ceil(result.resetAt / 1000)));
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icon.svg|apple-icon.svg).*)'],
};
