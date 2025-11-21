'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative h-[90vh] flex items-center overflow-hidden bg-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.png"
          alt="RRY Malaysia Hero Background"
          width={1920}
          height={1080}
          className="object-cover w-full h-full"
          priority
          quality={100}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl bg-white/60 backdrop-blur-xs p-8 md:p-12 rounded-3xl border border-white/40 shadow-xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-charcoal mb-8 leading-tight tracking-tight">
            Your Trusted Partner in <br />
            <span className="text-royal-blue">Heavy Machinery</span> & <span className="text-royal-blue">Scrap Metal</span>
          </h1>
          <p className="text-xl md:text-2xl text-deep-grey mb-10 leading-relaxed max-w-2xl font-light">
            Reliable machinery, premium scrap materials, and trusted industry expertise — all under one roof.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/services"
              className="inline-flex items-center px-8 py-4 bg-royal-blue text-white rounded-full font-medium hover:bg-royal-blue-hover transition-all shadow-lg hover:shadow-royal-blue/20 transform hover:-translate-y-1 duration-200 text-lg"
            >
              Explore Services <ArrowRight className="ml-2" size={20} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-white/80 backdrop-blur-sm text-royal-blue border border-white/50 rounded-full font-medium hover:bg-white transition-all shadow-sm hover:shadow-md text-lg"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
