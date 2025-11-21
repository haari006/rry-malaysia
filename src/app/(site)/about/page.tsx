import { Eye, Target, Users } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-soft-grey py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-6">About Us</h1>
          <p className="text-xl text-deep-grey max-w-3xl mx-auto">
            We are a dynamic trading company specializing in heavy machinery and scrap metal, committed to quality and trust.
          </p>
        </div>
      </div>

      {/* Who We Are */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-charcoal mb-6">Who We Are</h2>
              <div className="space-y-4 text-deep-grey leading-relaxed">
                <p>
                  With years of experience in machinery sourcing and metal recycling, we provide reliable solutions to contractors, traders, recyclers, and industrial clients across Malaysia and abroad.
                </p>
                <p>
                  Our core strength lies in our wide sourcing network, transparent business approach, and commitment to quality. Whether you need an excavator, a reconditioned hydraulic pump, or premium-grade scrap copper, we deliver with consistency and trust.
                </p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-3xl h-[400px] flex items-center justify-center">
              {/* Placeholder for About Image */}
              <Users size={64} className="text-gray-300" />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-soft-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Vision */}
            <div className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-royal-blue mb-6">
                <Eye size={28} />
              </div>
              <h2 className="text-2xl font-bold text-charcoal mb-4">Our Vision</h2>
              <p className="text-deep-grey leading-relaxed">
                To become a leading regional supplier of heavy machinery and high-quality scrap metals, recognized for reliability, fairness, and sustainable trading practices.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-royal-blue mb-6">
                <Target size={28} />
              </div>
              <h2 className="text-2xl font-bold text-charcoal mb-4">Our Mission</h2>
              <ul className="space-y-3 text-deep-grey">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-royal-blue rounded-full mt-2 mr-3 flex-shrink-0" />
                  To supply quality used machinery and spare parts at competitive prices.
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-royal-blue rounded-full mt-2 mr-3 flex-shrink-0" />
                  To provide consistent and well-graded scrap metals for local and international buyers.
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-royal-blue rounded-full mt-2 mr-3 flex-shrink-0" />
                  To build long-term relationships based on trust, transparency, and customer satisfaction.
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-royal-blue rounded-full mt-2 mr-3 flex-shrink-0" />
                  To promote sustainable recycling practices.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
