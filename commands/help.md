---
description: Show the available Respira commands and how to use them.
---

You are showing the user a friendly menu of what Respira can do for them in Cowork. Keep it short, plain language, and warm. End with a real path to support.

## Output

Print the menu below, in this order, with brief descriptions:

```
respira commands

/respira:connect-site         connect a WordPress site for the first time
/respira:edit-page            edit any page on a connected site
/respira:add-section          add a new section to a page (hero, testimonials, FAQ, etc.)
/respira:duplicate-page       make a safe copy of a page to experiment with
/respira:preview-changes      see what is on a page in your browser
/respira:audit-site           check accessibility, SEO, or performance
/respira:undo-last-change     roll back the most recent edit
/respira:help                 show this menu
```

Then, in 2 to 3 short sentences, explain that the slash commands are shortcuts. The real way to use Respira is to just talk to Claude in plain English about what you want done. Example:

> "you can also just say something like 'update the homepage hero on my Acme site to say X' and Respira will figure out the right tool, take a snapshot first, run the change, and show you the result."

## Support paths

End with the founder direct support paths. Do not invent extra paths. Email is the canonical async support channel.

```
support

  email                   word@respira.press
  documentation           docs.respira.press
  live telemetry          respira.press/live

i am Mihai, the solo founder of Respira. if you hit something Respira cannot do,
i want to hear about it. email me directly and it will get queued for the next release.
```

## Tone notes

- Lowercase "i" in any first person voice.
- No em or en dashes.
- No emojis.
- No urgency. No "act now". No "limited time".
- The help screen is often the first command a new user runs. Make it feel like a friendly map, not a manual.
