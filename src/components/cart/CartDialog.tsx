'use client'

import { buildWhatsAppLink, getCartInquiryMessage } from '@/lib/company'
import { Minus, Plus, Trash2, X } from 'lucide-react'
import { FormEvent, useMemo, useState } from 'react'
import { useCart } from './CartProvider'

interface FieldErrors {
  customerName?: string
  customerPhone?: string
  customerAddress?: string
  customerNotes?: string
  items?: string
  generic?: string
}

export default function CartDialog() {
  const {
    items,
    estimatedTotal,
    isCartOpen,
    closeCart,
    removeItem,
    updateQuantity,
    clearCart,
  } = useCart()

  const [showForm, setShowForm] = useState(false)
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [customerAddress, setCustomerAddress] = useState('')
  const [customerNotes, setCustomerNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errors, setErrors] = useState<FieldErrors>({})

  const totalItems = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items])
  const whatsappLink = useMemo(
    () => buildWhatsAppLink(getCartInquiryMessage(items.map(({ title, quantity }) => ({ title, quantity })))),
    [items]
  )

  if (!isCartOpen) {
    return null
  }

  const resetForm = () => {
    setCustomerName('')
    setCustomerPhone('')
    setCustomerAddress('')
    setCustomerNotes('')
    setErrors({})
    setSuccessMessage('')
    setShowForm(false)
  }

  const handleClose = () => {
    closeCart()
    resetForm()
  }

  const validateForm = () => {
    const nextErrors: FieldErrors = {}

    if (!customerName.trim()) nextErrors.customerName = 'Name is required.'
    if (!customerPhone.trim()) nextErrors.customerPhone = 'Phone is required.'
    if (!customerAddress.trim()) nextErrors.customerAddress = 'Address is required.'
    if (!customerNotes.trim()) nextErrors.customerNotes = 'Notes are required.'
    if (items.length === 0) nextErrors.items = 'Your cart is empty.'

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSuccessMessage('')

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: customerName.trim(),
          customerPhone: customerPhone.trim(),
          customerAddress: customerAddress.trim(),
          customerNotes: customerNotes.trim(),
          items: items.map((item) => ({
            productId: item.productId,
            productTitle: item.title,
            productSlug: item.slug,
            unitPrice: item.price,
            quantity: item.quantity,
          })),
          source: 'website',
        }),
      })

      const payload = await response.json()

      if (!response.ok) {
        setErrors(payload.errors || { generic: payload.error || 'Failed to submit order.' })
        return
      }

      setSuccessMessage(`Order submitted successfully. Order number: ${payload.orderNumber}`)
      clearCart()
    } catch {
      setErrors({ generic: 'Something went wrong. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4">
      <div className="bg-white w-full sm:max-w-2xl sm:rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-charcoal">Your Cart</h2>
          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 rounded-md text-gray-500 hover:text-gray-800 hover:bg-gray-100"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-5">
          {items.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-deep-grey">Your cart is empty.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.productId} className="border border-gray-100 rounded-xl p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-charcoal">{item.title}</p>
                      <p className="text-sm text-gray-500">/marketplace/{item.slug}</p>
                      <p className="text-sm font-medium text-royal-blue mt-1">
                        {typeof item.price === 'number' ? `RM ${item.price.toLocaleString()}` : 'Contact for Price'}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId)}
                      className="text-gray-400 hover:text-red-600"
                      aria-label={`Remove ${item.title}`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="mt-3 inline-flex items-center rounded-lg overflow-hidden border-2 border-royal-blue/30 bg-white shadow-sm">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="h-10 w-10 inline-flex items-center justify-center bg-gray-50 text-charcoal hover:bg-gray-100 transition-colors"
                      aria-label={`Decrease quantity for ${item.title}`}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="h-10 min-w-12 px-3 inline-flex items-center justify-center border-x-2 border-royal-blue/30 text-base font-bold text-charcoal bg-white">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="h-10 w-10 inline-flex items-center justify-center bg-gray-50 text-charcoal hover:bg-gray-100 transition-colors"
                      aria-label={`Increase quantity for ${item.title}`}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {errors.items && <p className="text-sm text-red-600 mt-4">{errors.items}</p>}

          <div className="mt-6 border-t border-gray-100 pt-4 space-y-1 text-sm">
            <div className="flex items-center justify-between text-deep-grey">
              <span>Total Items</span>
              <span className="font-semibold text-charcoal">{totalItems}</span>
            </div>
            <div className="flex items-center justify-between text-deep-grey">
              <span>Estimated Total</span>
              <span className="font-semibold text-charcoal">
                {estimatedTotal > 0 ? `RM ${estimatedTotal.toLocaleString()}` : 'TBD'}
              </span>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-3 rounded-xl font-semibold text-white bg-[#25D366] hover:bg-[#20bd5a] transition-colors"
            >
              Ask on WhatsApp
            </a>
            <button
              type="button"
              disabled={items.length === 0}
              onClick={() => {
                setShowForm((value) => !value)
                setErrors((value) => ({ ...value, items: undefined }))
              }}
              className="inline-flex items-center justify-center px-4 py-3 rounded-xl font-semibold text-white bg-royal-blue hover:bg-royal-blue-hover transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {showForm ? 'Hide Order Form' : 'Send Order'}
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4 border-t border-gray-100 pt-6">
              <div>
                <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  id="customerName"
                  type="text"
                  value={customerName}
                  onChange={(event) => setCustomerName(event.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
                {errors.customerName && <p className="text-sm text-red-600 mt-1">{errors.customerName}</p>}
              </div>

              <div>
                <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  id="customerPhone"
                  type="text"
                  value={customerPhone}
                  onChange={(event) => setCustomerPhone(event.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
                {errors.customerPhone && <p className="text-sm text-red-600 mt-1">{errors.customerPhone}</p>}
              </div>

              <div>
                <label htmlFor="customerAddress" className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <textarea
                  id="customerAddress"
                  value={customerAddress}
                  onChange={(event) => setCustomerAddress(event.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
                {errors.customerAddress && <p className="text-sm text-red-600 mt-1">{errors.customerAddress}</p>}
              </div>

              <div>
                <label htmlFor="customerNotes" className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  id="customerNotes"
                  value={customerNotes}
                  onChange={(event) => setCustomerNotes(event.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
                {errors.customerNotes && <p className="text-sm text-red-600 mt-1">{errors.customerNotes}</p>}
              </div>

              {errors.generic && <p className="text-sm text-red-600">{errors.generic}</p>}
              {successMessage && <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg p-3">{successMessage}</p>}

              <button
                type="submit"
                disabled={isSubmitting || items.length === 0}
                className="w-full inline-flex items-center justify-center px-4 py-3 rounded-xl font-semibold text-white bg-royal-blue hover:bg-royal-blue-hover transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Order'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
