# IDIS one-pager — build conventions (READ BEFORE BUILDING A SECTION)

We are building a **1:1 pixel-faithful** reproduction of a Figma design as a
Vite + React + **Tailwind CSS v4** one-pager. Desktop first (design canvas is
**1920px** wide). **Do NOT add responsive breakpoints** — build the exact
desktop layout with exact px values. Responsive is a later global pass.

## Figma source
- fileKey: `ahIhjZnPngc6EQrR5X7weh`
- Each section has its own node-id (given in your task).

## How to pull a section (you must load the Figma MCP tools first)
1. `ToolSearch` with query:
   `select:mcp__plugin_figma_figma__get_design_context,mcp__plugin_figma_figma__get_screenshot,mcp__plugin_figma_figma__download_assets,mcp__plugin_figma_figma__get_metadata`
2. `get_design_context(fileKey, nodeId, skillNames:"resource:figma-design-to-code", clientFrameworks:"react", clientLanguages:"typescript,css")`
   — returns reference React+Tailwind code + asset URLs. Treat it as a spec, not final code.
3. `get_screenshot(fileKey, nodeId, maxDimension: 1600)` — download the PNG (curl the
   returned url) and **Read it** as your visual source of truth.
4. For images/photos/complex graphics: `download_assets(fileKey, nodeId, defaultFormat:"png", defaultScale:2)`
   and/or curl the localhost/figma asset URLs from get_design_context. SVGs: save as `.svg`.

## Assets
- Save this section's assets to `src/assets/<section-slug>/` (create the dir).
- Import them in your component (`import x from '../assets/<slug>/x.png'`).
- Use the REAL exported assets — no placeholders. Photos/complex illustrations → PNG @2x.
  Icons/logos/simple vector art → SVG.

## Design tokens (already in Tailwind theme — use these class names)
- `text-brand` / `bg-brand` = **#275fe8** (brand blue)
- `text-ink` / `bg-ink` = **#040917** (near-black)
- `text-mist` / `bg-mist` = **#e5e7ea**
- `bg-paper` = **#ffffff** (page background)
- Common muted body text seen in design: **#7b8698** → use `text-[#7b8698]`.
- For any other exact color from get_design_context, use arbitrary values e.g. `text-[#abc123]`.

## Typography
- Font family is already global (**General Sans**). Do not set font-family.
- Weight map: Regular→`font-normal`, Medium→`font-medium`, Semibold→`font-semibold`, Bold→`font-bold`.
- Use exact sizes/tracking/leading from Figma as arbitrary values, e.g.
  `text-[96px] tracking-[-2.88px] leading-none`, `text-[20px]`.

## Layout
- Wrap section content in the `page-shell` class for the 56px side gutter + 1920 max width:
  `<section id="..." className="..."><div className="page-shell">...</div></section>`.
  Inner content is typically **1807px** wide (centered). Some full-bleed rows are wider.
- Reproduce exact spacing/gaps/padding from Figma (`gap-[Npx]`, `px-[Npx]`, etc).
- Vertical rhythm: replicate the section's own top/bottom padding from the Figma frame.

## Shared components (reuse, don't recreate)
- `import Button from './Button'` — pill button. Props: `variant` = `"dark"` (ink bg) or
  `"blue"` (brand bg); `children`; `href`. Matches Figma pill (px-8 py-4, rounded-[99px], 20px medium).
  If a section's button differs, pass className or build inline to match exactly.

## Output rules
- One default-exported component per section: `src/components/<PascalCaseName>.jsx`.
- Add a short JSDoc comment naming the section + node-id.
- Only create your own component file + your own assets dir. **Do not edit App.jsx,
  index.css, or other sections' files** (the orchestrator wires them in).
- Semantic HTML + alt text on images (accessibility).
- Return (as your final message) ONLY: the component name, its file path, the asset dir,
  and any fidelity caveats. Keep it short.
