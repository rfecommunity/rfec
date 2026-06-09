import type { MetadataRoute } from 'next'

import { SITE_URL } from '@/lib/site'
import { getEventSlugs } from '@/sanity/lib/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getEventSlugs()

  const eventRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${SITE_URL}/eventos/${slug}`,
    changeFrequency: 'weekly',
    priority: 0.7
  }))

  return [
    { url: SITE_URL, changeFrequency: 'monthly', priority: 1 },
    {
      url: `${SITE_URL}/eventos`,
      changeFrequency: 'daily',
      priority: 0.8
    },
    ...eventRoutes
  ]
}
