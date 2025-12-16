import CarbonCalculator from '@/components/CarbonCalculator'

export default function CarbonCalculatorPage() {
    return (
        <div className="bg-gray-50 min-h-screen py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Carbon Footprint Calculator</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Understand your environmental impact and learn how recycling can help reduce your carbon footprint.
                    </p>
                </div>

                <CarbonCalculator />

                <div className="mt-16 text-center text-gray-400 text-sm">
                    <p>Calculations are estimates based on regional averages for Malaysia.</p>
                </div>
            </div>
        </div>
    )
}
