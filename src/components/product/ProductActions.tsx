'use client'

import { useCart } from '@/components/cart/CartProvider'
import { buildWhatsAppLink, getProductInquiryMessage } from '@/lib/company'
import { MessageCircle, ShoppingCart } from 'lucide-react'
import Link from 'next/link'

interface ProductActionsProps {
  product: {
    productId: string
    title: string
    slug: string
    price?: number
    imageUrl?: string
  }
  showViewDetails?: boolean
  fullWidth?: boolean
}

export default function ProductActions({
  product,
  showViewDetails = false,
  fullWidth = false,
}: ProductActionsProps) {
  const { addItem, openCart } = useCart()

  const whatsappLink = buildWhatsAppLink(getProductInquiryMessage(product.title, product.slug))

  const addToCart = () => {
    addItem({
      productId: product.productId,
      title: product.title,
      slug: product.slug,
      price: product.price,
      imageUrl: product.imageUrl,
    })
    openCart()
  }

  return (
    <div className="space-y-2">
      <div className="group/actions flex items-center justify-between">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-transparent text-deep-grey opacity-0 transition-all duration-200 group-hover/actions:opacity-100 group-focus-within/actions:opacity-100 hover:border-[#25D366] hover:text-[#25D366] focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/40"
          aria-label={`Ask about ${product.title} on WhatsApp`}
          title="Ask on WhatsApp"
        >
          <MessageCircle size={18} />
          <span className="sr-only">WhatsApp</span>
        </a>
        <button
          type="button"
          onClick={addToCart}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-transparent text-deep-grey opacity-0 transition-all duration-200 group-hover/actions:opacity-100 group-focus-within/actions:opacity-100 hover:border-royal-blue hover:text-royal-blue focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-blue/40"
          aria-label={`Add ${product.title} to cart`}
          title="Add to Cart"
        >
          <ShoppingCart size={18} />
          <span className="sr-only">Add to Cart</span>
        </button>
      </div>
      {showViewDetails && (
        <Link
          href={`/marketplace/${product.slug}`}
          className="inline-flex items-center justify-center w-full px-4 py-2.5 rounded-lg font-semibold text-royal-blue border border-royal-blue hover:bg-blue-50 transition-colors"
        >
          View Details
        </Link>
      )}
    </div>
  )
}
