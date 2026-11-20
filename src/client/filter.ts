/** Portfolio filter: [data-filter] buttons over [data-category] items. The filter lives in the URL hash. */
export function initFilter(doc: Document) {
  const group = doc.querySelector<HTMLElement>('[data-filter-group]')
  if (!group) return
  const win = doc.defaultView!
  const buttons = [...group.querySelectorAll<HTMLButtonElement>('[data-filter]')]
  const items = [...doc.querySelectorAll<HTMLElement>('[data-category]')]
  const count = doc.querySelector<HTMLElement>('[data-filter-count]')
  const ids = buttons.map((b) => b.dataset.filter!)

  const apply = (active: string) => {
    let shown = 0
    for (const li of items) {
      const on = active === 'all' || li.dataset.category === active
      li.hidden = !on
      if (on) shown++
    }
    for (const b of buttons) {
      const on = b.dataset.filter === active
      b.setAttribute('aria-pressed', String(on))
      b.classList.toggle('ds-chip--active', on)
    }
    if (count) count.textContent = `Showing ${shown} of ${items.length} projects`
  }
  const fromHash = () => {
    const h = win.location.hash.replace('#', '')
    return ids.includes(h) ? h : 'all'
  }

  for (const b of buttons) {
    b.addEventListener('click', () => {
      const f = b.dataset.filter!
      win.history.replaceState(null, '', f === 'all' ? win.location.pathname : `#${f}`)
      apply(f)
    })
  }
  win.addEventListener('hashchange', () => apply(fromHash()))
  apply(fromHash())
}
