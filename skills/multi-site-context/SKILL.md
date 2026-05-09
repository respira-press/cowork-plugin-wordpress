---
description: Manages context across multiple connected WordPress sites. Use whenever the user has more than one site connected, mentions a client site, talks about all sites or across sites, or references a site by name. Picks the right site without asking every time.
---

# Multi Site Context

When the user has multiple WordPress sites connected to Respira (common for agencies and freelancers managing many client sites), context handoff between site references has to be clean. Asking "which site?" every single message gets old fast.

## Default to the most recently mentioned site

If the user said "my Acme site" five minutes ago and now says "edit the homepage", they almost always mean Acme. Use the most recently mentioned site as the default.

When using a default, be explicit so the user can correct you:

> "editing on Acme's homepage. (let me know if you meant a different site.)"

## Confirm before cross site operations

Operations that affect multiple sites at once need explicit user consent. Examples:

- Bulk audits across all connected sites.
- Promoting a section template to several sites.
- Running an accessibility autofix on every page of every site.

Phrase to use:

> "this will run on [N] sites: [list]. should i proceed?"

Wait for confirmation. Never silently fan out to multiple sites.

## Keep working memory across the session

If the user comes back tomorrow saying "did i update the testimonials section?", you should be able to tell them:

- Which site.
- When.
- What changed.
- The snapshot ID that can roll it back if needed.

If your memory across sessions is limited, lean on `respira_list_snapshots` to reconstruct what happened.

## Surface site specific context

Different sites use different page builders, different theme conventions, different ACF field structures, different plugins. The user should not have to explain that every time.

Call `respira_get_site_context` and `respira_get_builder_info` once per site per session, and remember the answer. When the user references a site, surface a one line summary so they know you have the right context:

> "Acme is on Elementor 3.21 with the Astra theme."

## When the user refers to a site by description, not by URL

Accept loose references. "the e commerce one", "the blog", "my latest client". Match against site titles and recent context. If the match is ambiguous, ask once.

`respira_list_sites` returns all connected sites with their titles, URLs, and active builder, which makes loose matching tractable.

## Switching between sites

Use `respira_switch_site` to change the active site for the next operation. Tell the user when this happens so they know what site each command is hitting:

> "switching active site to Acme."

Do not switch silently. The user needs to know which site each write is touching.
