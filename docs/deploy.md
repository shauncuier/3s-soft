# Deploying 3s-soft.com to cPanel

The site is a static export. The build writes plain files to `out/` (HTML, CSS, JS, images, `.htaccess`). Nothing runs on the server except Apache.

## 1. Build

```bash
npm ci
npm run build          # tokens → proof check → .htaccess → next build → flatten prefetch → output gate
npm test               # unit + build checks
npm run test:e2e       # serves out/ on :4321 and runs Playwright + axe
```

`npm run build` fails if any of these gates fail:
- a proof number or review without a source
- a banned claim in the built HTML
- a page without exactly one `<h1>`
- an image without alt text
- a page without a canonical tag

**Staging build** (search engines told not to index):

```bash
NEXT_PUBLIC_NOINDEX=1 npm run build
```

On Windows PowerShell: `$env:NEXT_PUBLIC_NOINDEX='1'; npm run build`

## 2. Stage first (new.3s-soft.com)

1. In cPanel, open **Domains** and create the subdomain `new.3s-soft.com`, pointing to a new folder such as `public_html_new`.
2. Run a staging build (above), then zip the **contents** of `out/`, including the hidden `.htaccess`:

   ```bash
   cd out && zip -r ../site.zip . && cd ..
   ```

3. Open **File Manager**, go to the subdomain folder, upload `site.zip` and choose **Extract**. Delete the zip afterwards.
4. Staging `.htaccess` note: the generated file redirects every host to `https://3s-soft.com`. On staging, comment out the two `RewriteCond … HTTPS/www` lines and the `RewriteRule ^ https://3s-soft.com…` line. Otherwise staging bounces to the live site.

### Staging checks

| Check | How | Expect |
|---|---|---|
| Pages load | open `/`, `/services/`, a case study, `/reviews/`, `/free-listing-audit/` | 200, styled |
| 301s | `curl -sI https://new.3s-soft.com/services/graphic-design` | `301` → `/services/amazon-a-plus-content/` |
| Trailing slash | `curl -sI https://new.3s-soft.com/reviews` | `301` → `/reviews/` |
| 404 | open `/no-such-page/` | branded 404 page |
| Forms | send one audit request | arrives in the Formspree inbox |
| Analytics | allow analytics, click WhatsApp, use GA4 DebugView | `whatsapp_click` event with `utm_source` when opened from a `?utm_source=test` link |
| Speed | [PageSpeed Insights](https://pagespeed.web.dev/) on `/`, one service page, one case study, `/free-listing-audit/` (mobile) | target: Performance ≥ 95, Accessibility 100, Best Practices 100, SEO 100 |
| Noindex | view source on staging | `<meta name="robots" content="noindex, nofollow">` |

## 3. Go live

1. **Back up** the current site: in File Manager, select everything in `public_html`, **Compress** it to `backup-YYYY-MM-DD.zip`, and download it.
2. Run a production build without `NEXT_PUBLIC_NOINDEX`.
3. Empty `public_html`, keeping `.well-known/` and any cPanel-managed files. Upload the new `site.zip` and extract it.
4. Re-run the staging checks on `https://3s-soft.com`.
5. **Google Search Console:**
   - Submit `https://3s-soft.com/sitemap.xml`.
   - Use **URL Inspection** on the homepage.
   - Watch **Pages → Redirect** and **Not found** for two weeks.
6. **Bing Webmaster Tools:** submit the same sitemap.

## 4. Roll back

Empty `public_html`, then upload and extract the `backup-YYYY-MM-DD.zip` from step 3.1. The old site has no server code, so this restores it completely.

## 5. Monthly upkeep

- Re-check the Fiverr and Upwork numbers. Update `src/content/proof.ts` and `src/content/reviews.ts` (value and `checkedOn`), rebuild and redeploy.
- Add new real reviews verbatim to `src/content/reviews.ts`, with their source URL.
- Run `npm audit`, and `npm outdated` for package updates.
