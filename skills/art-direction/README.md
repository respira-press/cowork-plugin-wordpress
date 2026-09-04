# Art Direction

> The taste layer for every page an agent builds.

A site's Art Direction is one saved document: palette, fonts, spacing, guidance, donts, and waivers. This skill makes sure it exists before any visual work starts, that every token in a build traces back to it, and that the finished page is checked against it instead of eyeballed.

It does not replace a human designer. It keeps a designer's decisions faithful on the live site.

## The sequence

1. Load the active direction (`respira_get_design_direction`)
2. If none exists, create one first: synthesize from the site, or import what the user brings
3. Plan tokens in two passes: propose, then self-critique against the direction's donts and the three AI-default aesthetics
4. Build with tokens preserved (`preserve_tokens`, `respira_apply_design_direction`)
5. Check with `respira_check_design`, rendered mode on published pages, and fix every unwaived fail
6. Mint a live preview (`respira_mint_design_preview`) so the human watches the real page

## The three AI-default aesthetics it steers away from

- **ai-purple gradient minimalism**: saturated purple (hue 260 to 290), Inter everywhere, glassmorphism
- **warm-craft sameness**: the cream #f4f1ea family plus terracotta "handcrafted" pairing
- **corporate-slop filler**: elevate, seamless, unleash, and the rest of the marketing filler lexicon

The direction's own donts outrank all of these. If purple IS the brand, that is what waivers are for.

## Import lanes

Bring output from Claude Design, /design-sync, Figma (via its MCP server's `get_variable_defs`), or any design-system document. Tokens convert to DTCG and go through `respira_import_design_tokens` (dry run first, readiness delta shown). Prose (voice, imagery guidance, donts) lands in the direction's guidance, added on top of what is already there. Nothing guessed ships without `inferred: true`. The dashboard runs the Figma and Claude Design lanes without an agent too: respira.press/dashboard/art-direction, "Or connect Figma" and the auto-detecting Import tokens box.

## Triggers

- *"make it look better"*
- *"build a page"* / *"redesign this page"*
- *"apply my art direction"*
- *"import my design system"*

## Where the human sees it

respira.press/dashboard/art-direction: the saved direction, readiness with inferred flags, apply reports, and the live page preview.

## Requires

- Respira for WordPress plugin **8.6.20+**
- MCP server **8.3+** connected
