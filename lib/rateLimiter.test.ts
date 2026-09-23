import { describe, expect, it } from 'vitest';
import { createRateLimiter } from './rateLimiter';

const options = { windowMs: 1_000, maxPerClient: 3, maxGlobal: 5, maxTrackedClients: 100 };

describe('createRateLimiter', () => {
  it('allows requests up to the per-client limit and then blocks', () => {
    const check = createRateLimiter(options);
    const results = [1, 2, 3, 4].map(() => check('a', 0));
    expect(results.map((result) => result.allowed)).toEqual([true, true, true, false]);
    expect(results[0]?.remaining).toBe(2);
    expect(results[3]?.remaining).toBe(0);
  });

  it('tracks clients independently', () => {
    const check = createRateLimiter(options);
    for (let i = 0; i < 4; i += 1) check('a', 0);
    expect(check('b', 0).allowed).toBe(true);
  });

  it('opens a fresh window after it expires', () => {
    const check = createRateLimiter(options);
    for (let i = 0; i < 4; i += 1) check('a', 0);
    expect(check('a', 1_000).allowed).toBe(true);
  });

  it('enforces the global ceiling across clients', () => {
    const check = createRateLimiter(options);
    const results = ['a', 'b', 'c', 'd', 'e', 'f'].map((client) => check(client, 0));
    expect(results.slice(0, 5).every((result) => result.allowed)).toBe(true);
    expect(results[5]?.allowed).toBe(false);
  });

  it('reports when the window resets', () => {
    const check = createRateLimiter(options);
    expect(check('a', 250).resetAt).toBe(1_250);
  });
});
