# Architecture

## Overview

The home page renders a single client component, `Desktop`, which composes small pieces around a window
manager. Everything else is either content (`constants/`), pure logic (`lib/`) or presentation.

```
app/page.tsx ──▶ Desktop
                  ├─ Wallpaper            (lazy-loaded WebGL canvas)
                  ├─ DesktopIcons         (double-click / Enter opens a window)
                  ├─ ClockWidget          (own 1s timer; does not re-render Desktop)
                  ├─ Window × n           (title bar, controls, body)
                  │     └─ app content    (windowContent.tsx maps id → component)
                  ├─ StartMenu            (dismisses on outside pointer press)
                  └─ Taskbar              (running windows, tray clock)
```

## Window system

| File                   | Responsibility                                                                   |
| ---------------------- | -------------------------------------------------------------------------------- |
| `windowDefinitions.ts` | Static config per window: id, title, icon, variant, default geometry             |
| `windowManager.ts`     | Pure reducer: open, close, minimize, maximize, focus (z-order), move             |
| `useWindowManager.ts`  | Binds the reducer to React and exposes stable action callbacks                   |
| `useWindowDrag.ts`     | Pointer-driven dragging for title bars                                           |
| `DesktopContext.ts`    | `openWindow`/`closeWindow` for apps, and `useIsWindowActive` for keyboard gating |
| `windowContent.tsx`    | Maps every `WindowId` to the component it renders                                |

Only _dynamic_ state (open, minimized, maximized, position, z-index) lives in the reducer; titles, sizes and icons
are static definitions. Apps mount only while their window is open.

### Adding a window

1. Add its id to `WindowId` and an entry to `WINDOW_DEFINITIONS` in `windowDefinitions.ts`.
2. Create the app in `components/desktop/apps/` and register it in `windowContent.tsx`.
3. Optionally list it in `shortcuts.ts` (desktop icon, start menu) or in an explorer window.

The `Record<WindowId, …>` in `windowContent.tsx` makes step 2 a compile error if it is forgotten.

## Styling

- `app/globals.css` owns the design tokens (`--chrome-*`, `--bevel-*`, `--phosphor*`, fonts, `--taskbar-height`,
  `--frame-inset`), the reset, and the XP-style scrollbars.
- Each component has a colocated `*.module.css`. Shared visual primitives are components, not copied CSS:
  `XpButton`, `IconGlyph`, `AppPanel`, `ContactIcon`, `BlinkingCursor`.
- `--frame-inset` is the thick window/document frame; it steps down at 1024 / 768 / 480 px.
- When a module needs to override a shared component, it does so through a documented custom property
  (for example `--xp-button-width`) or a doubled selector, never by relying on stylesheet order.

## Case studies

Case study text lives in `constants/caseStudies.ts` as typed data. `CaseStudyConsole` flattens a study into
terminal lines with `buildTranscript`, and `CaseStudyDiagram` renders the inline diagrams. The same console is used
inside windows (`layout="window"`) and on `/case-studies` (`layout="page"`).

## Pure logic (`lib/`)

| Module           | Notes                                                                                     |
| ---------------- | ----------------------------------------------------------------------------------------- |
| `calculator.ts`  | Shunting-yard evaluator plus the keypad state machine (`pressKey`)                        |
| `snake.ts`       | Deterministic reducer; randomness is passed in through actions, so games are reproducible |
| `rateLimiter.ts` | Fixed-window limiter with per-client and global ceilings; clock is passed in              |
| `cx.ts`          | Class-name joiner                                                                         |

## Security

Response headers (CSP, framing, MIME sniffing, referrer and permissions policy) are set in `next.config.js`;
`middleware.ts` enforces a read-only method allow-list, a URL length cap and the in-process rate limiter. See
[SECURITY.md](../SECURITY.md) for what must be handled at the edge in production.
