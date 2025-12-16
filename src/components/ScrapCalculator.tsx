'use client'

import { useEffect, useState } from 'react'

interface ScrapRate {
    _id: string
    materialName: string
    currentPrice: number
    unit: string
    trend?: string
}

interface ScrapCalculatorProps {
    rates: ScrapRate[]
    whatsappNumber: string
}

export default function ScrapCalculator({ rates, whatsappNumber }: ScrapCalculatorProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(true)
    const [weight, setWeight] = useState<number | ''>('')
    const [selectedRateId, setSelectedRateId] = useState<string>('')
    const [location, setLocation] = useState('walk-in')
    const [estimatedValue, setEstimatedValue] = useState<number | null>(null)

    useEffect(() => {
        // Check time in Malaysia (UTC+8)
        const checkTime = () => {
            const now = new Date()
            // Create date object for MYT
            const mytDate = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kuala_Lumpur' }))
            const hour = mytDate.getHours()

            // Current logic: Open after 10am (hour >= 10). 
            // Assuming it stays open relevant hours (e.g. until midnight or next day 10am? Requirement says "update price ... either morning after 10am ... before that should be transferred")
            // Simplest interpretation: Before 10am is "Closed/Updating". 10am onwards is "Open".
            if (hour >= 10) {
                setIsOpen(true)
            } else {
                setIsOpen(false)
            }
            setLoading(false)
        }

        checkTime()
        // Optional: Set interval to check every minute? Not strictly necessary for "Instant" visit.
    }, [])

    const handleCalculate = () => {
        if (!weight || !selectedRateId) return

        const rate = rates.find(r => r._id === selectedRateId)
        if (!rate) return

        let price = rate.currentPrice
        const numericWeight = Number(weight)

        // 1. Quantity Bonus (> 1000kg -> +5%) - Example logic
        if (numericWeight > 1000 && rate.unit === 'kg') {
            price = price * 1.05
        }

        // 2. Location/Mode Logic
        // Walk-in: Standard
        // Pickup: Deduct transport fee? Or just "Subject to verification". 
        // Let's assume Pickup -10% for logistics cost if < 500kg, free if > 500kg?
        // Keeping it simple as per plan: just differentiate price.
        if (location === 'pickup') {
            if (numericWeight < 500) {
                price = price * 0.90 // 10% deduction
            }
        }

        setEstimatedValue(numericWeight * price)
    }

    const cleanNumber = whatsappNumber.replace(/\D/g, '')
    const closedMessage = encodeURIComponent("Hi, I'd like to get a scrap metal quote correctly. I know it's before 10am!")
    const closedWhatsappLink = `https://wa.me/${cleanNumber}?text=${closedMessage}`

    if (loading) return <div className="p-8 text-center">Loading Calculator...</div>

    return (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 max-w-2xl mx-auto">
            <div className="bg-blue-900 px-8 py-6 text-white text-center">
                <h2 className="text-2xl font-bold">Details & Quote Calculator</h2>
                <p className="opacity-80 text-sm">Real-time Scrap Metal Prices</p>
            </div>

            <div className="p-8">
                {!isOpen ? (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Market Pricing Updating...</h3>
                        <p className="text-gray-600 mb-6">
                            Our daily prices are updated every morning at 10:00 AM.
                            Please verify with us directly for the most accurate quote before 10 AM.
                        </p>
                        <a
                            href={closedWhatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-6 py-3 bg-[#25D366] text-white font-bold rounded-lg hover:bg-[#20bd5a] transition-colors"
                        >
                            Contact on WhatsApp
                        </a>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Select Material</label>
                            <select
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                value={selectedRateId}
                                onChange={(e) => {
                                    setSelectedRateId(e.target.value)
                                    setEstimatedValue(null)
                                }}
                            >
                                <option value="">-- Choose Material --</option>
                                {rates.map(rate => (
                                    <option key={rate._id} value={rate._id}>
                                        {rate.materialName} ({rate.trend === 'up' ? '📈' : rate.trend === 'down' ? '📉' : '➖'})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Weight</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        min="0"
                                        placeholder="0"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        value={weight}
                                        onChange={(e) => {
                                            setWeight(Number(e.target.value))
                                            setEstimatedValue(null)
                                        }}
                                    />
                                    <span className="absolute right-4 top-3 text-gray-400">
                                        {rates.find(r => r._id === selectedRateId)?.unit || 'kg'}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
                                <select
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    value={location}
                                    onChange={(e) => {
                                        setLocation(e.target.value)
                                        setEstimatedValue(null)
                                    }}
                                >
                                    <option value="walk-in">Self Delivery (Walk-in)</option>
                                    <option value="pickup">Request Pickup</option>
                                </select>
                            </div>
                        </div>

                        <button
                            onClick={handleCalculate}
                            disabled={!weight || !selectedRateId}
                            className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all transform active:scale-95 ${!weight || !selectedRateId
                                    ? 'bg-gray-300 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700 hover:-translate-y-1'
                                }`}
                        >
                            Calculate Live Quote
                        </button>

                        {estimatedValue !== null && (
                            <div className="mt-8 bg-green-50 rounded-xl p-6 border border-green-100 text-center animate-fade-in">
                                <p className="text-sm text-green-600 font-semibold uppercase tracking-wide mb-1">Estimated Value</p>
                                <div className="text-4xl font-extrabold text-green-700">
                                    RM {estimatedValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </div>
                                <p className="text-xs text-green-500 mt-2">
                                    *Preliminary quote. Final price subject to on-site grading.
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
