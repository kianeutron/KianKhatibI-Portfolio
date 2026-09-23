# Kian Khatibi — Portfolio

An interactive portfolio presented as a classic desktop: draggable windows, a taskbar, a start menu and small
apps (experience log, skills panel, contact, calculator, Snake, and three terminal-style case studies) on top of a
WebGL terminal wallpaper.

Built with **Next.js 15 (App Router)**, **React 18** and **strict TypeScript**. Styling is plain **CSS Modules**
driven by a small set of design tokens — there is no Tailwind or CSS-in-JS.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script              | Purpose                                                |
| ------------------- | ------------------------------------------------------ |
| `npm run dev`       | Start the development server                           |
| `npm run build`     | Production build                                       |
| `npm run start`     | Serve the production build                             |
| `npm run typecheck` | Type-check without emitting                            |
| `npm run lint`      | ESLint (Next.js + TypeScript rules)                    |
| `npm run lint:css`  | Stylelint for CSS Modules (no `!important`, camelCase) |
| `npm test`          | Unit tests (Vitest) for `lib/` and the window reducer  |
| `npm run format`    | Format everything with Prettier                        |
| `npm run check`     | Typecheck, lint, stylelint, tests and format check     |

CI runs `npm run check` and a production build on every push and pull request.

## Project layout

```
app/                 Routes, root layout, global tokens and base styles
components/
  desktop/           Window manager, taskbar, start menu and the apps that run in windows
  case-studies/      Terminal-style case study renderer and diagrams
  games/             Snake UI (rules live in lib/snake.ts)
  effects/           WebGL wallpaper
  ui/                Shared presentational primitives (buttons, icons, panels)
constants/           Portfolio content: experience, skills, contact, case studies
lib/                 Pure, framework-free logic (calculator, snake, rate limiter, helpers)
types/               Shared domain types
middleware.ts        Method allow-list, URL limit and per-process rate limiting
```

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for how the pieces fit together, and
[SECURITY.md](SECURITY.md) for deployment requirements.

## Conventions

- **Content is data.** Edit text in `constants/`; components never hard-code portfolio copy.
- **Logic is pure.** Anything with rules (calculator, snake, window manager, rate limiter) lives in a React-free
  module with a reducer or pure function, and the component is a thin view over it.
- **One CSS Module per component**, colocated. Colours, bevels, fonts and spacing come from the tokens in
  `app/globals.css`; do not repeat hex values across modules.
- **Data-driven layout values** (window position, clock hand angles) are passed as CSS custom properties, not as
  hard-coded inline styles, so media queries can still override them without `!important`.
- **Tested where it matters.** Rules live in pure modules with unit tests colocated as `*.test.ts`.
- **Strict TypeScript** with `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes`; avoid `any` and casts.
