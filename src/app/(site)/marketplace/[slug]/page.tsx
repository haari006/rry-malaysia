import { pageMetadata, SITE_URL } from '@/lib/seo'
import type { Metadata } from 'next'
import ProductActions from '@/components/product/ProductActions'
import { getCompanyInfo } from '@/sanity/lib/content'
import { serializeJsonLd } from '@/lib/content'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const revalidate = 60

interface Product {
  _id: string
  title: string
  slug: string
  mainImage: import('@sanity/image-url/lib/types/types').SanityImageSource | null
  price?: number
  description?: string
  categories?: string[]
}

async function getProduct(slug: string): Promise<Product | null> {
  return client.fetch(
    `
    *[_type == "product" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      mainImage,
      price,
      description,
      categories
    }
  `,
    { slug },
    { next: { revalidate: 60 } }
  )
}

type ProductPageProps = { params: Promise<{ slug: string }> }

function productDescription(product: Product): string {
  return product.description?.trim() ||
    `${product.title} available from RRY Malaysia. Contact our team for current availability, condition notes, and delivery support in Malaysia.`
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) return { title: 'Product not found', robots: { index: false, follow: false } }
  const description = productDescription(product)
  const image = product.mainImage ? urlFor(product.mainImage).width(1200).height(630).url() : undefined
  return pageMetadata(product.title, description.slice(0, 160), `/marketplace/${product.slug}`, image)
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const [product, company] = await Promise.all([getProduct(slug), getCompanyInfo()])

  if (!product) {
    notFound()
  }

  const productUrl = `${SITE_URL}/marketplace/${product.slug}`
  const normalizedDescription = productDescription(product)

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: normalizedDescription,
    ...(product.mainImage ? { image: [urlFor(product.mainImage).url()] } : {}),
    sku: product._id,
    brand: {
      '@type': 'Organization',
      name: company.name,
    },
    category: product.categories?.join(', '),
    ...(typeof product.price === 'number' && Number.isFinite(product.price) && product.price > 0 ? {
      offers: {
        '@type': 'Offer',
        url: productUrl,
        priceCurrency: 'MYR',
        price: product.price,
        seller: { '@type': 'Organization', name: company.name, telephone: company.phone },
      },
    } : {}),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://rrymalaysia.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Marketplace',
        item: 'https://rrymalaysia.com/marketplace',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.title,
        item: productUrl,
      },
    ],
  }

  return (
    <div className="bg-white min-h-screen py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/marketplace" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors">
          &larr; Back to Marketplace
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-square shadow-sm">
            {product.mainImage ? (
              <Image
                src={urlFor(product.mainImage).url()}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">No Image Available</div>
            )}
          </div>

          <div className="flex flex-col h-full">
            <div className="mb-2">
              {product.categories?.map((cat) => (
                <span key={cat} className="inline-block mr-2 mb-2 text-sm font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-700 capitalize">
                  {cat.replace('-', ' ')}
                </span>
              ))}
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.title}</h1>

            <div className="text-3xl font-bold text-blue-600 mb-8">
              {product.price ? `RM ${product.price.toLocaleString()}` : 'Price on Ask'}
            </div>

            <div className="prose prose-lg text-gray-600 mb-8">
              <p>{normalizedDescription}</p>
              <p>
                Request detailed photos, usage condition, and lead-time confirmation before purchase.
                Our team can also assist with related part sourcing if you are buying for fleet maintenance.
              </p>
            </div>

            <div className="mt-auto pt-8 border-t border-gray-100">
              <p className="text-sm text-gray-500 mb-4">Interested? Ask via WhatsApp or add this product to cart and submit your order.</p>
              <ProductActions
                product={{
                  productId: product._id,
                  title: product.title,
                  slug: product.slug,
                  price: product.price,
                  imageUrl: product.mainImage ? urlFor(product.mainImage).url() : undefined,
                }}
                fullWidth
              />
              <div className="mt-5 text-sm space-y-2">
                <Link href="/services#machinery" className="text-blue-600 hover:text-blue-800 block">Need bulk or project-based sourcing? View machinery services.</Link>
                <Link href="/contact" className="text-blue-600 hover:text-blue-800 block">Prefer direct coordination? Contact our team.</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
