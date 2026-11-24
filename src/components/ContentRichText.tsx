import { PortableText, type PortableTextBlock, type PortableTextComponents } from 'next-sanity'
import { safeContentHref } from '@/lib/content'

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h1: ({ children }) => <h2 className="text-3xl font-bold">{children}</h2>,
    h2: ({ children }) => <h2 className="text-2xl font-bold">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-bold">{children}</h3>,
    h4: ({ children }) => <h4 className="text-lg font-bold">{children}</h4>,
    blockquote: ({ children }) => <blockquote className="border-l-4 border-royal-blue pl-4 italic">{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 space-y-2">{children}</ol>,
  },
  marks: {
    link: ({ value, children }) => {
      const href = safeContentHref(typeof value?.href === 'string' ? value.href : undefined, '')
      return href ? <a href={href} className="text-royal-blue underline">{children}</a> : <>{children}</>
    },
  },
}

export default function ContentRichText({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />
}
