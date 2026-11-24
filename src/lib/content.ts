// CMS links may point to local pages or explicit web/contact URLs, never scripts.
export function safeContentHref(value: string | null | undefined, fallback: string): string {
  if (!value) return fallback
  const href = value.trim()
  if (/[\u0000-\u0020\u007f\\]/.test(href)) return fallback
  if ((href.startsWith('/') && !href.startsWith('//')) || href.startsWith('#')) return href
  try {
    const url = new URL(href)
    return ['https:', 'http:', 'mailto:', 'tel:'].includes(url.protocol) ? href : fallback
  } catch {
    return fallback
  }
}

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}
