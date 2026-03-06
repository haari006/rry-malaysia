import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'
import { COMPANY_INFO } from '@/lib/company'

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-soft-grey py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-6">Contact Us</h1>
          <p className="text-xl text-deep-grey max-w-3xl mx-auto">
            Get in touch with us for inquiries, quotes, or partnerships.
          </p>
        </div>
      </div>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-charcoal mb-8">Get In Touch</h2>
              <p className="text-deep-grey mb-8">
                Reach out for heavy machinery sourcing, used parts availability, scrap metal sales, and project-based industrial requirements. We respond with practical options and timeline guidance.
              </p>
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-royal-blue flex-shrink-0">
                    <Phone size={24} />
                  </div>
                  <div className="ml-6">
                    <h3 className="text-lg font-bold text-charcoal mb-1">Phone & WhatsApp</h3>
                    <p className="text-deep-grey">{COMPANY_INFO.phone}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-royal-blue flex-shrink-0">
                    <Mail size={24} />
                  </div>
                  <div className="ml-6">
                    <h3 className="text-lg font-bold text-charcoal mb-1">Email</h3>
                    <p className="text-deep-grey">{COMPANY_INFO.email}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-royal-blue flex-shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div className="ml-6">
                    <h3 className="text-lg font-bold text-charcoal mb-1">Address</h3>
                    <p className="text-deep-grey max-w-xs">
                      {COMPANY_INFO.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-royal-blue flex-shrink-0">
                    <Clock size={24} />
                  </div>
                  <div className="ml-6">
                    <h3 className="text-lg font-bold text-charcoal mb-1">Operating Hours</h3>
                    <p className="text-deep-grey">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-deep-grey">Saturday: 9:00 AM - 1:00 PM</p>
                    <p className="text-deep-grey">Sunday: Closed</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 p-6 bg-soft-grey rounded-2xl">
                <h3 className="text-lg font-bold text-charcoal mb-3">Before You Contact Us</h3>
                <ul className="space-y-2 text-deep-grey list-disc pl-5">
                  <li>Share product model, quantity, and preferred delivery window.</li>
                  <li>For scrap sales, include estimated weight and material type.</li>
                  <li>For machinery requests, include usage condition and budget range.</li>
                </ul>
                <div className="pt-4 space-y-2 text-sm">
                  <Link href="/services" className="text-royal-blue hover:text-blue-700 font-medium block">Review services before inquiry</Link>
                  <Link href="/marketplace" className="text-royal-blue hover:text-blue-700 font-medium block">Check live marketplace listings</Link>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-100 rounded-3xl h-[500px] w-full flex items-center justify-center overflow-hidden relative">
              <div className="absolute inset-0 bg-gray-200 animate-pulse" />
              <span className="relative z-10 text-gray-400 font-medium">Map Integration Placeholder</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
