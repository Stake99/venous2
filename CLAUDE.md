# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

The warning above is load-bearing: this repo runs **Next.js 16, React 19, Tailwind v4**. Before writing Next/React code, consult `node_modules/next/dist/docs/` (entry points under `01-app/` for App Router). Patterns from older Next versions (pages router, default-exported `getServerSideProps`, etc.) are wrong here.

## Two sibling Next apps

The repo contains **two independent Next.js projects** with no shared code:

- **Root (`/`)** — the live site. `npm run dev` → port 3000.
- **`design-v2/`** — alternate design exploration, started fresh. `npm run dev` → port 3001 (so it can run alongside the root site). Has its own `package.json`, `node_modules/`, `eslint.config.mjs`, `tsconfig.json`. See `design-v2/AGENTS.md`.

When the user asks for a change, confirm which app they mean if it isn't obvious from cwd or context. `design-v2/public/` is a copy of the root `public/` so assets can be reused.

## Commands

Both apps share the same script names (run from the relevant project root):

| | |
| --- | --- |
| `npm run dev`   | Start dev server (root: 3000, design-v2: 3001) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint`  | ESLint (flat config, `eslint-config-next` core-web-vitals + typescript) |

No test framework is configured.

## Architecture

**App Router, all in TypeScript.** Routes live under `app/<segment>/page.tsx`. Top-level chrome (`Navigation`, `Footer`) is mounted in `app/layout.tsx` so every page gets it automatically — don't import them per-page.

**Fonts** are wired through `next/font/google` in `app/layout.tsx` and exposed as CSS variables (`--font-inter`, `--font-poppins`, `--font-playfair`). Tailwind v4 picks them up via the `@theme inline` block in `app/globals.css`. To use a new font: add the loader in `layout.tsx`, expose the variable on `<html>`, then reference `var(--font-…)` from `globals.css`.

**Styling is Tailwind v4** (`@import "tailwindcss"` in `globals.css`, no `tailwind.config.js`). Design tokens (colors, fonts) are declared as CSS custom properties in `:root` and re-exported into Tailwind through `@theme inline { … }`. Add new tokens in both places.

**Path alias:** `@/*` maps to the project root (so `@/components/Navigation` resolves to `components/Navigation.tsx`).

**Animations** use `framer-motion`. The reusable primitives are:
- `components/AnimateIn.tsx` — fade/slide on scroll-into-view (uses `useInView` with `once: true`).
- `components/ParallaxBackground.tsx` — fixed gradient blobs driven by `useScroll`/`useTransform`.

Any component using these (or any hook) must be a Client Component (`'use client'` at the top). The root layout is a Server Component — don't add `'use client'` to it.

**Image domains:** remote images from `images.unsplash.com` are whitelisted in `next.config.ts`. Add new remote hosts there before using them with `<Image src="https://…">`.

## Visual theme (root app)

The root app uses a **"bright luxury" gold & warm-white palette** (see `COLOR_SCHEME.md`): a warm off-white page background with charcoal text, accented by gold. The palette is registered as Tailwind v4 theme tokens in `app/globals.css` — both `:root` (as `--obsidian`, `--gold`, etc.) and the `@theme inline` block (as `--color-*`), so the utilities below exist:
- **Neutral ramp** (warm white → charcoal): `obsidian` `#faf8f4` (page bg), `ink` `#f0ece6` (section bg), `carbon`/`snow` `#ffffff` (cards), `graphite` `#ddd8cf` (borders), `ash` `#a39e95` (muted), `silver` `#6d6960` (secondary text), `mist` `#4a4640`, `ivory` `#1a1814` (primary text).
- **Gold accent**: `gold` `#b8954a` (primary), `gold-dim` `#8a7348` (pressed), `gold-bright` `#c9a85c` (hover), `gold-ethereal` `#f5edd8` (soft glows). Plus warm `blush` / `honey` for gradient washes.
- **Status**: `confirmed` `#4a7c59` (success/green), `rose` `#a85c54` (error), `cancelled` `#8a8580`.

Pages use these as utilities directly: `bg-obsidian`, `text-ivory`, `text-silver`, `border-graphite`, `text-gold`, `bg-gold`, etc. Note: gold accent text on white is low-contrast by WCAG — fine for emphasis/large headings/icons, but don't use it for small body links.

A few class names are misleading and kept for compatibility — don't take them literally:
- `.card-dark` / `.card-dark-2` render as **white / warm-white** cards with graphite borders and a soft shadow.
- `text-shimmer`, `text-gradient`, `text-gradient-subtle` are **gold** gradients (not blue, not violet).

**Image-overlay captions** (testimonial names, clinic photo labels, doctor card name) use `text-white` / `text-white/80` because they sit on top of a `bg-gradient-to-t from-ivory` overlay over a photo (`ivory` is near-black `#1a1814`). Keep that pattern — don't flip them to `ivory` to "match the page theme," because the page theme isn't what's behind those captions.

`design-v2/` uses a different palette and is independent — don't apply root-app tokens there.

## Content source of truth

`PRACTICE.md` is the canonical reference for the medical practice's services, team, contact details, hours, and brand voice. When adding or rewording copy on the site (services pages, footer contact block, hero claims like "15+ years"), check `PRACTICE.md` first rather than inventing details.
