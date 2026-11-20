# 3s-soft.com Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current React/Vite SPA at 3s-soft.com with a Next.js static-export agency site. It leads with eCommerce operations, shows only verifiable proof, and is ready for outreach, SEO and cPanel hosting.

**Architecture:**
- Next.js 16 App Router with `output: 'export'`, so every route becomes real HTML under `out/`.
- All facts live in typed data files under `src/content/`. Build-time checks reject unverified proof, banned claims and broken links.
- Apache `.htaccess` handles HTTPS, 301s and caching on cPanel shared hosting.

**Tech Stack:** Next.js 16.4.6, React 19.3.1, TypeScript 7.0.2 (fall back to latest 6.x if `next build` type-check fails), Tailwind CSS 4.3.5, MDX (@next/mdx 16.4.6), sharp 0.35.5, Vitest 5.1.1 + jsdom 31 + Testing Library 16.3.3, Playwright 1.65.1 + @axe-core/playwright 4.14.0, linkinator 8.1.0, lighthouse 13.6.0, serve 14.2.8, Node 24.21.

**Spec:** `docs/superpowers/specs/2026-11-20-3s-soft-redesign-design.md`. Executors also read:
- `docs/research/real-proof-sources.md`
- `docs/research/redirect-map.md`
- `docs/research/domain-strategy.md`
- `docs/research/2026-11-20-3s-soft-a-to-z-analysis.md`

## Global Constraints

