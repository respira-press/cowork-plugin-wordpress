# Installing Respira for Cowork

This guide walks through installing the Respira for Cowork plugin and connecting your first WordPress site. It is written for people who have never used a terminal. Every step is one thing at a time.

## Before you start

You need:

- The Claude desktop app installed (download at https://claude.ai/download).
- Cowork enabled in your Claude account (Pro or Max plan).
- Node.js 18 or newer on your computer. Install it yourself before you start, from https://nodejs.org.
- A WordPress site where you can install plugins (almost any WordPress site, unless you are on a fully managed host that locks plugin installs).

Check Node before anything else. Open a terminal, or PowerShell on Windows, and run:

```
node -v
npx -v
```

Both should print a version. If either says "not recognized" or "command not found", install Node from https://nodejs.org and come back to this page.

This step is not optional and nothing will tell you that you skipped it. Without Node, Cowork cannot start the Respira server, and the way that failure appears is that no Respira connector shows up at all: no error, no failed entry, nothing in the connector list. There is no message anywhere pointing at Node. Reported by a customer on Windows who lost an evening to it, and this page previously claimed Cowork would install Node for you, which it does not.

### Install in Claude Desktop (Cowork)

1. In Claude, open **Cowork → Customize → Plugins**.
2. Click the **Personal** tab (next to Anthropic / Partners), then the **+** button.
3. Choose **Add marketplace → Add from a repository** and enter: `respira-press/cowork-plugin-wordpress` (owner/repo, or the full git URL).
4. Click **Sync**, then on the Respira plugin page click **Install**.
5. When the **"This plugin includes local MCP servers"** notice appears, that is expected, it is the `respira-wordpress` connector running locally. Click **Continue**.
6. Run `/respira:connect-site` to connect your WordPress sites.

Prefer a zip? Download the latest source from the repo and load it via **+ → Upload plugin** instead.

Note: the **Anthropic / Partners** tabs will not surface "Respira for WordPress" until the directory listing clears Anthropic review. The **Personal → Add marketplace** route above is the live path today.

### Teams: everyone installs it themselves

There is no organisation-wide install yet, for the reason just above: an
organisation plugin has to come from a listed marketplace, and Respira is not
in the Anthropic directory yet. Adding it on your own account does **not**
hand it to your team, and the organisation Plugins screen will not offer it.

So each person repeats steps 1 to 6 on their own machine, and each person runs
`/respira:connect-site` for themselves. The config it writes lives at
`~/.respira/config.json` on that person's computer, so one teammate's setup is
never visible to another.

Two things worth telling a team before they start:

- **The first launch is slow.** The connector downloads the Respira MCP server
  the first time it runs, which can take the better part of a minute on a cold
  machine. If the first message in a fresh session says the Respira tools are
  unavailable, the download had not finished. Say "try again" in the same
  conversation and it connects. It is only slow once per machine per version.
- **The setup code expires after 5 minutes.** It is short-lived on purpose,
  because it ends up sitting in a chat transcript. Generate it when you are
  ready to paste it, not before, and generate a fresh one if you get held up.

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
3. Getting that config into `~/.respira/config.json`, the file Cowork reads on startup. If Cowork has access to that folder it writes it for you; if not (a fresh chat usually doesn't), it gives you one short Terminal line to move it into place: `mkdir -p ~/.respira && mv ~/Downloads/config.json ~/.respira/config.json`. No Terminal? Create a `.respira` folder in your home directory and drop `config.json` in.
4. Restarting Cowork (open a fresh chat) and testing the connection.

If you already use Respira through Claude Desktop, the `.mcpb` already put a working `~/.respira/config.json` on your computer. Cowork picks it up automatically. No re-paste, no second config file.

It takes about 5 minutes. The command is written for someone who has never installed a WordPress plugin before. You can run it more than once to add additional sites.

## What gets stored where

- Your WordPress site URL and API key are saved on your computer at `~/.respira/config.json`. They never leave your machine except to talk to your own WordPress site.
- The Respira plugin on your WordPress site stores nothing about you outside your own site.
- The bundled MCP server runs locally as a Node.js process. It does not phone home.

## Troubleshooting

### "MCP server failed to start"

The Respira MCP server is a Node.js process bundled as the npm package `@respira/wordpress-mcp-server`. If it fails to start:

1. Check that Node.js 18 or newer is installed. Run `node -v` and `npx -v`. Both must print a version.
2. If either is missing, install from https://nodejs.org. On a Mac you can also use Homebrew (`brew install node`).
3. Restart your computer, not just the Claude desktop app. See below.

### No Respira connector appears at all

If the connector list shows your other tools but no Respira entry, and no Respira tools are offered, the server was never started rather than started and failed. On Windows this is almost always one of four things, in this order:

1. **Node is not installed.** `node -v` says "not recognized". Install from https://nodejs.org.

2. **PowerShell is blocking npm and npx.** On Windows these ship as `.ps1` scripts, and PowerShell refuses to run scripts by default, so you get "running scripts is disabled on this system" even though Node is installed correctly. Fix it with:

   ```
   Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
   ```

3. **Your computer needs a full restart.** This is the one that costs the most time. After installing Node, quitting and reopening the Claude desktop app is NOT enough. The app keeps a copy of the system PATH from when it started, and on Windows that copy can survive an app restart, so it still cannot find the Node you just installed. Restart the computer.

4. **Only then** check the config file and the plugin.

Worth knowing about step 1: the Node installer for Windows offers an optional "tools for native modules" step that also installs Chocolatey, Python and Visual Studio Build Tools. That is normal behaviour from Node's own installer and not something Respira asks for. It is noisy but not suspicious.

This whole sequence came from a customer who hit all four in a row and wrote it up afterwards. Any one of them alone is enough to produce the same silent result.

If it still fails, try running the server manually in a terminal:

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
