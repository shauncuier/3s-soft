# ErrorSummary

An ErrorSummary lists every problem at the top of a form after a failed submit, so keyboard and screen-reader users can find and fix each field.

- **When:** a submit fails with two or more invalid fields. With one invalid field, skip the summary and move focus to that field.
- **Consumer provides:** a title that counts the problems ("Check 2 fields before sending") and one link per invalid field, pointing at the field's `id`, with the same text as the field's inline error.
- **Behaviour:**
  - render it above the form, then move focus to it (`tabindex="-1"`, `role="alert"`)
  - keep the inline `FormField` errors as well
  - remove it once every field is valid
- **Network failure** (Formspree down, offline) is not a field error. Show a single message in this same style: "We couldn't send your request. Check your connection and try again, or message us on WhatsApp." Keep the user's input, and re-enable the button.
- **Don't:** show only a toast, or move focus on every blur.