**Repo, packages and commits**
- Branch: `redesign-nextjs`. Never commit to `main` directly.
- **Commit messages must not contain `Co-Authored-By` or `Generated with` lines** (owner's global rule). Check before any push: `git log main..HEAD --format=%B | grep -i "Co-Authored-By\|Generated with"` must print nothing.
- Use the latest stable packages. Pin exact versions (no `^`) and commit `package-lock.json`. Re-check with `npm view <pkg> version` at scaffold time.
- `npm audit --audit-level=high` reports 0 high or critical issues.

**Build and hosting**
- `next.config.ts`: `output: 'export'`, `trailingSlash: true`, `images: { unoptimized: true }`.
- Not allowed in the new app: Firebase, DaisyUI, axios, Swiper, PWA, emailjs, react-helmet.
- Production canonical origin is `https://3s-soft.com`: bare domain, no www, HTTPS.

**Proof and copy**
- Proof facts (Fiverr 5.0, 465 reviews, Level 2, since 2015, about 1 hour response; Upwork Top Rated, 100% JSS, 55 jobs; Amazon SPN for A+ & Cataloguing; WordPress.org plugin) come only from `src/content/proof.ts`. Every entry has `sourceUrl` and `checkedOn`.
- Banned strings in any built HTML: `500+`, `98%`, `24/7`, `Guaranteed`, `Top Rated Plus`, `lorem`, `0+`, `RetailMax`, `DataDriven`, `MediCare`, `PropertyHub`, `TastyBites`, `StyleVogue`, `FitLife`, `TechVenture`, `HomeGoods`, `GreenEnergy`, `Luxe Beauty`, `EduTech`, `Sarah Johnson`, `Michael Chen`, `Emily Rodriguez`, `David Thompson`, `Lisa Wang`, `Robert Kim`, `sj_marketing`, `mchen_eco`, `avoid fees`, `platform fees`.
- Fiverr and Upwork may only be presented neutrally, as "Also available on Fiverr & Upwork".
- No `AggregateRating` or `Review` JSON-LD for our own organization.

**Contacts and integrations**
- WhatsApp: `https://wa.me/8801835927634`. Email: `info@3s-soft.com`. Phone: `+880 1835 927634`. Formspree: `https://formspree.io/f/mgoyrdky`. GA4: `G-JG742N2K6Z`. Clarity: ID from env `NEXT_PUBLIC_CLARITY_PROJECT_ID`.
- GA4 and Clarity load only after consent. Event names are exactly: `whatsapp_click`, `book_call_click`, `form_submit`, `audit_submit`, `fiverr_click`, `upwork_click`.

**Quality gates**
- Accessibility: WCAG 2.2 AA. One `<h1>` per page, a skip link, visible focus, tap targets ≥44px, and `prefers-reduced-motion` respected.
- Lighthouse mobile on `/`, `/services/ecommerce-product-listing/`, one case study, and `/free-listing-audit/`: SEO 100, Accessibility 100, Best Practices 100, Performance ≥95.

## Review Focus

1. **Crawlers and no-JS visitors.** Key facts ("465", "5.0", the H1, CTAs) must be in the static HTML, not rendered by JS. Test: `tests/build/static-html.test.ts` (Task 12).
2. **Old URLs, with or without a trailing slash.** For example `/services/graphic-design` and `/services/graphic-design/` must both 301 to the right target, and the old login and dashboard URLs must not 404. Test: `tests/unit/htaccess.test.ts` (Task 11).
3. **Form failure or double submit.** If Formspree errors or the network is down, the user sees an error with their input kept and can retry. A double click sends one request. Test: `tests/unit/lead-form.test.tsx` (Task 9).
4. **Consent declined.** No request goes to googletagmanager.com or clarity.ms. Test: `tests/e2e/consent.spec.ts` (Task 3).
5. **320px-wide phone.** No horizontal scroll, and the sticky mobile CTA bar never covers a form submit button. Test: `tests/e2e/mobile-layout.spec.ts` (Task 12).

---

## File Structure

```
next.config.ts                    export config
package.json                      scripts: dev, build, postbuild, test, test:e2e, check
public/.htaccess                  GENERATED by scripts/build-htaccess.ts; do not hand-edit redirects
public/assets/**                  WebP images (team, work, og)
public/llms.txt
scripts/build-htaccess.ts         redirects.ts → public/.htaccess
scripts/check-proof.ts            fails build if proof/review entry invalid
scripts/check-output.ts           banned strings + "#" hrefs + one h1 per page, over out/
src/app/layout.tsx                html shell, fonts, Header, Footer, MobileCtaBar, ConsentBanner
src/app/page.tsx                  home
src/app/services/page.tsx, src/app/services/[slug]/page.tsx
src/app/portfolio/page.tsx, src/app/portfolio/[slug]/page.tsx
src/app/reviews/page.tsx, about-us/, team/, contact/, free-listing-audit/
src/app/blogs/page.tsx, src/app/blog/[slug]/page.tsx
src/app/privacy-policy/, terms-of-service/, cookies/
src/app/not-found.tsx, sitemap.ts, robots.ts
src/content/types.ts              all content types
src/content/site.ts, proof.ts, reviews.ts, services.ts, team.ts, redirects.ts
src/content/portfolio/*.mdx, src/content/blog/*.mdx
src/lib/content.ts                loaders for MDX + frontmatter
src/lib/seo.ts                    buildMetadata(), jsonLd builders
src/lib/analytics.ts              consent store, track(), readUtm()
src/components/*                  Header, Footer, MobileCtaBar, ConsentBanner, ProofBar, ProofStat,
                                  ReviewCard, ServiceCard, WorkCard, CtaGroup, Faq, LeadForm, JsonLd, Section
tests/unit/**  (vitest)   tests/e2e/** (playwright)   tests/build/** (vitest over out/)
docs/archive/                     old JSON/JS content kept for reference
```

---

### Task 1: Archive the old app and scaffold the Next.js static export

**Files:**
- Create: `docs/archive/old-vite-content/` (copies of `src/data/*.json`, `src/data/servicesData.js`)
- Delete: `src/`, `index.html`, `vite.config.js`, `eslint.config.js`, `.browserslistrc`, `dist/`, `build_error.log`, `netlify.toml`, `public/_redirects`, `scripts/*.mjs`, `public/sw.js` and any PWA files. Keep `public/assets/`, `public/favicon/`, `public/robots.txt` (replaced later), `public/llms*.txt`.
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `src/app/layout.tsx`, `src/app/page.tsx` (placeholder), `vitest.config.ts`, `playwright.config.ts`, `eslint.config.mjs`
- Test: `tests/build/export.test.ts`

**Interfaces:**
- Produces:
  - npm scripts `dev`, `build` (`next build`), `postbuild` (runs `scripts/check-output.ts` from Task 12), `test` (vitest run), `test:e2e` (playwright, serving `out/` with `serve out -l 4321`), `check` (lint + test + build + test:e2e).
  - Playwright `baseURL` `http://localhost:4321`.

- [ ] **Step 1:** Copy `src/data/blogs.json`, `team.json`, `portfolio.json`, `testimonials.json` and `servicesData.js` to `docs/archive/old-vite-content/`. Commit the deleted `public/assets/team-profile/maptahul_taraq.webp` in the same commit (`git rm`).
- [ ] **Step 2:** Remove the old app files listed above. `.env` stays untracked; add `.env*` and `out/` to `.gitignore`.
- [ ] **Step 3:** Install the pinned packages from the spec table with `npm i -E`, plus the dev packages `vitest@5.1.1 jsdom@31.0.1 @testing-library/react@16.3.3 @vitejs/plugin-react@6.3.0 @axe-core/playwright@4.14.0 serve@14.2.8 tsx`. Run `npx playwright install chromium`.
- [ ] **Step 4: Write the failing test** `tests/build/export.test.ts`:
  ```ts
  test('static export writes index.html', () => {
    expect(existsSync('out/index.html')).toBe(true)
    expect(readFileSync('out/index.html','utf8')).toContain('<html lang="en"')
  })
  ```
- [ ] **Step 5:** Run `npx vitest run tests/build/export.test.ts`. Expected: FAIL (no `out/`).
- [ ] **Step 6:** Write `next.config.ts` with the Global Constraints config and a minimal layout and page. Run `npm run build`. If the TypeScript 7 type-check fails inside `next build`, pin `typescript` to the latest 6.x and note why in the commit message.
- [ ] **Step 7:** Run `npx vitest run tests/build/export.test.ts`. Expected: PASS.
- [ ] **Step 8: Commit.** `git commit -m "chore: replace Vite SPA with Next.js 16 static export scaffold"`

### Task 2: Content data layer and proof validation

**Files:**
- Create: `src/content/types.ts`, `src/content/site.ts`, `src/content/proof.ts`, `src/content/reviews.ts`, `scripts/check-proof.ts`
- Test: `tests/unit/proof.test.ts`

**Interfaces:**
- Produces (in `types.ts`):
  - `type ProofItem = { id: string; value: string; label: string; sourceUrl: string; checkedOn: string /* YYYY-MM-DD */ }`
  - `type Review = { id: string; platform: 'fiverr'|'upwork'; user: string; country?: string; text: string; gig: string; date: string /* human, as of checkedOn */; serviceSlugs: string[]; sourceUrl: string; checkedOn: string }`
  - `type SiteConfig = { name: '3s-Soft'; url: 'https://3s-soft.com'; email; phone; whatsapp; bookingUrl; fiverrUrl; upworkUrl; upworkAgencyUrl; ukUrl: 'https://3s-soft.co.uk'; netUrl: 'https://3s-soft.net'; socials: {label:string;url:string}[]; address: {city:'Chittagong'; country:'Bangladesh'} }`
- Produces (data and helpers):
  - `export const proof: ProofItem[]`, plus `getProof(id: string): ProofItem` (throws if the id is missing)
  - `export const reviews: Review[]`, plus `reviewsFor(serviceSlug: string): Review[]`
  - `export function validateProof(items: ProofItem[]): string[]` and `export function validateReviews(items: Review[]): string[]`. Each returns error messages; an empty array means valid.

- [ ] **Step 1: Write the failing tests:**
  ```ts
  test('every proof item is sourced', () => expect(validateProof(proof)).toEqual([]))
  test('every review is sourced', () => expect(validateReviews(reviews)).toEqual([]))
  test('rejects missing checkedOn', () =>
    expect(validateProof([{id:'x',value:'1',label:'x',sourceUrl:'https://a.b',checkedOn:''}])).toHaveLength(1))
  test('rejects non-https source', () =>
    expect(validateProof([{id:'x',value:'1',label:'x',sourceUrl:'http://a.b',checkedOn:'2026-11-20'}])).toHaveLength(1))
  test('core facts match spec', () => {
    expect(getProof('fiverr-reviews').value).toBe('465')
    expect(getProof('fiverr-rating').value).toBe('5.0')
    expect(getProof('upwork-badge').value).toBe('Top Rated')
    expect(getProof('fiverr-since').value).toBe('2015')
  })
  test('no banned reviewer names', () =>
    expect(reviews.map(r=>r.user)).not.toContain('sj_marketing'))
  ```
- [ ] **Step 2:** Run `npx vitest run tests/unit/proof.test.ts`. Expected: FAIL (module not found).
- [ ] **Step 3:** Fill `site.ts`, `proof.ts` (the ids in the "Numbers allowed" table of `real-proof-sources.md`) and `reviews.ts`.
  - Start reviews with the 5 usable entries in that file, then add 10–15 more real verbatim Fiverr reviews copied from the live profile, each with its `serviceSlugs`.
  - `bookingUrl`: use `https://cal.com/3s-soft-uk/15min` until the owner gives a .com link (spec open item 2).
- [ ] **Step 4:** Write `scripts/check-proof.ts`, which exits 1 and prints the errors if either validator returns any. Add it to the start of the `build` script: `tsx scripts/check-proof.ts && next build`.
- [ ] **Step 5:** Run `npx vitest run tests/unit/proof.test.ts`. Expected: PASS.
- [ ] **Step 6: Commit.** `git commit -m "feat: add sourced proof and review data with validation"`

### Task 3: Design system, layout shell, consent and analytics

Use the skills `frontend-design:frontend-design` and `design:ux-copy` for this task.

**Files:**
- Create:
  - `src/app/globals.css`: Tailwind v4 `@theme` tokens. Light by default, with a `prefers-color-scheme: dark` override.
  - `src/components/Header.tsx`, `Footer.tsx`, `MobileCtaBar.tsx`, `ConsentBanner.tsx`, `CtaGroup.tsx`, `Section.tsx`
  - `src/lib/analytics.ts`
- Modify: `src/app/layout.tsx`
- Test: `tests/unit/analytics.test.ts`, `tests/e2e/consent.spec.ts`

**Interfaces:**
- Consumes: `site` from Task 2.
- Produces:
  - `type Consent = 'granted'|'denied'|null`
  - `getConsent(): Consent` and `setConsent(c: 'granted'|'denied'): void`, both using localStorage key `3s-consent` wrapped in try/catch
  - `track(event: 'whatsapp_click'|'book_call_click'|'form_submit'|'audit_submit'|'fiverr_click'|'upwork_click', params?: Record<string,string>): void`. A no-op unless consent is `granted`.
  - `type Utm = { utm_source?: string; utm_medium?: string; utm_campaign?: string; utm_content?: string; utm_term?: string }`
  - `readUtm(search: string): Utm`, and `persistUtm(u: Utm): void` / `getStoredUtm(): Utm`, both using sessionStorage key `3s-utm`
  - `<CtaGroup variant="primary"|"compact" showMarketplaces?: boolean />`: renders WhatsApp, Book call and Free audit links, and (when `showMarketplaces` is set) the text "Also available on Fiverr & Upwork" with both links. Each link calls `track`.

- [ ] **Step 1: Write the failing unit tests:**
  - `readUtm('?utm_source=linkedin&utm_campaign=nov&x=1')` returns `{utm_source:'linkedin',utm_campaign:'nov'}`.
  - `track` does not call `window.gtag` when consent is `null` or `denied`, and does call it when consent is `granted`.
  - `getConsent()` returns `null` when localStorage throws.
- [ ] **Step 2: Write the failing e2e test** `consent.spec.ts`:
  - Load `/` and click "Decline". Reload, then assert that no request URL contains `googletagmanager.com` or `clarity.ms`.
  - Clear storage, click "Allow analytics", and assert a request to `googletagmanager.com` is seen.
- [ ] **Step 3:** Run `npx vitest run tests/unit/analytics.test.ts`. Expected: FAIL.
- [ ] **Step 4:** Implement `analytics.ts`, the shell components and the layout.
  - The header has the logo and nav: Services, Work, Reviews, About, Contact, plus a "Free audit" button.
  - The footer has services, company links, contact details, "UK clients: 3s-soft.co.uk", "Web development: 3s-soft.net", Fiverr/Upwork/WordPress.org/Amazon SPN links and the legal links. Fix the old email bug: use `mailto:info@3s-soft.com`.
  - `MobileCtaBar` shows below 768px and is hidden on `/free-listing-audit` and `/contact`. When it is visible, the page gets bottom padding equal to the bar height.
  - The skip link targets `#main`.
  - GA4 and Clarity scripts are injected only after consent is `granted`.
- [ ] **Step 5:** Run `npx vitest run tests/unit/analytics.test.ts && npm run build && npx playwright test tests/e2e/consent.spec.ts`. Expected: PASS.
- [ ] **Step 6: Commit.** `git commit -m "feat: add design tokens, layout shell, consent-gated analytics"`

### Task 4: Homepage, with an owner approval checkpoint

Use the skills `frontend-design:frontend-design`, then `design:design-critique` and `design:accessibility-review` on the result.

**Files:**
- Create:
  - `src/components/ProofBar.tsx`, `ProofStat.tsx`, `ReviewCard.tsx`, `ServiceCard.tsx`, `WorkCard.tsx`, `Faq.tsx`, `JsonLd.tsx`
  - `src/content/faq.ts` (`homeFaq: {q:string;a:string}[]`)
- Modify: `src/app/page.tsx`
- Test: `tests/unit/proof-bar.test.tsx`

**Interfaces:**
- Consumes: `proof`, `getProof`, `reviews`, `site`, `CtaGroup`.
- Produces:
  - `<ProofStat id={string} />`: renders the value, the label and a small source link with the text "Fiverr ↗ · checked Nov 2026" (`rel="noopener"`, `target="_blank"`).
  - `<ProofBar ids={string[]} />`
  - `<ReviewCard review={Review} />`: shows the verbatim text, user, country, platform, date and a source link.
  - `<ServiceCard service={Service} />` and `<WorkCard item={WorkItem} />`. Types come from Tasks 5 and 6; on the homepage, use stub data typed the same way until those tasks land.
  - `<Faq items={{q:string;a:string}[]} />`: renders `<details>` elements and FAQPage JSON-LD.

- [ ] **Step 1: Write the failing test.** Rendering `<ProofStat id="fiverr-reviews"/>` must:
  - contain the text `465`
  - include a link whose `href` is `https://www.fiverr.com/jashedulislam`
  - not contain `0+`
- [ ] **Step 2:** Run `npx vitest run tests/unit/proof-bar.test.tsx`. Expected: FAIL.
- [ ] **Step 3:** Implement the components and build the homepage sections in spec §6 order.
  - **Hero:** H1 "Amazon, Shopify & marketplace listings done right." (the copy may be polished; the facts may not), the sub-line from spec §5, and `CtaGroup primary`.
  - **ProofBar:** `fiverr-rating`, `fiverr-reviews`, `upwork-badge`, `upwork-jss`, `amazon-spn`, `wp-plugin`, `fiverr-since`.
  - **Services:** the 5 eCommerce service cards.
  - **Teaser:** "Websites & development → 3s-soft.net", with 3 outbound web cards.
  - **Selected work:** 6 cards.
  - **Reviews:** 6 `ReviewCard`s and a link to `/reviews/`.
  - **Process:** 4 steps.
  - **FAQ.**
  - **Final CTA** with `showMarketplaces`.
  - Numbers are plain text. No count-up animation.
- [ ] **Step 4:** Run `npx vitest run tests/unit/proof-bar.test.tsx && npm run build`. Expected: PASS.
- [ ] **Step 5:** Run the `design:design-critique` and `design:accessibility-review` skills on `http://localhost:4321/` at 375px and 1440px. Fix every high-severity item.
- [ ] **Step 6: CHECKPOINT.** Send the owner screenshots at mobile and desktop width. **Stop until the owner approves the look.** Apply their feedback.
- [ ] **Step 7: Commit.** `git commit -m "feat: homepage with real proof, reviews and CTAs"`

### Task 5: Keyword map and service pages

Use the skills `searchfit-seo:keyword-clustering`, `marketing:seo-audit` (competitor gaps), `searchfit-seo:content-brief` and `searchfit-seo:on-page-seo`.

**Files:**
- Create: `docs/research/keyword-map.md`, `src/content/services.ts`, `src/app/services/page.tsx`, `src/app/services/[slug]/page.tsx`
- Test: `tests/unit/services.test.ts`

**Interfaces:**
- Produces:
  - `type Service = { slug: ServiceSlug; title: string; shortTitle: string; primaryKeyword: string; metaTitle: string /* ≤60 chars */; metaDescription: string /* 120–155 chars */; summary: string; problems: string[]; deliverables: string[]; platforms: string[]; startingFrom?: string; faq: {q:string;a:string}[]; ctaKind: 'audit'|'call'|'quote' }`
  - `type ServiceSlug = 'ecommerce-product-listing'|'amazon-a-plus-content'|'shopify-store-management'|'lead-generation'|'virtual-assistant'`
  - `export const services: Service[]` and `getService(slug: ServiceSlug): Service`
  - `generateStaticParams()` returns the 5 slugs.

- [ ] **Step 1:** Produce `docs/research/keyword-map.md`: one keyword cluster for each of the 5 service URLs plus `/free-listing-audit/`. Use the money terms from spec Part 2b. Note the competitor gaps.
- [ ] **Step 2: Write the failing tests:**
  - `services` has exactly the 5 slugs above.
  - Every `metaTitle` is ≤60 characters and every `metaDescription` is 120–155 characters.
  - `primaryKeyword` values are unique across services.
  - `reviewsFor(slug).length >= 2` for each slug.
  - `startingFrom` is undefined unless the owner has approved prices (spec open item 4).
- [ ] **Step 3:** Run `npx vitest run tests/unit/services.test.ts`. Expected: FAIL.
- [ ] **Step 4:** Write the service content from the briefs, and the pages.
  - Section order on each service page: problem → what we do → deliverables → proof (`reviewsFor`, related work) → FAQ (`<Faq>`) → CTA.
  - `/services/` lists the 5 services plus the .net teaser.
  - `virtual-assistant` displays as "Catalogue & data management".
- [ ] **Step 5:** Run `npx vitest run tests/unit/services.test.ts && npm run build`. Expected: PASS, and `out/services/amazon-a-plus-content/index.html` exists.
- [ ] **Step 6: Commit.** `git commit -m "feat: keyword-mapped eCommerce service pages"`

### Task 6: Portfolio

**Files:**
- Create:
  - `src/content/portfolio/*.mdx`: ivan-troy-amazon-a-plus, montique-amazon-store, stahl-design-tebart-amazon-listing-optimization, tailwater-supply, plus real Fiverr portfolio items
  - `src/content/work-external.ts`: outbound web/dev cards
  - `src/lib/content.ts`
  - `src/app/portfolio/page.tsx`, `src/app/portfolio/[slug]/page.tsx`
  - `public/assets/work/*.webp`
- Test: `tests/unit/portfolio.test.ts`

**Interfaces:**
- Produces:
  - `type WorkFrontmatter = { slug: string; title: string; clientLabel: string /* real name only if publicNameApproved */; clientRealName?: string; publicNameApproved: boolean; category: 'amazon'|'shopify'|'multi-marketplace'|'lead-gen'|'web'; services: ServiceSlug[]; summary: string; deliverables: string[]; images: {src:string;alt:string;width:number;height:number}[]; sourceUrl?: string; reviewIds?: string[]; date: string }`
  - `type WorkItem = WorkFrontmatter & { external?: false } | { external: true; title: string; summary: string; url: string; category: 'web'; image?: {src;alt;width;height} }`
  - `getAllWork(): WorkItem[]`, `getWork(slug: string): { frontmatter: WorkFrontmatter; Content: React.ComponentType }`, `workFor(service: ServiceSlug): WorkItem[]`
  - `src/lib/content.ts` also exports `getAllPosts()` and `getPost()` for Task 8, with the same pattern.

- [ ] **Step 1: Write the failing tests:**
  - If `publicNameApproved` is false, `clientLabel` must not equal `clientRealName`.
  - Every image has `alt.length > 10`, the file exists under `public/`, and width/height are set.
  - No slug from the "Portfolio (fake case studies removed)" table in `redirect-map.md` appears in `getAllWork()`.
  - All `external` items have https URLs.
- [ ] **Step 2:** Run `npx vitest run tests/unit/portfolio.test.ts`. Expected: FAIL.
- [ ] **Step 3:** Gather real screenshots (UK case-study images, Fiverr delivery screenshots, the Stahl listing) and convert them to WebP with sharp (max width 1600, quality 80).
  - Write the MDX from `real-proof-sources.md` and the UK case studies, in our own words rather than copied text (see `domain-strategy.md`).
  - Set `publicNameApproved: false` until the owner confirms each client (spec open item 1).
  - Add a portfolio grid with client-side category filter buttons. All items must still be present in the static HTML.
- [ ] **Step 4:** Run `npx vitest run tests/unit/portfolio.test.ts && npm run build`. Expected: PASS.
- [ ] **Step 5: Commit.** `git commit -m "feat: real portfolio with case studies and outbound web work"`

### Task 7: Reviews, About and Team pages

**Files:**
- Create: `src/content/team.ts`, `src/app/reviews/page.tsx`, `src/app/about-us/page.tsx`, `src/app/team/page.tsx`
- Test: `tests/unit/team.test.ts`

**Interfaces:**
- Produces: `type TeamMember = { slug: string; name: string; role: string; photo: {src:string;alt:string}; links: {label:string;url:string}[]; location?: string; isFounder?: boolean }` and `export const team: TeamMember[]`.

- [ ] **Step 1: Write the failing tests:**
  - `team.length === 9`.
  - Exactly one entry has the name `Minhajul Abedin Toyon` and the role `UK Director`.
  - No entry has the name `Minhajul Abedin` alone.
  - No link URL is `#` or empty.
  - No photo `src` contains `unsplash`.
  - Every photo file exists.
- [ ] **Step 2:** Run `npx vitest run tests/unit/team.test.ts`. Expected: FAIL.
- [ ] **Step 3:** Port `team.json` and drop members' empty links. Until the owner provides a real photo for Mehedi Hasan Akash, use an initials avatar (spec open item 3).
  - **`/reviews/`:** the Fiverr rating breakdown from proof (444/14/2/3/2), all reviews grouped by service, and a source link per card.
  - **`/about-us/`:** the story since 2015, the founder (Person JSON-LD), the Chittagong HQ and UK arm (link to .co.uk) and a verifiable track-record list.
- [ ] **Step 4:** Run `npx vitest run tests/unit/team.test.ts && npm run build`. Expected: PASS.
- [ ] **Step 5: Commit.** `git commit -m "feat: reviews, about and team pages"`

### Task 8: Blog migration

**Files:**
- Create: `src/content/blog/*.mdx` (the 6 kept slugs in `redirect-map.md`), `src/app/blogs/page.tsx`, `src/app/blog/[slug]/page.tsx`, `docs/archive/net-blog-posts/*.md` (3 web posts kept for the .net project)
- Test: `tests/unit/blog.test.ts`

**Interfaces:**
- Produces: `type PostFrontmatter = { slug: string; title: string; description: string /* 120–155 */; author: string /* must match team.ts name */; date: string; updated: string; services: ServiceSlug[]; image: {src;alt;width;height} }`

- [ ] **Step 1: Write the failing tests:**
  - Exactly 6 posts exist, with the slugs from `redirect-map.md`.
  - Every `author` exists in `team`.
  - Every post body links to at least one `/services/` URL.
  - No post contains a banned string.
  - The description of `roi-of-virtual-assistants-small-business` does not contain `React`.
- [ ] **Step 2:** Run `npx vitest run tests/unit/blog.test.ts`. Expected: FAIL.
- [ ] **Step 3:** Convert the 6 posts from `docs/archive/old-vite-content/blogs.json` to MDX.
  - Remove unverifiable stats and claims, and add internal links to the matching service and case study.
  - Set `updated` to the migration date.
  - Write the 3 web posts to `docs/archive/net-blog-posts/`.
- [ ] **Step 4:** Run `npx vitest run tests/unit/blog.test.ts && npm run build`. Expected: PASS.
- [ ] **Step 5: Commit.** `git commit -m "feat: migrate 6 eCommerce blog posts to MDX"`

### Task 9: Lead forms: Contact and the free listing audit landing page

Use the skill `design:ux-copy`.

**Files:**
- Create: `src/components/LeadForm.tsx`, `src/app/contact/page.tsx`, `src/app/free-listing-audit/page.tsx`, `src/app/free-listing-audit/layout.tsx` (minimal header, no main nav)
- Test: `tests/unit/lead-form.test.tsx`

**Interfaces:**
- Consumes: `track`, `getStoredUtm`, `site`.
- Produces:
  - `<LeadForm kind="contact"|"audit" />`
  - `submitLead(data: FormData, fetchImpl?: typeof fetch): Promise<{ok:true}|{ok:false; error:string}>`, which POSTs to `https://formspree.io/f/mgoyrdky` with `Accept: application/json`.
  - Fields:
    - contact: `name`, `email`, `whatsapp?`, `service` (select from `services`), `message`
    - audit: `storeUrl`, `marketplace` (Amazon/Shopify/Walmart/Etsy/eBay/Other), `email`, `whatsapp?`
    - hidden on both: `form_type`, the UTM fields, and the honeypot `company_website`

- [ ] **Step 1: Write the failing tests:**
  - When the honeypot is filled, `fetchImpl` is not called.
  - On a 500 response (or when `fetchImpl` throws), an error message renders, the typed values are kept, and the button is enabled again.
  - A double click on submit calls `fetchImpl` once while it is pending.
  - On success, the form shows a success message and calls `track('audit_submit')` for audit or `track('form_submit')` for contact.
  - UTM values from `getStoredUtm()` appear in the posted FormData.
  - Invalid email shows inline errors; `storeUrl` must be a valid URL.
- [ ] **Step 2:** Run `npx vitest run tests/unit/lead-form.test.tsx`. Expected: FAIL.
- [ ] **Step 3:** Implement the form and both pages.
  - **Audit page:** offer headline "Free 5-product listing audit", what's reviewed (titles, keywords, bullets and description, images, category, competitor ideas), ProofBar, 2 WorkCards, FAQ, and the form.
  - **Contact page:** WhatsApp, booking, email, phone, the form, the "Also available on Fiverr & Upwork" line, and the UK office link.
  - Only state a reply time from proof (`fiverr-response`).
- [ ] **Step 4:** Run `npx vitest run tests/unit/lead-form.test.tsx && npm run build`. Expected: PASS.
- [ ] **Step 5:** With the owner's OK, send one real test submission to Formspree and confirm it arrives in the inbox.
- [ ] **Step 6: Commit.** `git commit -m "feat: contact form and free listing audit landing page"`

### Task 10: SEO metadata, structured data, sitemap, robots, llms.txt and OG images

Use the skills `searchfit-seo:technical-seo`, `searchfit-seo:schema-markup`, `searchfit-seo:internal-linking` and `searchfit-seo:ai-visibility`.

**Files:**
- Create:
  - `src/lib/seo.ts`
  - `src/app/sitemap.ts`, `src/app/robots.ts`
  - `src/app/opengraph-image.png` and per-section static OG PNGs in `public/assets/og/` (1200×630, generated once with sharp from real brand assets)
  - `public/llms.txt` (rewritten)
  - `src/app/not-found.tsx`
  - Legal pages
- Modify: every `page.tsx` to export `metadata` or `generateMetadata` built with `buildMetadata`.
- Test: `tests/unit/seo.test.ts`

**Interfaces:**
- Produces:
  - `buildMetadata(opts: { title: string; description: string; path: string; image?: string; noindex?: boolean }): Metadata`. The canonical is `https://3s-soft.com${path}`, where `path` ends with `/`. The title template is `%s | 3s-Soft`, and the home page uses an absolute title.
  - `orgJsonLd(): object` returns `@type: ['Organization','ProfessionalService']` with `name`, `url`, `logo`, `email`, `telephone`, `address`, `sameAs` (Fiverr, Upwork agency, LinkedIn, Facebook, Instagram, .co.uk, .net) and `founder`.
  - `personJsonLd()`, `serviceJsonLd(s: Service)`, `breadcrumbJsonLd(items:{name:string;path:string}[])`, `blogPostingJsonLd(p: PostFrontmatter)`, `faqJsonLd(items)`.

- [ ] **Step 1: Write the failing tests:**
  - `buildMetadata({path:'/services/'})` has the canonical `https://3s-soft.com/services/`.
  - `JSON.stringify(orgJsonLd())` does not contain `AggregateRating` or `"Review"`.
  - `sameAs` includes `https://www.fiverr.com/jashedulislam`.
  - The sitemap contains every static route and every service, work and post slug, and no route that appears in the redirect map's old paths.
  - `robots()` disallows nothing public and points to `https://3s-soft.com/sitemap.xml`.
  - `not-found` metadata has `robots.index === false`.
- [ ] **Step 2:** Run `npx vitest run tests/unit/seo.test.ts`. Expected: FAIL.
- [ ] **Step 3:** Implement the above.
  - Inject `orgJsonLd` site-wide in the layout, plus page-specific JSON-LD.
  - `llms.txt` lists the real entity facts (founder, since 2015, Chittagong, Amazon SPN, the proof links) and the main URLs.
  - Legal pages: carry over the old text, add the consent and analytics wording, and set the date to the launch date.
- [ ] **Step 4:** Run `npx vitest run tests/unit/seo.test.ts && npm run build`. Expected: PASS, and `out/sitemap.xml` and `out/robots.txt` exist.
- [ ] **Step 5: Commit.** `git commit -m "feat: metadata, JSON-LD, sitemap, robots, llms.txt, OG images"`

### Task 11: .htaccess generator with 301 redirects

**Files:**
- Create: `src/content/redirects.ts`, `scripts/build-htaccess.ts`
- Generated: `public/.htaccess`, created in the `build` script before `next build`
- Test: `tests/unit/htaccess.test.ts`

**Interfaces:**
- Produces:
  - `type Redirect = { from: string /* no trailing slash */; to: string /* absolute path with trailing slash, or full https URL */ }`
  - `export const redirects: Redirect[]`: every row of `docs/research/redirect-map.md`, plus `/login`, `/register` → `/contact/` and `/dashboard(/.*)?` → `/`.
  - `renderHtaccess(r: Redirect[]): string`

- [ ] **Step 1: Write the failing tests.** Parse the output of `renderHtaccess(redirects)` and assert:
  - It contains the HTTPS and www → bare domain rule redirecting to `https://3s-soft.com%{REQUEST_URI}`.
  - It contains `ErrorDocument 404 /404.html`.
  - Every redirect is emitted as `RedirectMatch 301 ^<from>/?$ <to>`. Check `/services/graphic-design` with and without a trailing slash matches and goes to `/services/amazon-a-plus-content/`.
  - `/dashboard/profile` maps to `/`.
  - `_next/static` gets `max-age=31536000, immutable`, and HTML gets `no-cache`.
  - No `from` equals a live route (cross-check against the sitemap routes from Task 10).
- [ ] **Step 2:** Run `npx vitest run tests/unit/htaccess.test.ts`. Expected: FAIL.
- [ ] **Step 3:** Implement the generator.
  - Carry over the gzip/deflate and MIME rules from the old `public/.htaccess` (see git history: `git show main:public/.htaccess`), and add Brotli guarded by `<IfModule mod_brotli.c>`.
  - Remove the SPA fallback.
  - Set `DirectoryIndex index.html`.
- [ ] **Step 4:** Run `npx vitest run tests/unit/htaccess.test.ts && npm run build`. Expected: PASS, and `out/.htaccess` exists.
- [ ] **Step 5: Commit.** `git commit -m "feat: generate .htaccess with 301 map, caching and 404"`

### Task 12: Output quality gates, end-to-end tests and Lighthouse

Use the skills `searchfit-seo:broken-links`, `searchfit-seo:seo-audit`, `design:accessibility-review`, `playwright-skill:playwright-skill` and `superpowers:verification-before-completion`.

**Files:**
- Create: `scripts/check-output.ts`, `scripts/lighthouse.ts`
- Test:
  - `tests/build/static-html.test.ts`
  - `tests/e2e/smoke.spec.ts`
  - `tests/e2e/a11y.spec.ts` (axe on every route)
  - `tests/e2e/mobile-layout.spec.ts`

**Interfaces:**
- Produces: `checkOutput(dir: string): string[]` returns violations: banned strings (Global Constraints), `href="#"`, pages with ≠1 `<h1>`, `<img>` without alt, and pages without a canonical tag.

- [ ] **Step 1: Write the failing tests:**
  - `static-html.test.ts`: `out/index.html` contains `465`, `5.0`, the hero H1 text, `wa.me/8801835927634` and `fiverr.com/jashedulislam`. `checkOutput('out')` returns `[]`.
  - `smoke.spec.ts`: every sitemap URL returns 200 and has a title and an H1.
  - `a11y.spec.ts`: axe finds 0 serious or critical violations on every sitemap URL.
  - `mobile-layout.spec.ts`, at 320×640 on `/`, `/contact/` and `/free-listing-audit/`:
    - `document.documentElement.scrollWidth <= 320`
    - after scrolling to the submit button, its bounding box does not intersect the `MobileCtaBar` box
- [ ] **Step 2:** Run `npm run build && npx vitest run tests/build && npx playwright test`. Expected: FAIL until fixed.
- [ ] **Step 3:** Implement `check-output.ts` and wire it to `postbuild`. Fix every violation found.
- [ ] **Step 4:** Run `npx linkinator out --recurse --skip "^(?!http://localhost)"` against `serve out`, then a second pass over external links in the proof and reviews. Expected: 0 broken links.
- [ ] **Step 5:** Run `scripts/lighthouse.ts` (lighthouse 13.6.0, mobile preset) on the 4 gate URLs. Expected: SEO 100, Accessibility 100, Best Practices 100, Performance ≥95. Fix and re-run until the gates are met.
- [ ] **Step 6:** Run the `searchfit-seo:seo-audit` skill over the local build and fix every high-severity item. Validate the JSON-LD from 3 pages in the Schema.org validator.
- [ ] **Step 7:** Run `npm audit --audit-level=high`. Expected: 0 issues.
- [ ] **Step 8: Commit.** `git commit -m "test: output gates, e2e, a11y, mobile layout, lighthouse"`

### Task 13: Staging deploy, owner sign-off and launch

This task is outward-facing. **Every step that touches the live server needs an explicit owner yes in chat.**

**Files:** `docs/deploy.md` (create)

- [ ] **Step 1:** Write `docs/deploy.md`:
  - build steps (`npm ci && npm run build`)
  - upload `out/` contents (including `.htaccess`) through cPanel File Manager as a zip and extract, or over FTP
  - the backup step
  - the rollback step (restore the backup zip)
  - Search Console and Bing Webmaster steps: verify, submit `sitemap.xml`, watch Coverage for 301s
  - the monthly proof re-check routine
- [ ] **Step 2:** With the owner's OK, create the subdomain `new.3s-soft.com` in cPanel and upload `out/`. Use a staging build with the env `NEXT_PUBLIC_NOINDEX=1`, which makes `buildMetadata` emit noindex.
- [ ] **Step 3:** On staging, verify:
  - `curl -sI https://new.3s-soft.com/services/graphic-design` → `301` to `/services/amazon-a-plus-content/`
  - the 404 page works
  - HTTPS is forced
  - one Formspree test arrives
  - GA4 DebugView shows `whatsapp_click` and `audit_submit` with `utm_source=test`
- [ ] **Step 4:** Send the owner the staging link and the list of open items from spec §13. **Stop until they sign off.**
- [ ] **Step 5:** With the owner's OK:
  - Download a zip backup of the current `public_html`.
  - Upload the production build (without `NEXT_PUBLIC_NOINDEX`).
  - Re-run the Step 3 checks on `https://3s-soft.com`.
- [ ] **Step 6:** Run the attribution check, then open a PR `redesign-nextjs` → `main` with the owner's OK:
  ```bash
  git log main..HEAD --format=%B | grep -i "Co-Authored-By\|Generated with"   # must print nothing
  ```
- [ ] **Step 7: Commit.** `git commit -m "docs: deploy, rollback and proof re-check runbook"`

---

## Spec coverage check

| Spec section | Task |
|---|---|
| §2 decisions 1, 2, 5, 8 (offer, domains, CTA, ToS wording) | 3, 4, 5, 9; banned strings in 12 |
| §2 decisions 3, 4 (portfolio, team) | 6, 7 |
| §2 decision 6 (static export, cPanel) | 1, 11, 13 |
| §2 decision 7 (blog) | 8, 11 |
| §6 IA, every route | 4–10 |
| §7 visual & UX | 3, 4 (checkpoint), 12 |
| §8 latest packages | 1, 12 (audit) |
| §8 tech (content as data, forms, analytics, SEO, hosting) | 2, 3, 9, 10, 11 |
| §9 quality gates | 12 |
| §10 skills | named per task |
| §13 open items | 2 (booking), 5 (prices), 6 (client names), 7 (photo), 13 (sign-off) |
