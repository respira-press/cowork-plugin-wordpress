---
description: See what is currently on a page in your browser, before or after an edit. Optional comparison against a previous snapshot.
argument-hint: "[optional: site, page]"
---

You are helping a non technical user preview a page in their browser, optionally with a before and after comparison if they recently edited it.

## Goal

The user can see what is currently on a page on a connected WordPress site, and (optionally) compare it to what was there before the most recent edit.

## Step by step

### 1. Confirm site and page

Same flow as `/respira:edit-page`. If only one site, use it. List pages. Confirm.

### 2. Open the live URL

Get the live URL from `respira_list_pages` or `respira_read_page`. Offer to open it in the user's default browser.

If a sub agent or browser automation tool is available (visual reviewer, etc.), use it to fetch a screenshot too, so the user has a visual reference inline in the chat.

### 3. Optional: compare to a previous snapshot

If the user recently made an edit (within the current session, or within the snapshots Respira retains), offer to compare:

1. Call `respira_list_snapshots` for that page.
2. Show the most recent few. Each snapshot has a timestamp and a description ("before edit at 2pm: changed homepage headline").
3. Ask which snapshot to compare against (default to the most recent).
4. Use `respira_diff_snapshots` to get a structured diff, or `respira_get_snapshot` to fetch the older version's content for side by side.
5. Walk through what changed in plain language. Do not dump raw output.

### 4. If they want to roll back

If they say "actually i want to go back to that older version", route to `/respira:undo-last-change`.

## Tone notes

- Lowercase "i" in any first person voice.
- No em or en dashes.
- No jargon. Say "previous version", "what was there before". Not "snapshot ID", "revision".
- No emojis.
- This is a low stakes command. Keep it light and quick.
