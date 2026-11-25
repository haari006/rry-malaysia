import { client } from '@/sanity/lib/client'
import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

export const revalidate = 60

interface ProductSitemapEntry {
  slug: string
  updatedAt: string
}

async function getProductEntries(): Promise<ProductSitemapEntry[]> {
  try {
    const entries = await client.fetch<ProductSitemapEntry[]>(`
      *[_type == "product" && defined(slug.current)] {
        "slug": slug.current, "updatedAt": _updatedAt
      }
    `, {}, { next: { revalidate: 60 } })
    return Array.isArray(entries) ? entries.filter(entry => entry.slug && entry.updatedAt) : []
  } catch (error) {
    console.error('Failed to fetch product entries for sitemap:', error)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/services`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/marketplace`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/contact`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/calculator/scrap`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/calculator/carbon`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/privacy-policy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/terms-of-service`, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const productEntries = await getProductEntries()

  const productRoutes: MetadataRoute.Sitemap = productEntries.map(({ slug, updatedAt }) => ({
    url: `${SITE_URL}/marketplace/${slug}`,
    lastModified: new Date(updatedAt),
    changeFrequency: 'daily',
    priority: 0.8,
  }))

  return [...staticRoutes, ...productRoutes]
}
