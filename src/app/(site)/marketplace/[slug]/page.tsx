import ProductActions from '@/components/product/ProductActions'
import { COMPANY_INFO } from '@/lib/company'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface Product {
  _id: string
  title: string
  slug: string
  mainImage: any
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
    { slug }
  )
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  const productUrl = `https://rrymalaysia.com/marketplace/${product.slug}`
  const normalizedDescription =
    product.description ||
    `${product.title} available from RRY Malaysia. Contact our team for current availability, condition notes, and delivery support in Malaysia.`

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: normalizedDescription,
    image: product.mainImage ? [urlFor(product.mainImage).url()] : ['https://rrymalaysia.com/logo.png'],
    sku: product._id,
    brand: {
      '@type': 'Organization',
      name: 'RRY Malaysia',
    },
    category: product.categories?.join(', '),
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: 'MYR',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'RRY Malaysia',
        telephone: COMPANY_INFO.phone,
      },
      ...(product.price ? { price: product.price } : {}),
    },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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
