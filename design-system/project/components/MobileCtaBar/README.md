# MobileCtaBar

The MobileCtaBar is a sticky bottom bar on phones. It keeps the two main actions one tap away.

- **Visibility:** shows under 768px only. It is hidden on `/contact/` and `/free-listing-audit/`, where the form is already the action.
- **Content:** exactly two buttons of equal width:
  - `secondary` "WhatsApp", with its icon
  - `primary` "Free audit"
- **Position:**
  - `position: fixed; bottom: 0`
  - `padding-bottom: calc(var(--space-3) + env(safe-area-inset-bottom))`
  - `surface-0` background, `line` top border, `shadow-bar`
- **Reserve its height:** the page adds bottom padding to `<main>` so the bar never covers a submit button or a footer link.
- **Never hide focus:** while the bar shows, set `html { scroll-padding-bottom: 88px }` (bar height plus a gap), so a control reached with Tab scrolls clear of it (WCAG 2.2 Focus Not Obscured).
- **Stacking:** `z-cta-bar`. The consent banner (`z-consent`) sits above it and pushes it up while it is open; the two never overlap.
- **Tracking:** a WhatsApp tap calls `track('whatsapp_click')`. A Free audit tap navigates to the audit page.
