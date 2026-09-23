# Security Notes

## Current application controls

- The application renders trusted React data and has no `dangerouslySetInnerHTML`, `innerHTML`, `eval`, or dynamic code execution sinks.
- Next.js response headers provide CSP, clickjacking protection, MIME sniffing protection, a restrictive referrer policy, and a restrictive Permissions Policy.
- `middleware.ts` applies lightweight per-process guards: 180 requests per minute per client, a 12,000-request process-wide ceiling, a 4 KB URL limit, and an allow-list for read-only HTTP methods. It returns standard `RateLimit-*` headers and bounded `429` responses.

## Production deployment requirements

These in-process guards are a fallback for a single runtime. They are not distributed controls and must not be treated as the primary protection behind multiple instances. Production hosting should enforce the same limits at the load balancer or CDN using a shared counter store such as Redis, and should normalize or overwrite `X-Real-IP` / `X-Forwarded-For` at the trusted proxy.

Use a managed CDN/load balancer with TLS termination, health checks, connection limits, request-size limits, bot filtering, and shared rate limiting. Keep the application instances private behind that edge when the hosting platform supports it. Enable HSTS only after the production hostname is permanently HTTPS-only.
