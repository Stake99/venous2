# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `../node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

# About this folder

`design-v2/` is a sibling Next.js project used to explore an alternate design of The Venous Lounge website. It runs independently from the main site at the repo root.

- Dev server: `npm run dev` (port **3001**, so it can run alongside the main site on 3000)
- Same stack as the main site: Next 16, React 19, Tailwind v4, TypeScript
- Shares no code with the main `app/`. Start fresh here.
- The `public/` folder is a copy of the main site's assets (logo, doctor photos) so you can reuse them.

For practice content (services, team, contact details), see [`../PRACTICE.md`](../PRACTICE.md).
