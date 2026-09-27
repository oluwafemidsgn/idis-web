# IDIS one-pager — responsive conversion spec (READ BEFORE EDITING A SECTION)

The site is currently built pixel-perfect at the **1920px** desktop design, but many
sections use **fixed px widths and absolute positioning** that overflow / break below
1920. Your job: make a section **fully fluid and responsive from 360px → 1920px+**,
with **no horizontal overflow** and **readable type at every width**, while still
looking like the approved design on large screens.

Tailwind v4 is in use. Design tokens: `brand` #275fe8, `ink` #040917, `mist`,
`paper` (white), muted text `#7b8698`, navy `#132650`, peach `#f4a57e`.

## Core rules

1. **Kill fixed-px absolute layouts.** Replace `absolute left-[..] top-[..]` +
   `h-[1387px]` fixed-canvas patterns with normal flow: `flex` / `grid` + `gap`,
   `h-auto` with responsive padding. Absolute positioning may ONLY remain for
   genuinely decorative centered overlays (e.g. a big background watermark word),
   using `left-1/2 -translate-x-1/2` and clamp() sizing.

2. **Fluid widths, not fixed.** Replace fixed column widths with fluid ones:
   - Two-column rows: `flex flex-col gap-10 lg:flex-row lg:gap-[Npx]`, each column
     `w-full lg:flex-1` (or `lg:w-[Npx]` when a column must keep a set width).
   - Wrap section content in `<div className="content-cap">…</div>` (max 1807, centered)
     instead of relying on a fixed 1807/1679 width.
   - Images: `w-full h-auto` (drop fixed h); keep aspect via the image itself or
     `aspect-[w/h]`. Keep `rounded-[24px] md:rounded-[40px]`.

3. **Fluid typography via clamp()** — apply to large sizes (keep ≤20px text as-is,
   optionally `text-[18px] md:text-[20px]`):
   | design px | use |
   |---|---|
   | 306 (watermark/AI Enabled) | `text-[clamp(56px,18vw,306px)]` |
   | 128 | `text-[clamp(40px,9vw,128px)]` |
   | 96  | `text-[clamp(40px,7vw,96px)]` |
   | 64  | `text-[clamp(30px,4.6vw,64px)]` |
   | 40  | `text-[clamp(26px,3vw,40px)]` |
   | 32  | `text-[clamp(22px,2.6vw,32px)]` |
   | 24  | `text-[clamp(20px,2vw,24px)]` |
   Keep the existing `tracking-[..]`/`leading-[..]` and `font-*` weights.

4. **Cards / grids:**
   - Equal card grids (e.g. 2×2, 3-up): `grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-[Npx]`
     (or `lg:grid-cols-3` for 3-up). Drop fixed card widths/heights; let content size them.
   - Fixed-height colored "cards" that wrap a whole section: `rounded-[24px] md:rounded-[40px]`,
     `h-auto` + `p-6 md:p-10 lg:p-[Npx]` for internal padding.

5. **Fixed decorative sizes** that should NOT scale (avatars, small chips, nav logo)
   may keep their px size, but shrink a step on mobile if they dominate
   (e.g. avatar `size-[72px] md:size-[98px]`).

6. **No horizontal scroll.** Nothing may exceed the viewport width. Test mentally at 360px.

## Constraints
- Edit ONLY your assigned component file(s). Do NOT touch App.jsx, index.css, Nav, Hero,
  Button, or other sections.
- Preserve all copy, colors, assets, ids, and the desktop appearance at ≥1440px.
- Keep it clean: prefer a single fluid layout that works at all widths over
  duplicated desktop/mobile markup, unless a section genuinely needs both.
- Return only: file(s) touched + a one-line note on the mobile behavior you chose.
