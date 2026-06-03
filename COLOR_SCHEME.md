# Web Color Scheme

This document explains the color system used by `apps/web` (the public site, patient portal, and doctor portal).

## Overview

The palette is a **"bright luxury"** theme — warm off-whites and charcoals accented with gold. Despite the dark-sounding semantic names (`obsidian`, `ink`, `carbon`), the actual values render a **light** UI (`color-scheme: light`). The names were intentionally preserved so the Tailwind class names didn't have to change when the theme was lightened.

## How it's wired

Colors flow through three layers:

1. **`src/styles/tokens.css`** — the single source of truth. Defines CSS custom properties (`--color-*`) on `:root`.
2. **`tailwind.config.ts`** — maps each `--color-*` variable to a Tailwind color name (e.g. `bg-obsidian`, `text-gold`).
3. **`src/index.css`** — imports the tokens, sets the page background (`--color-obsidian`) and default text color (`--color-ivory`), and defines selection / focus accent colors.

To change a color globally, edit the value in `tokens.css` — every Tailwind utility and component picks it up automatically.

## Neutral ramp (warm whites → charcoal)

A grayscale-style ramp that runs from the lightest background to the darkest text. Note the inversion: "dark" names hold light values.

| Token      | Tailwind class | Value     | Typical use                                  |
| ---------- | -------------- | --------- | -------------------------------------------- |
| `obsidian` | `*-obsidian`   | `#faf8f4` | Page background (warm white)                 |
| `ink`      | `*-ink`        | `#f0ece6` | Subtle section backgrounds                   |
| `carbon`   | `*-carbon`     | `#ffffff` | Cards / raised surfaces (pure white)         |
| `graphite` | `*-graphite`   | `#ddd8cf` | Borders, dividers, hairlines                 |
| `ash`      | `*-ash`        | `#a39e95` | Muted / disabled text                        |
| `silver`   | `*-silver`     | `#6d6960` | Secondary text                               |
| `mist`     | `*-mist`       | `#4a4640` | Tertiary / body-dim text                     |
| `ivory`    | `*-ivory`      | `#1a1814` | Primary text (near-black)                    |
| `snow`     | `*-snow`       | `#ffffff` | Pure white (maps to `--color-white`)         |

## Gold accent

The brand accent. Used for emphasis, focus rings, links, highlights, and ambient glows.

| Token           | Tailwind class  | Value     | Typical use                          |
| --------------- | --------------- | --------- | ------------------------------------ |
| `gold.dim`      | `*-gold-dim`    | `#8a7348` | Pressed / lower-contrast gold        |
| `gold` (DEFAULT)| `*-gold`        | `#b8954a` | Primary accent, focus outline        |
| `gold.bright`   | `*-gold-bright` | `#c9a85c` | Hover / highlighted gold             |
| `gold.ethereal` | `*-gold-ethereal`| `#f5edd8`| Soft gold for radial-gradient glows  |

Gold is frequently used at low opacity for ambient effects — e.g. `::selection` background is `rgba(184, 149, 74, 0.22)`, and hero gradients in `animations.css` layer gold at 8–22% opacity.

## Warm secondary

Used for ambient gradients and added depth (backgrounds, hero washes).

| Token   | Tailwind class | Value     | Typical use                       |
| ------- | -------------- | --------- | --------------------------------- |
| `blush` | `*-blush`      | `#f0e2d6` | Warm gradient stop / soft accent  |
| `honey` | `*-honey`      | `#faf3e8` | Warm gradient stop                |

## Semantic / status colors

Used for appointment statuses and error states (patient & doctor portals).

| Token       | Tailwind class | Value     | Meaning                  |
| ----------- | -------------- | --------- | ------------------------ |
| `confirmed` | `*-confirmed`  | `#4a7c59` | Confirmed (green)        |
| `pending`   | `*-pending`    | `#b8954a` | Pending (gold, same hue) |
| `cancelled` | `*-cancelled`  | `#8a8580` | Cancelled (gray)         |
| `rose`      | `*-rose`       | `#a85c54` | Error (maps to `--color-error`) |

## Where each surface uses the palette

- **Global page** (`index.css`): background `obsidian`, text `ivory`, selection + focus rings in `gold`.
- **Public site / hero** (`animations.css`): layered radial & linear gradients combining `gold-ethereal`, `blush`, `honey`, `graphite`, and low-opacity gold for the animated hero wash (`hero-gradient-shift`).
- **Doctor calendar** (`fullcalendar-dark.css`): transparent surfaces with `graphite` borders, `ivory` text, and `gold` for the active/today state — despite the `-dark` filename it follows the same light tokens.

## Typography & related tokens

Defined alongside colors in `tokens.css` (not strictly color, but part of the theme system):

- **Fonts**: `display` → Cormorant Garamond (serif), `body` → DM Sans, `mono` → JetBrains Mono.
- **Shadows**: `--shadow-elevated` (soft elevation) and `--shadow-gold-glow` (gold ring + drop shadow), exposed as `shadow-elevated` / `shadow-gold`.
- **Radii**: `--radius-sm/md/lg` (2px / 4px / 8px).

## Quick reference: adding or changing a color

1. Add/edit the variable in `apps/web/src/styles/tokens.css`.
2. If it's a new token, register it under `theme.extend.colors` in `apps/web/tailwind.config.ts`.
3. Use it anywhere as a Tailwind utility, e.g. `bg-<name>`, `text-<name>`, `border-<name>`.
