<p align="center">
  <img src="./respira-cowork-v1.png" alt="Respira for WordPress, in Cowork" width="720" />
</p>

# Respira for Cowork

AI editing for WordPress sites across 12 page builders, in Anthropic's Claude Cowork.

Edit live WordPress sites safely from the Claude desktop app. No terminal required. Snapshot before edit, render validation, and one click rollback are built in.

Current version: **v1.0.8**. Live at [respira.press/cowork](https://respira.press/cowork).

## What you get

- **8 slash commands** for WordPress editing without writing prompts.
- **30 auto activating skills** covering editing safety, builder detection, multi site context, 14 builder to builder migration paths, SEO and AEO amplification, AI image optimization, WooCommerce health checks, mobile experience reports, technical debt audits, internal link building, content portability, and more.
- **1 visual reviewer sub agent** that shows you what changed after every edit.
- **Full access to all 180+ Respira MCP tools** through the bundled MCP server (`@respira/wordpress-mcp-server`).
- **All 12 supported page builders**: Elementor, Divi 4, Divi 5, Bricks, Oxygen, Breakdance, Beaver Builder, WPBakery, Flatsome UX Builder, Brizy, Thrive Architect, and Gutenberg.

## Install

From the Anthropic plugin marketplace, search for "Respira for WordPress" and click install.

To install manually from this repo, in Cowork:

1. Go to **Customize > Plugins > Add Custom Plugin**.
2. Paste this URL: `https://github.com/respira-press/cowork-plugin-wordpress`.
3. Click install.

## Setup

After installing, run `/respira:connect-site` and follow the prompts. You will need:

- A WordPress site you can install plugins on.
- A Respira account. Sign up at https://respira.press for a 7 day Maker trial. No credit card required.

The connect command walks you through the WordPress plugin install, the API key, the config file, and a connection test. It is designed for someone who has never used a terminal.

## How it works

Respira sits between Claude and your WordPress sites. When you ask Claude to do something WordPress related in Cowork (edit a page, audit a site, add a testimonials section), Respira routes the request through the right page builder, validates the change against the live rendered output, and reports back.

Every edit is snapshotted before it runs. Restore is one command, always.

## The thirty skills, in plain language

All skills auto activate when the conversation matches their description. You do not have to invoke them.

**Operational guardrails (5)**

- **WordPress editing safety**: enforces snapshot before write, render validation after write, and honest reporting if anything is partial.
- **Page builder detection**: figures out which of the 12 supported builders the page uses, before any edit.
- **Multi site context**: keeps track of which site you are working on across many connected client sites.
- **Respira workflow**: sets the visible, patient, honest posture Respira aims for.
- **Respira setup assistant**: walks first time users through plugin install, API key, and connection test.

**Site intelligence and audits (7)**

- **Site onboarding**: connects a new WordPress site and produces a one page briefing.
- **WordPress site DNA**: profiles the theme, builders, plugins, performance posture, and audience signals.
- **Mobile experience report**: catches mobile only layout, performance, and tap target problems.
- **Technical debt audit**: inventories deprecated plugins, dead options, and unsafe patterns the site has accumulated.
- **WooCommerce health check**: scans cart, checkout, taxes, and product pages for the patterns that hurt conversion.
- **SEO and AEO amplifier**: targets both classic search and answer engine visibility (citations in ChatGPT, Claude, Perplexity, Gemini).
- **Internal link builder**: proposes high signal internal links based on the site's actual content map.

**Content and assets (2)**

- **WordPress AI image optimizer**: rewrites alt text, compresses, and standardizes image dimensions across the media library.
- **Content portability**: exports and imports posts and pages between sites with their builder data preserved.

**Builder to builder migrations (16)**

- migrate-elementor-to-bricks
- migrate-elementor-to-breakdance
- migrate-elementor-to-oxygen
- migrate-elementor-to-gutenberg
- migrate-divi-to-bricks
- migrate-divi-to-breakdance
- migrate-divi-to-gutenberg
- migrate-beaver-builder-to-bricks
- migrate-beaver-builder-to-gutenberg
- migrate-wpbakery-to-bricks
- migrate-wpbakery-to-gutenberg
- migrate-visual-composer-to-gutenberg
- migrate-thrive-architect-to-gutenberg
- migrate-brizy-to-gutenberg
- migrate-oxygen-to-bricks
- migrate-oxygen-to-breakdance

Each migration skill knows the source builder's data shape and the target builder's native modules, applies the conversion section by section, and validates each step before continuing.

## The eight commands, in plain language

| Command | What it does |
|---|---|
| `/respira:connect-site` | Connect a WordPress site for the first time. |
| `/respira:edit-page` | Edit any page on a connected site. |
| `/respira:add-section` | Add a new section to a page (hero, testimonials, FAQ, etc.). |
| `/respira:duplicate-page` | Make a safe copy of a page to experiment with. |
| `/respira:preview-changes` | See what is on a page in your browser. |
| `/respira:audit-site` | Check accessibility, SEO, or performance. |
| `/respira:undo-last-change` | Roll back the most recent edit. |
| `/respira:help` | Show the menu and support paths. |

You can also just talk to Claude in plain English about what you want done. The slash commands are shortcuts.

## Support

- Email: word@respira.press
- Documentation: https://docs.respira.press
- Live telemetry: https://respira.press/live

i am Mihai, the solo founder of Respira. built from Brașov, Romania. used in production on 747 connected WordPress sites at the time of this release.

## License

MIT.
