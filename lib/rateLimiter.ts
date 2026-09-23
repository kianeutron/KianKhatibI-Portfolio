/**
 * In-process fixed-window rate limiter with a per-client and a global ceiling.
 * Suitable as a single-instance fallback only; see SECURITY.md for production guidance.
 */

export interface RateLimiterOptions {
  windowMs: number;
  maxPerClient: number;
  maxGlobal: number;
  /** Soft cap on tracked clients; expired entries are evicted when it is exceeded. */
  maxTrackedClients: number;
}

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  /** Epoch milliseconds at which the client's window resets. */
  resetAt: number;
}

interface Window {
  count: number;
  resetAt: number;
}

export function createRateLimiter(options: RateLimiterOptions) {
  const { windowMs, maxPerClient, maxGlobal, maxTrackedClients } = options;
  const clients = new Map<string, Window>();
  let globalWindow: Window = { count: 0, resetAt: 0 };

  const freshWindow = (now: number): Window => ({ count: 0, resetAt: now + windowMs });

  return function check(clientKey: string, now: number): RateLimitResult {
    if (globalWindow.resetAt <= now) globalWindow = freshWindow(now);
    globalWindow.count += 1;
    if (globalWindow.count > maxGlobal) {
      return { allowed: false, limit: maxGlobal, remaining: 0, resetAt: globalWindow.resetAt };
    }

    const existing = clients.get(clientKey);
    const entry = existing && existing.resetAt > now ? existing : freshWindow(now);
    entry.count += 1;
    clients.set(clientKey, entry);

    if (clients.size > maxTrackedClients) {
      for (const [key, value] of clients) {
        if (value.resetAt <= now) clients.delete(key);
      }
    }

    return {
      allowed: entry.count <= maxPerClient,
      limit: maxPerClient,
      remaining: Math.max(0, maxPerClient - entry.count),
      resetAt: entry.resetAt,
    };
  };
}
