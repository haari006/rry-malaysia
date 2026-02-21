import ProductActions from '@/components/product/ProductActions'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'

interface Product {
  _id: string
  title: string
  slug: string
  mainImage: any
  price?: number
  categories?: string[]
}

async function getProducts(): Promise<Product[]> {
  return client.fetch(`
    *[_type == "product"] | order(_createdAt desc) {
      _id,
      title,
      "slug": slug.current,
      mainImage,
      price,
      categories
    }
  `)
}

export default async function MarketplacePage() {
  const products = await getProducts()

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Marketplace</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our selection of quality auto parts, scrap metal, and machinery. Contact us for the best prices.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">No products found at the moment. Please check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => {
              const imageUrl = product.mainImage ? urlFor(product.mainImage).url() : undefined

              return (
                <article
                  key={product._id}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col"
                >
                  <Link href={`/marketplace/${product.slug}`} className="relative h-64 w-full bg-gray-100 overflow-hidden group">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                    )}
                  </Link>

                  <div className="p-6 flex-1 flex flex-col">
                    {product.categories && product.categories.length > 0 && (
                      <div className="mb-2 flex flex-wrap gap-2">
                        {product.categories.slice(0, 2).map((cat) => (
                          <span key={cat} className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 capitalize">
                            {cat.replace('-', ' ')}
                          </span>
                        ))}
                      </div>
                    )}

                    <Link href={`/marketplace/${product.slug}`} className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                      {product.title}
                    </Link>

                    <div className="mt-auto pt-4 space-y-4">
                      <span className="text-lg font-bold text-gray-900 block">
                        {product.price ? `RM ${product.price.toLocaleString()}` : 'Contact for Price'}
                      </span>

                      <ProductActions
                        product={{
                          productId: product._id,
                          title: product.title,
                          slug: product.slug,
                          price: product.price,
                          imageUrl,
                        }}
                        showViewDetails
                      />
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
