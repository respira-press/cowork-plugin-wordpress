# Respira for Cowork

AI editing for WordPress sites across 12 page builders, in Anthropic's Claude Cowork.

Edit live WordPress sites safely from the Claude desktop app. No terminal required. Snapshot before edit, render validation, and one click rollback are built in.

## What you get

- **8 slash commands** for WordPress editing without writing prompts.
- **4 auto activating skills** that handle safety, builder detection, and multi site context.
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
- A Respira account (sign up at https://respira.press, no card required for the 7 day Maker trial).

The connect command walks you through:

1. installing the WordPress plugin on your site.
2. downloading your `config.json` from the respira.press dashboard.
3. dropping it into `~/.respira/config.json` on your computer.
4. a connection test.

Cowork shares the same `~/.respira/config.json` file as the Claude Desktop `.mcpb`, so if you have Claude Desktop already configured you are already set up. Open a new Cowork chat and it picks up the file automatically.

Designed for someone who has never used a terminal. No key paste in chat, no `cowork-config.json` to maintain alongside the main config.

## How it works

Respira sits between Claude and your WordPress sites. When you ask Claude to do something WordPress related in Cowork (edit a page, audit a site, add a testimonials section), Respira routes the request through the right page builder, validates the change against the live rendered output, and reports back.

Every edit is snapshotted before it runs. Restore is one command, always.

## The four skills, in plain language

- **WordPress editing safety**: enforces snapshot before write, render validation after write, and honest reporting if anything is partial.
- **Page builder detection**: figures out which of the 12 supported builders the page uses, before any edit.
- **Multi site context**: keeps track of which site you are working on across many connected client sites.
- **Respira workflow**: sets the visible, patient, honest posture Respira aims for.

The four skills auto activate when the conversation matches their description. You do not have to invoke them.

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
