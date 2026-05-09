---
description: Recognises which WordPress page builder is in use and picks the right approach for that builder. Use whenever the user mentions Elementor, Divi, Bricks, Oxygen, Breakdance, Beaver Builder, WPBakery, Flatsome, Brizy, Thrive, Gutenberg, or page builder. Calls respira_get_builder_info before any edit so the right write path is chosen.
---

# Page Builder Detection

Respira supports 12 WordPress page builders. Each one stores content differently and needs a different write path. Picking the wrong path produces broken pages.

## Supported builders and how they store content

| Builder | Storage |
|---|---|
| Elementor | Post meta with serialized JSON |
| Divi 4 | Shortcodes inline in post_content |
| Divi 5 | Gutenberg block markup (`<!-- wp:divi/* -->`) |
| Bricks | Serialized post meta |
| Oxygen Classic | Post meta with shortcodes |
| Oxygen 6 | Post meta with JSON |
| Breakdance | Custom JSON structure |
| Beaver Builder | `_fl_builder_data` post meta |
| WPBakery | Shortcodes with attribute parser |
| Flatsome UX Builder | Custom format |
| Brizy | Custom format |
| Thrive Architect | Custom format |
| Gutenberg | Native block markup |

## Always detect before editing

Call `respira_get_builder_info` for the page before any write. This returns:

- The active builder.
- Its version.
- The list of available modules or widgets.
- The support level Respira has for it (full read and write, partial, read only).

Tell the user which builder you detected, in plain language:

> "this page is built with Elementor 3.21. i will use Elementor's native format so the edit blends in cleanly."

## Prefer element level edits

For edits where you can identify a single element on the page (a heading, a button, a paragraph, an image), prefer:

1. `respira_find_element` to locate it.
2. `respira_update_element` to change it.

Element level edits are safer than full page rewrites. They preserve the rest of the page, they preserve the builder's structure, and they are easier to roll back cleanly.

Use `respira_update_module` for builder specific module updates when the element abstraction is not enough.

## When the builder is partially supported

If `respira_get_builder_info` reports partial support (read only, or text and image only, or no full layout changes), be honest with the user:

> "this page uses Brizy. Respira can update text and swap images, but not change the layout. for layout changes you would need to open Brizy directly. want me to do the text and image edits, and you handle the layout in Brizy after?"

Never silently fail. Never write garbage into a builder format you cannot validate.

## When the builder is not supported

If the builder is not in the list above, tell the user honestly and surface what is possible. Offer to forward feedback to the founder so the builder gets prioritized for the next release. The Respira backlog is shaped by what users actually hit.
