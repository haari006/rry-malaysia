interface QuoteRate {
  currentPrice: number
  unit: string
}

// Weight is entered in the rate's displayed unit (kg or metric tonnes).
export function calculateScrapQuote(weight: number, rate?: QuoteRate): number | null {
  if (!rate || !['kg', 'ton'].includes(rate.unit) || !Number.isFinite(weight) || weight <= 0 ||
      !Number.isFinite(rate.currentPrice) || rate.currentPrice < 0) return null

  const total = weight * rate.currentPrice
  return Number.isFinite(total) ? total : null
}
