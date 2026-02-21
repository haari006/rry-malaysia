'use client'

import { ShoppingCart } from 'lucide-react'
import { useCart } from './CartProvider'

export default function CartButton() {
  const { itemCount, openCart } = useCart()

  return (
    <button
      onClick={openCart}
      className="relative inline-flex items-center justify-center h-10 w-10 rounded-full border border-gray-200 text-deep-grey hover:text-royal-blue hover:border-royal-blue transition-colors"
      aria-label="Open cart"
      type="button"
    >
      <ShoppingCart size={18} />
      {itemCount > 0 && (
        <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 rounded-full bg-royal-blue text-white text-[11px] font-bold flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </button>
  )
}
