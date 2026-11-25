import type { Metadata } from 'next'

export const SITE_URL = 'https://rrymalaysia.com'

export function pageMetadata(title: string, description: string, path: string, image = '/hero-bg.png'): Metadata {
  const url = new URL(path, SITE_URL).toString()
  const imageUrl = new URL(image, SITE_URL).toString()

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      locale: 'en_MY',
      siteName: 'RRY Malaysia',
      title: `${title} | RRY Malaysia`,
      description,
      url,
      images: [{ url: imageUrl, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | RRY Malaysia`,
      description,
      images: [imageUrl],
    },
  }
}
