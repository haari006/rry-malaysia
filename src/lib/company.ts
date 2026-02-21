export const COMPANY_INFO = {
  name: 'RRY HARDWARE AND MACHINERY (M) SDN.BHD (1415901-T)',
  phone: '+60162197447',
  whatsappNumber: '60162197447',
  email: 'rry.malaysia@yahoo.com',
  address: 'NO 12, MEDAN SILIBIN, JALAN SILIBIN, 30100 IPOH, PERAK, MALAYSIA',
} as const

export function getProductInquiryMessage(title: string, slug: string) {
  return `Hi, I'm interested in "${title}" (/marketplace/${slug}). Please share details.`
}

export function getCartInquiryMessage(items: Array<{ title: string; quantity: number }>) {
  const itemText = items.map((item) => `${item.title} x${item.quantity}`).join(', ')
  return `Hi, I want to order these items: ${itemText}`
}

export function buildWhatsAppLink(message: string) {
  return `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`
}
