import ScrapCalculator from '@/components/ScrapCalculator'
import { client } from '@/sanity/lib/client'

async function getData() {
    return client.fetch(`
    {
      "rates": *[_type == "scrapRate"] | order(materialName asc) {
        _id,
        materialName,
        currentPrice,
        unit,
        trend
      },
      "companyInfo": *[_type == "companyInfo"][0] {
        whatsapp
      }
    }
  `)
}

export const revalidate = 3600 // Revalidate every hour

export default async function ScrapCalculatorPage() {
    const { rates, companyInfo } = await getData()
    const whatsappNumber = companyInfo?.whatsapp || '60123456789'

    return (
        <div className="bg-gray-50 min-h-screen py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Scrap Metal Calculator</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Get an instant estimate for your scrap metal. Our prices are updated daily to reflect market rates.
                    </p>
                </div>

                <ScrapCalculator rates={rates || []} whatsappNumber={whatsappNumber} />

                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="p-6 bg-white rounded-xl shadow-sm">
                        <div className="text-4xl mb-4">⚖️</div>
                        <h3 className="font-bold text-lg mb-2">Accurate Weighing</h3>
                        <p className="text-gray-500">We use certified industrial scales for precision.</p>
                    </div>
                    <div className="p-6 bg-white rounded-xl shadow-sm">
                        <div className="text-4xl mb-4">💰</div>
                        <h3 className="font-bold text-lg mb-2">Instant Cash</h3>
                        <p className="text-gray-500">Get paid immediately upon confirmation of goods.</p>
                    </div>
                    <div className="p-6 bg-white rounded-xl shadow-sm">
                        <div className="text-4xl mb-4">♻️</div>
                        <h3 className="font-bold text-lg mb-2">Eco-Friendly</h3>
                        <p className="text-gray-500">Official recycling partner ensuring zero waste.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
