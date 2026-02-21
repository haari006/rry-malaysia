import { writeClient } from '@/sanity/lib/client'
import { NextResponse } from 'next/server'

interface IncomingItem {
  productId?: unknown
  productTitle?: unknown
  productSlug?: unknown
  unitPrice?: unknown
  quantity?: unknown
}

interface OrderPayload {
  customerName?: unknown
  customerPhone?: unknown
  customerAddress?: unknown
  customerNotes?: unknown
  items?: unknown
  source?: unknown
}

function randomOrderSuffix() {
  return Math.floor(1000 + Math.random() * 9000).toString()
}

function getOrderNumber(date: Date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `RRY-${y}${m}${d}-${randomOrderSuffix()}`
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as OrderPayload

    const errors: Record<string, string> = {}

    if (!isNonEmptyString(body.customerName)) {
      errors.customerName = 'Customer name is required.'
    }
    if (!isNonEmptyString(body.customerPhone)) {
      errors.customerPhone = 'Customer phone is required.'
    }
    if (!isNonEmptyString(body.customerAddress)) {
      errors.customerAddress = 'Customer address is required.'
    }
    if (!isNonEmptyString(body.customerNotes)) {
      errors.customerNotes = 'Customer notes are required.'
    }

    if (!Array.isArray(body.items) || body.items.length === 0) {
      errors.items = 'At least one item is required.'
    }

    const normalizedItems = Array.isArray(body.items)
      ? body.items
          .map((item) => {
            const candidate = item as IncomingItem
            const quantity = typeof candidate.quantity === 'number' ? candidate.quantity : Number(candidate.quantity)
            const unitPrice =
              typeof candidate.unitPrice === 'number'
                ? candidate.unitPrice
                : candidate.unitPrice === undefined || candidate.unitPrice === null
                  ? undefined
                  : Number(candidate.unitPrice)

            return {
              productId: typeof candidate.productId === 'string' ? candidate.productId.trim() : '',
              productTitle: typeof candidate.productTitle === 'string' ? candidate.productTitle.trim() : '',
              productSlug: typeof candidate.productSlug === 'string' ? candidate.productSlug.trim() : '',
              quantity,
              unitPrice: typeof unitPrice === 'number' && Number.isFinite(unitPrice) ? unitPrice : undefined,
            }
          })
          .filter((item) => item.productId && item.productTitle && item.productSlug && Number.isFinite(item.quantity))
      : []

    if (Array.isArray(body.items) && normalizedItems.length !== body.items.length) {
      errors.items = 'One or more items are invalid.'
    }

    if (normalizedItems.some((item) => item.quantity < 1)) {
      errors.items = 'Item quantity must be at least 1.'
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ error: 'Validation failed', errors }, { status: 400 })
    }

    const totalItems = normalizedItems.reduce((sum, item) => sum + item.quantity, 0)
    const estimatedTotal = normalizedItems.reduce((sum, item) => {
      if (typeof item.unitPrice === 'number') {
        return sum + item.unitPrice * item.quantity
      }
      return sum
    }, 0)

    const now = new Date()
    const orderNumber = getOrderNumber(now)
    const customerName = (body.customerName as string).trim()
    const customerPhone = (body.customerPhone as string).trim()
    const customerAddress = (body.customerAddress as string).trim()
    const customerNotes = (body.customerNotes as string).trim()

    await writeClient.create({
      _type: 'order',
      orderNumber,
      status: 'new',
      customerName,
      customerPhone,
      customerAddress,
      customerNotes,
      items: normalizedItems,
      totalItems,
      estimatedTotal: estimatedTotal > 0 ? estimatedTotal : undefined,
      source: 'website',
      submittedAt: now.toISOString(),
    })

    return NextResponse.json({ success: true, orderNumber })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}
