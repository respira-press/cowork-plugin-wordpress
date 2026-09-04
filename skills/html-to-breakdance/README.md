# HTML to Breakdance

> Convert raw HTML/CSS into native Breakdance elements, variable-bound, with nothing silently skip-rendered.

A designer hands you HTML/CSS from a Webflow export. Or you have an old static page you want to
bring into your live Breakdance site. Or you exported from Figma and need to land it in
Breakdance for further editing. This skill converts the HTML into a native Breakdance tree, with
four protections built in.

## What it does

1. Converts HTML/CSS into fully qualified Breakdance elements (`EssentialElements\Section`,
   `EssentialElements\Heading`, `EssentialElements\Text`, `EssentialElements\Button`,
   `EssentialElements\Image` and friends). Lowercase generic types persist and render nothing on
   Breakdance, so the skill checks every returned type instead of trusting the payload.
2. **Binds colors, typography and spacing to Breakdance Variables** (`breakdance_global_settings`),
   so when a variable changes the converted page follows.
3. **Reports every CodeBlock fallback.** Forms, tables and unmappable markup become
   `EssentialElements\CodeBlock`, which is legitimate Breakdance output and also raw HTML in a box.
   You get told which parts of the page those are.
4. SafeEdit on existing pages, plus a baseline-snapshot check before writing.

## Why Breakdance needs its own workflow

Breakdance keeps the whole page in the `_breakdance_data` post meta, not in `post_content`. Three
consequences shape the workflow:

- A duplicate's baseline snapshot has to be captured after the meta copy, or rollback has nothing
  to roll back to. That was a real bug for every meta-storing builder, fixed in 8.6.31. The skill
  checks the baseline before converting into a duplicate.
- The editor and the front end fail independently. A valid tree renders nothing publicly if
  `_breakdance_dependency_cache` was not regenerated, so the skill verifies the stored tree and
  the public URL separately.
- An empty extract on a page with visible content means an unreadable envelope, not a blank page.
  The skill refuses to append there.

## Three input modes

- Paste HTML directly in the conversation
- Give a public URL (the skill fetches the HTML; external images are flagged, not silently mirrored)
- Reference an HTML file

## Triggers

- *"convert this html to breakdance"*
- *"import this design into breakdance"*
- *"paste html into breakdance"*
- *"turn this html into a breakdance page"*

## Requires

- Respira for WordPress plugin 8.6.31 or newer
- **Breakdance active** (the skill verifies and stops if Breakdance is not the active builder)
- MCP server connected
- Recommended: design system or Design Direction set up first so variable binding has something to bind to

## What it does NOT do

- Convert HTML for Bricks, Elementor, Divi, Gutenberg, or other builders (use `html-to-bricks`, or
  the generic `convert_html_to_builder` workflow)
- Target Oxygen 6. Oxygen 6 shares the Breakdance adapter but its element namespace is
  `OxygenElements\*`, so this skill stops there
- Re-host external images automatically (flagged, never silently mirrored)
- Convert HTML forms into Breakdance Form Builder 1:1 (they become CodeBlock; you wire the real
  form manually)
- Convert CSS keyframe animations (flagged)
