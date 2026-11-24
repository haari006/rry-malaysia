import ContentIcon from '@/components/ContentIcon'
import { getHomeContent, getServices, defaultServices, serviceAnchor } from '@/sanity/lib/content'
import { safeContentHref } from '@/lib/content'
import Hero from '@/components/Hero'
import ServiceCard from '@/components/ServiceCard'
import ProductActions from '@/components/product/ProductActions'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { Calculator, Recycle, TrendingUp, Truck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const revalidate = 60

async function getFeaturedProducts() {
  return client.fetch(`
    *[_type == "product"] | order(_createdAt desc)[0...3] {
      _id,
      title,
      "slug": slug.current,
      mainImage,
      price
    }
  `, {}, { next: { revalidate: 60 } })
}

export default async function Home() {
  const [featuredProducts, content, publishedServices] = await Promise.all([
    getFeaturedProducts(), getHomeContent(), getServices(),
  ])
  const services = publishedServices.length ? publishedServices : defaultServices
  const features = content.features.length ? content.features : [
    { _id: 'network', title: 'Trusted Network', description: 'Wide sourcing network across Malaysia and abroad.', icon: 'ShieldCheck' },
    { _id: 'quality', title: 'Quality Assurance', description: 'Rigorous inspection and grading processes.', icon: 'ShieldCheck' },
    { _id: 'pricing', title: 'Fair Pricing', description: 'Transparent and competitive market rates.', icon: 'ShieldCheck' },
  ]
  const cta = content.cta
  const ctaTheme = cta?.backgroundColor === 'royal-blue' ? 'bg-royal-blue text-white'
    : cta?.backgroundColor === 'charcoal' ? 'bg-charcoal text-white' : 'bg-white text-charcoal'
  const ctaDark = cta?.backgroundColor === 'royal-blue' || cta?.backgroundColor === 'charcoal'

  return (
    <div className="flex flex-col min-h-screen">
      <Hero content={content.hero} />

      {/* Highlights Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">Our Core Services</h2>
            <p className="text-deep-grey max-w-2xl mx-auto">
              We provide comprehensive solutions for industrial needs, from heavy equipment sourcing to sustainable metal recycling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <ServiceCard
                key={service._id}
                title={service.title || 'Our Service'}
                description={service.description || ''}
                icon={service.category === 'scrap' ? <Recycle size={24} /> : <Truck size={24} />}
                href={`/services#${encodeURIComponent(serviceAnchor(service))}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Marketplace Section (New) */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">Featured Listings</h2>
              <p className="text-deep-grey max-w-xl">
                Explore our latest arrivals in auto parts and machinery.
              </p>
            </div>
            <Link href="/marketplace" className="hidden sm:inline-flex items-center font-medium text-royal-blue hover:text-blue-700 transition-colors">
              View All Marketplace <ArrowRightIcon className="ml-2 w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product: any) => (
                <article
                  key={product._id}
                  className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <Link
                    href={`/marketplace/${product.slug}`}
                    aria-label={`View details for ${product.title}`}
                    className="block"
                  >
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 mb-4 group">
                      {product.mainImage && (
                        <Image
                          src={urlFor(product.mainImage).url()}
                          alt={product.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors mb-2">
                      {product.title}
                    </h3>
                  </Link>
                  <p className="text-blue-600 font-bold mb-4">
                    {product.price ? `RM ${product.price.toLocaleString()}` : 'Contact for Price'}
                  </p>
                  <ProductActions
                    product={{
                      productId: product._id,
                      title: product.title,
                      slug: product.slug,
                      price: product.price,
                      imageUrl: product.mainImage ? urlFor(product.mainImage).url() : undefined,
                    }}
                    showViewDetails
                  />
                </article>
              ))
            ) : (
              <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
                <p className="text-gray-500">No products listed yet. Check back soon!</p>
              </div>
            )}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/marketplace" className="text-royal-blue font-medium">View All &rarr;</Link>
          </div>
        </div>
      </section>

      {/* Tools & Calculators Section (New) */}
      <section className="py-24 bg-royal-blue text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 transform translate-x-1/4" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Smart Industrial Tools</h2>
            <p className="text-blue-100 max-w-2xl mx-auto text-lg">
              Use our instant calculators to get real-time estimates and measure your environmental impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link href="/calculator/scrap" className="group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 hover:bg-white/20 transition-all duration-300">
              <div className="absolute top-8 right-8 text-blue-300 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all">
                <Calculator size={48} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Scrap Metal Quote</h3>
              <p className="text-blue-100 mb-6 pr-12">
                Get instant price estimates based on live market rates for copper, steel, and more.
              </p>
              <span className="inline-flex items-center text-white font-bold group-hover:underline">
                Calculate Now &rarr;
              </span>
            </Link>

            <Link href="/calculator/carbon" className="group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 hover:bg-white/20 transition-all duration-300">
              <div className="absolute top-8 right-8 text-green-300 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all">
                <TrendingUp size={48} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Carbon Footprint</h3>
              <p className="text-blue-100 mb-6 pr-12">
                Estimate your CO₂ emissions and see how recycling can offset your impact.
              </p>
              <span className="inline-flex items-center text-white font-bold group-hover:underline">
                Check Impact &rarr;
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-soft-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-6">Why Choose RRY Malaysia?</h2>
              <p className="text-deep-grey mb-8 text-lg leading-relaxed">
                With years of experience in the industry, we have built a reputation for reliability, transparency, and excellence. We understand the complexities of machinery sourcing and metal trading.
              </p>

              <div className="space-y-6">
                {features.map((item) => (
                  <div key={item._id} className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-royal-blue mt-1">
                      <ContentIcon name={item.icon} />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold text-charcoal">{item.title}</h3>
                      <p className="text-deep-grey">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              {/* Placeholder for "Why Us" image - reusing machinery image for now but styled differently */}
              <Image
                src="/hero-machinery.png"
                alt="Industrial Excellence"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-royal-blue/20 mix-blend-overlay" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-24 ${ctaTheme}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{cta?.title || "Ready to work with us?"}</h2>
          <p className={`text-lg max-w-2xl mx-auto mb-10 ${ctaDark ? "text-white" : "text-deep-grey"}`}>
            {cta?.description || "Whether you're looking to buy machinery or sell scrap metal, we are here to provide the best solutions for your business."}
          </p>
          <Link
            href={safeContentHref(cta?.buttonLink, "/contact")}
            className={`inline-flex items-center px-10 py-5 rounded-full font-bold text-lg transition-colors shadow-lg ${ctaDark ? "bg-white text-royal-blue hover:bg-gray-100" : "bg-royal-blue text-white hover:bg-royal-blue-hover"}`}
          >
            {cta?.buttonText || "Get in Touch"}
          </Link>
        </div>
      </section>
    </div>
  )
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}
