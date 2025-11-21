'use client'

import Hero from '@/components/Hero'
import ServiceCard from '@/components/ServiceCard'
import { Recycle, ShieldCheck, Truck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />

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
            <ServiceCard
              title="Heavy Machinery Trading"
              description="Sourcing and supplying high-quality used and reconditioned construction machinery, including excavators, earthmovers, and spare parts."
              icon={<Truck size={24} />}
              href="/services#machinery"
            />
            <ServiceCard
              title="Scrap Metal Trading"
              description="Competitive pricing and consistent grading for ferrous and non-ferrous scrap metals, ensuring sustainable recycling practices."
              icon={<Recycle size={24} />}
              href="/services#scrap"
            />
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
                {[
                  { title: 'Trusted Network', desc: 'Wide sourcing network across Malaysia and abroad.' },
                  { title: 'Quality Assurance', desc: 'Rigorous inspection and grading processes.' },
                  { title: 'Fair Pricing', desc: 'Transparent and competitive market rates.' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-royal-blue mt-1">
                      <ShieldCheck size={20} />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold text-charcoal">{item.title}</h3>
                      <p className="text-deep-grey">{item.desc}</p>
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
      <section className="py-24 bg-royal-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to work with us?</h2>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-10">
            Whether you're looking to buy machinery or sell scrap metal, we are here to provide the best solutions for your business.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-10 py-5 bg-white text-royal-blue rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  )
}
