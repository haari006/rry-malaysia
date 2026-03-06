import type { MetadataRoute } from 'next'

const SITE_URL = 'https://rrymalaysia.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio', '/api/'],
      },
      {
        userAgent: 'GPTBot',
        allow: ['/about', '/services', '/marketplace', '/contact', '/calculator/'],
        disallow: ['/studio', '/api/'],
      },
      {
        userAgent: 'ClaudeBot',
        allow: ['/about', '/services', '/marketplace', '/contact', '/calculator/'],
        disallow: ['/studio', '/api/'],
      },
      {
        userAgent: 'PerplexityBot',
        allow: ['/about', '/services', '/marketplace', '/contact', '/calculator/'],
        disallow: ['/studio', '/api/'],
      },
      {
        userAgent: 'Google-Extended',
        allow: ['/about', '/services', '/marketplace', '/contact', '/calculator/'],
        disallow: ['/studio', '/api/'],
      },
      {
        userAgent: 'Applebot-Extended',
        allow: ['/about', '/services', '/marketplace', '/contact', '/calculator/'],
        disallow: ['/studio', '/api/'],
      },
      {
        userAgent: 'Bytespider',
        allow: ['/about', '/services', '/marketplace', '/contact', '/calculator/'],
        disallow: ['/studio', '/api/'],
      },
      {
        userAgent: 'CCBot',
        allow: ['/about', '/services', '/marketplace', '/contact', '/calculator/'],
        disallow: ['/studio', '/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
