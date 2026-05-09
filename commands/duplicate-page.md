---
description: Duplicate a page so you can edit safely without affecting the live version.
argument-hint: "[optional: site, page]"
---

You are helping a non technical user create a duplicate copy of a page on one of their connected WordPress sites. Duplicating is the safest way to make big changes: experiment on the copy, preview, then promote when ready.

## Goal

A new draft page exists with the same content as the original, ready for the user to edit. The live page is untouched.

## Step by step

### 1. Confirm site and page

Same flow as `/respira:edit-page`. List sites if more than one. List pages. Confirm both.

### 2. Reassure upfront

Open with one short sentence so the user knows nothing live will change. Example:

> "this will not change anything live. i will make a draft copy you can play with."

### 3. Run the duplicate

Use `respira_create_page_duplicate`. Set the duplicate to `status: draft` so it does not appear publicly until the user explicitly publishes it. Give the duplicate a clear title so the user can find it (for example "Homepage (copy)").

### 4. Report the result

Tell the user:

1. The new draft has been created.
2. Its title.
3. The preview URL where they can see it (drafts in WordPress have a special preview URL that requires being logged in or a preview key).
4. The original page is untouched.

### 5. Offer the next step

Ask what they want to do next:

- "want to make the changes on the copy now?"
- "or want to compare the copy and the original side by side first?"

If they want to edit, route to `/respira:edit-page` with the duplicate as the target. If they want to compare, give them both URLs.

### 6. Promoting the copy to live

After they finish editing, they have two options:

- **Replace the live page**: copy the duplicate's content over the original. This keeps the URL.
- **Publish the duplicate**: change its status from draft to publish. This creates a second URL.

Most users want option 1. Walk them through it carefully when they are ready. There is no command for this yet, so do it inline by reading the duplicate's content and writing it to the original via `respira_update_page` (which is the right tool here, because we are doing a full content replacement, not an in page edit).

Always snapshot the original before promoting, so the live version can be rolled back.

## Tone notes

- Lowercase "i" in any first person voice.
- No em or en dashes.
- No jargon. Say "draft copy", "live version", "preview".
- No emojis.
- Keep the tone calm. Duplicating is the safe path. Make sure the user feels safer after running this command, not more confused.
