export interface CompanyInfo {
  name: string
  phone: string
  whatsappNumber: string
  email: string
  address: string
  operatingHours: string
}

export const COMPANY_INFO: CompanyInfo = {
  name: 'RRY HARDWARE AND MACHINERY (M) SDN.BHD (1415901-T)',
  phone: '+60162197447',
  whatsappNumber: '60162197447',
  email: 'rry.malaysia@yahoo.com',
  address: 'NO 12, MEDAN SILIBIN, JALAN SILIBIN, 30100 IPOH, PERAK, MALAYSIA',
  operatingHours: 'Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 9:00 AM - 1:00 PM\nSunday: Closed',
}

export function getProductInquiryMessage(title: string, slug: string) {
  return `Hi, I'm interested in "${title}" (/marketplace/${slug}). Please share details.`
}

export function getCartInquiryMessage(items: Array<{ title: string; quantity: number }>) {
  const itemText = items.map((item) => `${item.title} x${item.quantity}`).join(', ')
  return `Hi, I want to order these items: ${itemText}`
}

export function buildWhatsAppLink(message: string, whatsappNumber: string = COMPANY_INFO.whatsappNumber) {
  return `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
}
