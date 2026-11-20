import { existsSync } from 'node:fs'
import { team } from '@/content/team'

test('the team has nine people', () => {
  expect(team).toHaveLength(9)
})

test('Minhajul Abedin Toyon appears once, as UK Director', () => {
  const m = team.filter((t) => t.name.startsWith('Minhajul'))
  expect(m).toHaveLength(1)
  expect(m[0].name).toBe('Minhajul Abedin Toyon')
  expect(m[0].role).toBe('UK Director')
})

test('no placeholder or empty links', () => {
  for (const t of team) for (const l of t.links) {
    expect(l.url).toMatch(/^https:\/\//)
    expect(l.label.trim()).not.toBe('')
  }
})

test('no stock photos; every photo file exists', () => {
  for (const t of team) {
    if (!t.photo) continue
    expect(t.photo.src).not.toMatch(/unsplash|pexels|Mehedi_Hasan_Akash/)
    expect(existsSync(`public${t.photo.src}`)).toBe(true)
  }
})

test('exactly one founder, listed first', () => {
  expect(team.filter((t) => t.isFounder)).toHaveLength(1)
  expect(team[0].isFounder).toBe(true)
})

test('bios avoid unverifiable experience claims', () => {
  expect(JSON.stringify(team)).not.toMatch(/\d\+ years|expert in everything|world-class/i)
})
