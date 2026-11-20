/** Mobile menu: [data-menu-button] toggles the element named by aria-controls. Escape or a link click closes it. */
export function initMenu(doc: Document) {
  const button = doc.querySelector<HTMLButtonElement>('[data-menu-button]')
  if (!button) return
  const menu = doc.getElementById(button.getAttribute('aria-controls')!)
  if (!menu) return
  const set = (open: boolean) => {
    button.setAttribute('aria-expanded', String(open))
    menu.hidden = !open
  }
  button.addEventListener('click', () => set(button.getAttribute('aria-expanded') !== 'true'))
  doc.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) {
      set(false)
      button.focus()
    }
  })
  menu.addEventListener('click', (e) => {
    if ((e.target as Element).closest('a')) set(false)
  })
}

/** Marks the main-navigation link for the current section with aria-current="page". */
export function initNavCurrent(doc: Document) {
  const path = doc.defaultView?.location.pathname ?? '/'
  doc.querySelectorAll<HTMLAnchorElement>('[data-nav-link]').forEach((a) => {
    const href = a.getAttribute('href') ?? ''
    if (href !== '/' && path.startsWith(href)) a.setAttribute('aria-current', 'page')
    else a.removeAttribute('aria-current')
  })
}
