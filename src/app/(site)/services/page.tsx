import { CheckCircle, Recycle, Truck } from 'lucide-react'

export default function ServicesPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-soft-grey py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-6">Our Services</h1>
          <p className="text-xl text-deep-grey max-w-3xl mx-auto">
            Comprehensive solutions for heavy machinery trading and scrap metal recycling.
          </p>
        </div>
      </div>

      {/* Heavy Machinery */}
      <section id="machinery" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-16">
            <div className="md:w-1/3">
              <div className="sticky top-24">
                <div className="w-16 h-16 bg-royal-blue rounded-2xl flex items-center justify-center text-white mb-6">
                  <Truck size={32} />
                </div>
                <h2 className="text-3xl font-bold text-charcoal mb-4">Heavy Machinery Trading</h2>
                <p className="text-deep-grey mb-6">
                  We specialize in sourcing, trading, and supplying a wide range of construction and earth-moving machines. We ensure proper inspection, fair pricing, and smooth delivery.
                </p>
              </div>
            </div>
            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                'Excavators',
                'Earthmovers',
                'Tipper Trucks',
                'Flatbed Trucks',
                'Prime Movers',
                'Used Engines',
                'Reconditioned Engines',
                'Hydraulic Pumps',
                'Swing Motors',
                'Final Drives',
                'Undercarriage Parts'
              ].map((item) => (
                <div key={item} className="bg-gray-50 p-6 rounded-xl flex items-center hover:bg-blue-50 transition-colors">
                  <CheckCircle size={20} className="text-royal-blue mr-3" />
                  <span className="font-medium text-charcoal">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="h-px bg-gray-100 max-w-7xl mx-auto" />

      {/* Scrap Metal */}
      <section id="scrap" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-16">
            <div className="md:w-1/3">
              <div className="sticky top-24">
                <div className="w-16 h-16 bg-royal-blue rounded-2xl flex items-center justify-center text-white mb-6">
                  <Recycle size={32} />
                </div>
                <h2 className="text-3xl font-bold text-charcoal mb-4">Scrap Metal Trading</h2>
                <p className="text-deep-grey mb-6">
                  We trade both ferrous and non-ferrous scrap metals, offering consistent grading and competitive pricing. We ensure accurate grading, clean materials, and fast logistics.
                </p>
              </div>
            </div>
            <div className="md:w-2/3 space-y-12">
              {/* Non-Ferrous */}
              <div>
                <h3 className="text-xl font-bold text-charcoal mb-6 border-b pb-2">Non-Ferrous Scrap</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    'A1 Copper', 'A2 Copper', 'A Copper', 'B Copper', 'Brass Scrap',
                    'Housing Copper Wire', 'Aluminium (General)', 'Aluminium Angle',
                    'Aluminium Rim', 'Aluminium Wire', 'Brake Aluminium', 'Motor Coil', 'Used Batteries'
                  ].map((item) => (
                    <div key={item} className="flex items-center text-deep-grey">
                      <span className="w-2 h-2 bg-royal-blue rounded-full mr-3" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Ferrous */}
              <div>
                <h3 className="text-xl font-bold text-charcoal mb-6 border-b pb-2">Ferrous Scrap</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    'Steel 304', 'Steel 202', 'Steel 316', 'SARI 8.70',
                    'Owning 3.50', 'General Heavy Steel', 'Light Steel'
                  ].map((item) => (
                    <div key={item} className="flex items-center text-deep-grey">
                      <span className="w-2 h-2 bg-charcoal rounded-full mr-3" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
