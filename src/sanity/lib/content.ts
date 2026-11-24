import 'server-only'

import { cache } from 'react'
import type { PortableTextBlock } from 'next-sanity'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { COMPANY_INFO, type CompanyInfo } from '@/lib/company'
import { client } from './client'

export interface HeroContent {
  title?: string
  subtitle?: string
  backgroundImage?: SanityImageSource
  primaryButtonText?: string
  primaryButtonLink?: string
  secondaryButtonText?: string
  secondaryButtonLink?: string
}

export interface ServiceContent {
  _id: string
  title?: string
  slug?: string
  description?: string
  category?: 'machinery' | 'scrap'
  image?: SanityImageSource
}

export interface FeatureContent {
  _id: string
  title?: string
  description?: string
  icon?: string
  order?: number
}

export interface CtaContent {
  title?: string
  description?: string
  buttonText?: string
  buttonLink?: string
  backgroundColor?: 'royal-blue' | 'charcoal' | 'white'
}

export interface AboutContent {
  pageTitle?: string
  pageSubtitle?: string
  whoWeAreTitle?: string
  whoWeAreContent?: PortableTextBlock[]
  vision?: string
  missionPoints?: string[]
}

// Explicit fetch lifetimes keep hourly content cached on pages that refresh every minute.
export const getHomeContent = cache(() => client.fetch<{
  hero: HeroContent | null
  features: FeatureContent[]
  cta: CtaContent | null
}>(`{
  "hero": *[_type == "hero"] | order(_updatedAt desc, _id asc)[0] {
    title, subtitle, backgroundImage, primaryButtonText, primaryButtonLink,
    secondaryButtonText, secondaryButtonLink
  },
  "features": *[_type == "feature"] | order(order asc, _id asc) {
    _id, title, description, icon, order
  },
  "cta": *[_type == "ctaSection"] | order(_updatedAt desc, _id asc)[0] {
    title, description, buttonText, buttonLink, backgroundColor
  }
}`, {}, { next: { revalidate: 60 } }))

export const getServices = cache(() => client.fetch<ServiceContent[]>(`
  *[_type == "service"] | order(category asc, _createdAt asc, _id asc) {
    _id, title, "slug": slug.current, description, category, image
  }
`, {}, { next: { revalidate: 3600 } }))

export const getAboutContent = cache(() => client.fetch<AboutContent | null>(`
  *[_type == "aboutPage"] | order(_updatedAt desc, _id asc)[0] {
    pageTitle, pageSubtitle, whoWeAreTitle, whoWeAreContent, vision, missionPoints
  }
`, {}, { next: { revalidate: 3600 } }))

export const getCompanyInfo = cache(async (): Promise<CompanyInfo> => {
  const info = await client.fetch<Partial<CompanyInfo> | null>(`
    *[_type == "companyInfo"] | order(_updatedAt desc, _id asc)[0] {
      name, address, phone, email, "whatsappNumber": whatsapp, operatingHours
    }
  `, {}, { next: { revalidate: 3600 } })
  return {
    name: info?.name || COMPANY_INFO.name,
    address: info?.address || COMPANY_INFO.address,
    phone: info?.phone || COMPANY_INFO.phone,
    email: info?.email || COMPANY_INFO.email,
    whatsappNumber: info?.whatsappNumber?.replace(/\D/g, '') || COMPANY_INFO.whatsappNumber,
    operatingHours: info?.operatingHours || COMPANY_INFO.operatingHours,
  }
})

export const defaultServices: ServiceContent[] = [
  {
    _id: 'machinery', category: 'machinery', slug: 'heavy-machinery-trading',
    title: 'Heavy Machinery Trading',
    description: 'Sourcing and supplying high-quality used and reconditioned construction machinery, including excavators, earthmovers, and spare parts.',
  },
  {
    _id: 'scrap', category: 'scrap', slug: 'scrap-metal-trading',
    title: 'Scrap Metal Trading',
    description: 'Competitive pricing and consistent grading for ferrous and non-ferrous scrap metals, ensuring sustainable recycling practices.',
  },
]

export function serviceAnchor(service: ServiceContent) {
  return service.slug || service._id
}
