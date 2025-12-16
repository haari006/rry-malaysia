'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function CarbonCalculator() {
    const [inputs, setInputs] = useState({
        electricity: '', // kWh
        petrol: '',      // Liters
        waste: ''        // kg
    })
    const [result, setResult] = useState<number | null>(null)

    const handleCalculate = () => {
        // Emission Factors (Approximate for Malaysia/Regional context)
        // Electricity: ~0.6 kg CO2/kWh (Malaysia Grid ~0.5-0.7)
        // Petrol: ~2.3 kg CO2/Liter
        // General Waste: ~1.5 kg CO2/kg (Mixed landfill)

        const elec = Number(inputs.electricity) || 0
        const fuel = Number(inputs.petrol) || 0
        const waste = Number(inputs.waste) || 0

        const total =
            (elec * 0.6) +
            (fuel * 2.3) +
            (waste * 1.5)

        setResult(total)
    }

    return (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 max-w-2xl mx-auto">
            <div className="bg-green-800 px-8 py-6 text-white text-center">
                <h2 className="text-2xl font-bold">Carbon Footprint Estimator</h2>
                <p className="opacity-80 text-sm">Measure your environmental impact</p>
            </div>

            <div className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Electricity (kWh)</label>
                        <input
                            type="number"
                            placeholder="0"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
                            value={inputs.electricity}
                            onChange={e => {
                                setInputs({ ...inputs, electricity: e.target.value })
                                setResult(null)
                            }}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Petrol Usage (L)</label>
                        <input
                            type="number"
                            placeholder="0"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
                            value={inputs.petrol}
                            onChange={e => {
                                setInputs({ ...inputs, petrol: e.target.value })
                                setResult(null)
                            }}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Waste (kg)</label>
                        <input
                            type="number"
                            placeholder="0"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
                            value={inputs.waste}
                            onChange={e => {
                                setInputs({ ...inputs, waste: e.target.value })
                                setResult(null)
                            }}
                        />
                    </div>
                </div>

                <button
                    onClick={handleCalculate}
                    className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                    Calculate Emissions
                </button>

                {result !== null && (
                    <div className="mt-8 text-center animate-fade-in">
                        <p className="text-gray-600 mb-2">Estimated Monthly Carbon Footprint:</p>
                        <div className="text-5xl font-black text-green-800 mb-6">
                            {result.toFixed(2)} <span className="text-2xl font-medium text-gray-500">kg CO₂e</span>
                        </div>

                        <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                            <h3 className="font-bold text-blue-800 mb-2">Offset Impact with Recycling</h3>
                            <p className="text-blue-700 mb-4">
                                Did you know? Recycling <strong>1 TON</strong> of steel saves approx <strong>1.5 TONS</strong> of iron ore, 0.5 TONS of coal, and reduces CO₂ emissions by <strong>80%</strong> compared to mining.
                            </p>
                            <Link
                                href="/calculator/scrap"
                                className="inline-block px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Start Recycling Now &rarr;
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
