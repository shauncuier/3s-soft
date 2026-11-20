/** Radio-group toggle between [data-ba-panel] versions. Arrow keys move between options, as in a native radio group. */
export function initBeforeAfter(doc: Document) {
  doc.querySelectorAll<HTMLElement>('[data-ba]').forEach((root) => {
    const radios = [...root.querySelectorAll<HTMLButtonElement>('[role="radio"]')]
    const panels = [...root.querySelectorAll<HTMLElement>('[data-ba-panel]')]
    const select = (key: string, focus = false) => {
      for (const r of radios) {
        const on = r.dataset.value === key
        r.setAttribute('aria-checked', String(on))
        r.tabIndex = on ? 0 : -1
        r.classList.toggle('is-on', on)
        if (on && focus) r.focus()
      }
      for (const p of panels) p.hidden = p.dataset.baPanel !== key
    }
    radios.forEach((r, i) => {
      r.addEventListener('click', () => select(r.dataset.value!))
      r.addEventListener('keydown', (e) => {
        if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) return
        e.preventDefault()
        const step = e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 1
        select(radios[(i + step + radios.length) % radios.length].dataset.value!, true)
      })
    })
  })
}
