# FormField

A FormField is a labelled input with an optional hint and error message. It is used in the contact form and the free audit form.

- **Consumer provides:** an `id`, the label text, the input type, an optional hint, and an error message when validation fails.
- **Label:** always visible above the input. Never use a placeholder as the only label.
- **Hint:** `small` in `ink-muted`.
- **Input:**
  - `tap-min` tall
  - `line-strong` border, which at 3.5:1 keeps the control visible without a fill
  - `radius-md`
  - 16px text, so iOS does not zoom in
- **Error:**
  - the border becomes 2px `danger`
  - a message appears below in `danger` with an alert icon, linked to the input with `aria-describedby`
  - the input gets `aria-invalid="true"`
  - the message says what to fix, never just "Invalid input"
- **After a failed submit,** keep everything the user typed.
