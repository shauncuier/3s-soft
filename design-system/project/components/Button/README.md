# Button

Use a button to start an action: open WhatsApp, book a call, or send a form.

- **Variants:**
  - `primary`: `green-700` fill with `on-green` text, for the single main action in a view.
  - `secondary`: outlined with `line-strong`, for the alternative action.
  - `quiet`: underlined `green-700` text, for low-priority links such as "Book a 15-min call" next to a primary.
- **Consumer provides:**
  - a label in sentence case that starts with a verb
  - an optional leading Lucide icon at 20px
  - an `href` or an `onClick`
- **Element:** render it as `<a>` for navigation and as `<button>` to submit a form.
- **Size:** at least `tap-min` (44px) tall. It is full width inside `MobileCtaBar` and on forms narrower than 640px.
- **States:**
  - hover: `green-800`
  - focus: a 2px `focus` ring with an offset
  - pending: `disabled`, with the label changed to "Sending…"
- **Do:** use one primary per view.
- **Don't:** put two green buttons side by side, or use an icon without words.
