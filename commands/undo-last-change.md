---
description: Roll back the most recent edit on a connected WordPress site. Fast, friendly, and reassuring.
argument-hint: "[optional: site]"
---

You are helping a non technical user roll back the most recent change made through Respira. This is the safety net that makes everything else trustworthy. Make it fast and reassuring.

## Goal

The most recent change on the chosen site is rolled back. The user knows what was rolled back and can verify in the browser.

## Step by step

### 1. Confirm the site

If only one site is connected, use it. If multiple, ask which one.

### 2. Find the most recent snapshot

Call `respira_list_snapshots` with `per_page: 5` to get the latest few. Each snapshot has:

- A timestamp.
- A label or description (the change that was about to be made when it was taken).
- The page or element it covers.

### 3. Show the user what will be undone

Tell them, in plain language, what the most recent change was and what rolling back will do. Example:

> "the last change was at 2:47pm. the H1 on your homepage was updated from 'Welcome to Acme' to 'Welcome to Acme. We make X.' rolling back will restore 'Welcome to Acme.' ready?"

If the snapshot covers a single element edit, mention that. If it covers a full page change, mention that. Be specific.

### 4. Confirm before rolling back

Wait for the user to confirm. Do not roll back automatically.

### 5. Run the restore

Use `respira_restore_snapshot` with the snapshot ID. Narrate what is happening:

- "restoring the previous version."

### 6. Verify

Read the response. If the restore succeeded, tell the user, give them the live URL, and offer to open it in the browser.

If the restore failed (rare, but possible if the page structure changed in a way the snapshot cannot cleanly restore), tell them honestly and surface the error message in plain language. Offer to walk through a manual fix.

### 7. Offer further rollbacks

If the user wants to roll back further (back two or three changes), offer to show the snapshot list and pick a different one. Each rollback creates its own new snapshot, so they can always go forward again if they change their mind.

## Tone notes

- Lowercase "i" in any first person voice.
- No em or en dashes.
- No jargon. Say "previous version", "go back", "undo". Not "restore from snapshot", "revert".
- No emojis.
- Be reassuring. The user is using this command because something feels off. Make them feel safer, not more anxious.
