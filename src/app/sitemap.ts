import type { MetadataRoute } from 'next'
import { siteRoutes, SITE_URL } from '@/lib/seo'

export const dynamic = 'force-static'

const LAST_MODIFIED = '2026-11-20'

export default function sitemap(): MetadataRoute.Sitemap {
  return siteRoutes().map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: path === '/' || path.startsWith('/blog') ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path.startsWith('/services/') || path === '/free-listing-audit/' ? 0.9 : 0.7,
  }))
}
