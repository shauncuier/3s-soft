import type { MetadataRoute } from 'next'
import { siteRoutes, SITE_URL } from '@/lib/seo'
import { pageLastModified } from '@/lib/lastmod'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return siteRoutes().map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: pageLastModified(path),
    changeFrequency: path === '/' || path.startsWith('/blog') ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path.startsWith('/services/') || path === '/free-listing-audit/' ? 0.9 : 0.7,
  }))
}
