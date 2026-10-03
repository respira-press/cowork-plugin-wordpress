<p align="center">
  <img src="./assets/logo.png" alt="Respira for WordPress" width="160" />
</p>

# Respira for WordPress

Respira lets Claude edit a WordPress site the way a careful person would: in the site's own page builder, one element at a time, with a snapshot taken before every write. Ask for a new headline, a testimonials section, an SEO pass or a move from Elementor to Bricks, and Claude does it through Respira's tools instead of pasting raw HTML into your pages.

This plugin gives Claude the Respira skills, slash commands and a visual reviewer agent, and in Claude Code and Cowork it starts the Respira MCP server for you. It works with Gutenberg, Elementor, Divi 4 and Divi 5, Bricks, Oxygen Classic and Oxygen 6, Beaver Builder, Breakdance, Flatsome, Brizy, Visual Composer, WPBakery, Spectra, Kadence Blocks and GenerateBlocks, and it can audit SeedProd pages.

## What you can ask for

- **Edit a page.** "Change the homepage headline to 'spring collection arriving'." Claude finds the element, edits it in the builder's own format, and checks that the page still renders.
- **Add a section.** "Add a three-column testimonials section under the hero." Built from native modules of the page's builder.
- **Move between builders.** Migration skills cover the common paths, such as Elementor, Divi, WPBakery, Beaver Builder or Oxygen to Bricks, Breakdance or Gutenberg, section by section.
- **Audit a site.** SEO and AI search visibility, accessibility, mobile experience, technical debt, WooCommerce health and security, with fixes you can apply one by one.
- **Work across many sites.** Connect every client site once and refer to them by name in the same conversation.
- **Get a client's sign-off.** Make a review link a client opens without a WordPress login, then apply their comments on a draft.

## How it keeps your site safe

- Every page and post write saves a snapshot first. Any change is one restore away, and `/respira:undo-last-change` rolls back the last one.
- On a published page, the edit lands on a draft duplicate, and a person approves it before it goes live, unless the site owner has turned on direct editing.
- Writes go through the builder's own data format. Respira never writes SQL or raw database rows and never edits theme PHP.
- After each write Respira validates the rendered page and reports what it found. Claude is told never to claim a success the response does not show.

## Requirements

- A WordPress site where you can install plugins, with the **Respira for WordPress** plugin installed and activated.
- A Respira account at [respira.press](https://www.respira.press).
- For Claude Code and Cowork: Node.js on your computer, because the bundled MCP server runs through `npx`.

## Connect a site

**Claude Code and Cowork.** Install this plugin, then run `/respira:connect-site`. It walks you through installing the WordPress plugin, pressing the connect button on [respira.press/dashboard/mcp](https://www.respira.press/dashboard/mcp) and pasting the one-time code it shows. The code saves your sites and their site keys to `~/.respira/config.json` on your computer. No key is ever pasted into the chat. [INSTALL.md](./INSTALL.md) has the steps for Windows and for teams.

**claude.ai in the browser and the Claude apps.** Chat does not run local servers, so connect the site itself: in Claude, open **Settings, Connectors, Add custom connector**, paste the site link from your Respira dashboard, sign in to Respira, then **Approve**. The skills and commands in this plugin then work with that connection.

## The commands

| Command | What it does |
|---|---|
| `/respira:connect-site` | Connect a WordPress site for the first time. |
| `/respira:edit-page` | Edit any page on a connected site. |
| `/respira:add-section` | Add a new section to a page, such as a hero, testimonials or an FAQ. |
| `/respira:duplicate-page` | Make a safe copy of a page to work on. |
| `/respira:preview-changes` | Open a page in your browser to see what is on it. |
| `/respira:audit-site` | Check accessibility, SEO or performance. |
| `/respira:undo-last-change` | Roll back the most recent edit. |
| `/respira:help` | Show the menu and where to get help. |

You can also ask in plain words. The commands are shortcuts.

## The skills

The skills load on their own when a conversation needs them. They cover safe editing and builder detection, page builds from HTML or Figma for each builder, builder-to-builder migrations, site audits (SEO and AI search, accessibility, mobile, technical debt, security, stale content, conversion), WooCommerce catalog, pricing and campaigns, design systems and art direction, brand voice, internal linking, activity reports, and client review loops. The same skills are published on their own at [respira-press/agent-skills-wordpress](https://github.com/respira-press/agent-skills-wordpress).

## Data and privacy

Everything this plugin runs, sends or fetches:

- **The MCP server (Claude Code and Cowork).** `.mcp.json` starts `@respira/wordpress-mcp-server`, pinned to one exact version, through `npx`, which downloads it from the npm registry the first time. The server reads your sites and site keys from `~/.respira/config.json`, and asks `registry.npmjs.org` whether a newer version exists so it can tell you.
- **Your WordPress sites.** The server sends each tool call to the WordPress site you are working on, over HTTPS, authenticated with that site's key. Page content travels between your site and Claude.
- **respira.press, for your account.** Redeeming a setup code calls `https://www.respira.press/api/cowork/redeem`, and the server refreshes your site list through `https://www.respira.press/api/mcp/config/refresh`. Two tools call respira.press when you use them: `respira_search_docs` sends your search words to `https://www.respira.press/docs-search`, and `respira_report_issue` sends the report you approve to `https://www.respira.press/mcp/report-issue`. A few tools run inside the WordPress plugin and reach respira.press from your site, such as the rendered design check, which asks the respira.press render service to load a published page and take screenshots.
- **respira.press, usage records.** After each tool call the server sends a record to `https://www.respira.press/mcp-spend/track`: the tool name, the site address, how long it took, whether it worked and its error code, the WordPress, Respira and WooCommerce versions, the page builder and theme type, and a one-way hash of the call's target. When a skill is opened it sends the skill name, the site address and the client name to `https://www.respira.press/api/skills/track-usage`. These records feed the usage and cost views in your Respira dashboard. They never contain tool arguments or results, page content, prompts or the conversation. Set the environment variable `RESPIRA_USAGE_OPT_OUT=1` to switch both off.
- **Skill run summaries.** Several skills end by asking Claude to send a short run summary to `POST https://www.respira.press/api/skills/track-usage`: the skill name, the site address, the WordPress and PHP versions, timings, whether it succeeded, which Respira tools it used, the AI client's name, and counts such as issues found by severity. Four skills include a small `telemetry.ts` helper that sends the same summary. Each skill that sends one names the endpoint and its fields in its own text. No page content and no keys are included. Claude only sends it when it can make HTTP calls, and you can tell Claude not to.
- **Nothing else.** The plugin has no hooks, runs nothing at startup besides the MCP server, and does not change Claude's permission settings.

The full policy is at [respira.press/privacy](https://www.respira.press/privacy) and the terms at [respira.press/terms](https://www.respira.press/terms).

## Support

- Help and questions: [respira.press/community](https://www.respira.press/community)
- Email: word@respira.press
- Documentation: [respira.press/docs](https://www.respira.press/docs)

Respira is built by Mihai Dragomirescu in Brașov, Romania.

## License

MIT. See [LICENSE](./LICENSE).
