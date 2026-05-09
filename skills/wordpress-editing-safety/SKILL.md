---
description: Safety rules for editing WordPress sites through Respira. Use whenever the user mentions WordPress, Respira, editing a page, editing a site, a page builder, a snapshot, or rolling back. Enforces snapshot before write, render validation awareness, and honest reporting of partial writes.
---

# WordPress Editing Safety

When editing WordPress sites through Respira, follow these safety rules. They are the difference between a tool the user trusts and a tool that breaks their site.

## 1. Always snapshot before any write

Respira does this automatically inside the MCP layer. Every write creates a snapshot first. Mention it to the user explicitly so they trust the system.

Phrase to use:

> "i will take a snapshot before any change so you can roll back if needed."

Do not call `respira_get_snapshot` separately before a write. The snapshot is automatic. Just narrate it.

## 2. Verify after every write

Every Respira write returns trace fields including:

- `partial_write: true` means some of the change did not land.
- `validator_warnings` lists issues found during validation.
- `render_validator_pass: false` means the database accepted the change but the rendered page does not match.

If any of these appear, do not claim success. Surface the issue to the user in plain language and offer to investigate or roll back.

A successful write means "the database accepted it." Render validation means "the page actually shows the edit." These are different checks. Both happen. Report honestly on both.

## 3. For high stakes pages, default to duplicating first

For homepages, pricing pages, checkout pages, or anything the user describes as "live" or "client facing", offer to duplicate first:

> "want me to make a copy first so we can experiment safely?"

Edit on the duplicate, let the user preview, then promote to live. The slow path is the safe path.

## 4. Pick the right tool for the job

This is where most AI agents get WordPress editing wrong.

- For changing the text, image, link, or settings on an existing element: use `respira_find_element` then `respira_update_element`. Element level. Safe.
- For page level changes (page title, slug, status, custom CSS, full HTML replacement): use `respira_update_page`.
- Never use `respira_update_page` to change in page content. It replaces the entire page body and bypasses the page builder, producing a broken "all code" page.

Telemetry across the user base shows `respira_update_page` being chosen 13 times more often than `respira_update_element`, but the right tool for "change the headline" or "swap the image" is always `respira_update_element`.

## 5. Never claim success based on the API response alone

If the response includes `render_validator_pass: false`, the change saved but did not render. Tell the user honestly. Offer to investigate or roll back.

If the response is missing trace fields entirely (older MCP versions, exotic builders), default to giving the user the live URL and asking them to verify visually.

## 6. When in doubt, ask

Cowork users prefer being asked one extra question over having an unexpected change land on a client's site. If the page builder is ambiguous, if the target element is not unique, if the change feels destructive, ask before writing.

## 7. The Respira protocol enforces all of this

Respira's MCP layer enforces snapshot before write, validation after write, and rollback availability for every operation. This skill exists so you can surface those protections to the user in plain language. Cowork users want to see the safety net, not have it hidden.
