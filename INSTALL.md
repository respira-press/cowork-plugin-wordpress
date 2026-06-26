# Installing Respira for Cowork

This guide walks through installing the Respira for Cowork plugin and connecting your first WordPress site. It is written for people who have never used a terminal. Every step is one thing at a time.

## Before you start

You need:

- The Claude desktop app installed (download at https://claude.ai/download).
- Cowork enabled in your Claude account (Pro or Max plan).
- Node.js 18 or newer on your computer (Cowork installs this automatically if missing).
- A WordPress site where you can install plugins (almost any WordPress site, unless you are on a fully managed host that locks plugin installs).

If you are unsure whether you have Node.js, Cowork will check on first run and prompt you to install it if needed.

### Install in Claude Desktop (Cowork)

1. In Claude, open **Cowork → Customize → Plugins**.
2. Click the **Personal** tab (next to Anthropic / Partners), then the **+** button.
3. Choose **Add marketplace → Add from a repository** and enter: `respira-press/cowork-plugin-wordpress` (owner/repo, or the full git URL).
4. Click **Sync**, then on the Respira plugin page click **Install**.
5. When the **"This plugin includes local MCP servers"** notice appears, that is expected, it is the `respira-wordpress` connector running locally. Click **Continue**.
6. Run `/respira:connect-site` to connect your WordPress sites.

Prefer a zip? Download the latest source from the repo and load it via **+ → Upload plugin** instead.

Note: the **Anthropic / Partners** tabs will not surface "Respira for WordPress" until the directory listing clears Anthropic review. The **Personal → Add marketplace** route above is the live path today.

### Install in Claude Code (terminal or VS Code)

```
/plugin marketplace add respira-press/cowork-plugin-wordpress
/plugin install respira
/respira:connect-site
```

`/plugin` works across the Claude Code terminal and VS Code. It is not available on claude.ai/code (web); use Claude Desktop (Cowork) or Claude Code there instead.

## First time setup

Open a new Cowork conversation and run:

```
/respira:connect-site
```

The command walks you through:

1. Installing the Respira plugin on your WordPress site (one time per site).
2. Downloading your `config.json` from https://respira.press/dashboard and pasting its contents here (one time per machine).
3. Claude saves the file for you. No filesystem navigation, no hidden folders.
4. Testing the connection.

If you already use Respira through Claude Desktop, the `.mcpb` already put a working `~/.respira/config.json` on your computer. Cowork picks it up automatically. No re-paste, no second config file.

It takes about 5 minutes. The command is written for someone who has never installed a WordPress plugin before. You can run it more than once to add additional sites.

## What gets stored where

- Your WordPress site URL and API key are saved on your computer at `~/.respira/config.json`. They never leave your machine except to talk to your own WordPress site.
- The Respira plugin on your WordPress site stores nothing about you outside your own site.
- The bundled MCP server runs locally as a Node.js process. It does not phone home.

## Troubleshooting

### "MCP server failed to start"

The Respira MCP server is a Node.js process bundled as the npm package `@respira/wordpress-mcp-server`. If it fails to start:

1. Check that Node.js 18 or newer is installed. Open Terminal and run `node --version`.
2. If it is missing, install from https://nodejs.org or via Homebrew (`brew install node`).
3. Restart the Claude desktop app.

If it still fails, try running the server manually in Terminal:

```
npx -y @respira/wordpress-mcp-server
```

If that fails too, screenshot the error and email word@respira.press.

### "Site connection failed" after running /respira:connect-site

Common causes, in order of likelihood:

1. The site URL has the wrong format. Use the full URL of the homepage, not the admin URL. Example: `https://yoursite.com`, not `https://yoursite.com/wp-admin`.
2. The API key was copied with extra spaces. Re copy it from the Respira tab in your WordPress admin.
3. The Respira plugin on the WordPress site is installed but not activated. Go to Plugins in WordPress admin and click activate.
4. The site is behind a maintenance mode plugin or a login wall. Disable temporarily, retry, then re enable.
5. Your WordPress site uses a non standard REST API path. The Respira MCP server auto falls back to `?rest_route=` when the standard path is shadowed by rewrite rules, but some hosts block the REST API entirely. If that is your situation, contact your host or email word@respira.press.

### "Page builder not detected"

Run `/respira:audit-site` and pick "all of the above". The audit reports which builder Respira detected on each page, so you can see whether the issue is one specific page or the whole site.

If your page builder is not in the supported list (Gutenberg, Elementor, Divi 4, Divi 5, Bricks, Oxygen Classic, Oxygen 6, Beaver Builder, Breakdance, Flatsome, Brizy, Visual Composer, WPBakery, Spectra, Kadence Blocks, GenerateBlocks, plus SeedProd audit-only), email word@respira.press. New builder support gets prioritized based on demand.

### "Tool not found" or "method not allowed"

The bundled MCP server is `@respira/wordpress-mcp-server`. Cowork installs it via `npx -y` on first use. If a tool the slash commands reference is not available, you may be running an older version. Force a refresh:

1. Close Cowork.
2. In Terminal: `npx -y @respira/wordpress-mcp-server@latest --version`.
3. Reopen Cowork.

### Anything else

Email word@respira.press with what you tried and what you saw. The Respira founder reads every message.

## Uninstalling

Remove the plugin from Cowork's Customize panel. The MCP server stops running. Your `~/.respira/config.json` and your WordPress plugin remain untouched. To remove those too:

1. Delete `~/.respira/config.json` (this removes saved site credentials).
2. In WordPress admin, deactivate and delete the Respira plugin (this removes Respira from your site).

Nothing about your WordPress content is affected by uninstalling the plugin. Your site continues to work normally.
