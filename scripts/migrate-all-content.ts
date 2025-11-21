import * as fs from 'fs'
import { createClient } from 'next-sanity'
import * as path from 'path'

// Load .env.local manually
const envPath = path.join(process.cwd(), '.env.local')
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8')
  envContent.split('\n').forEach((line) => {
    const [key, ...valueParts] = line.split('=')
    if (key && valueParts.length) {
      process.env[key.trim()] = valueParts.join('=').trim()
    }
  })
}

// Create write client
const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '6pnhjydq',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-02-19',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

// Hero Section Data
const heroData = {
  _type: 'hero',
  title: 'Your Trusted Partner in Heavy Machinery & Scrap Metal',
  subtitle:
    'Reliable machinery, premium scrap materials, and trusted industry expertise — all under one roof.',
  primaryButtonText: 'Explore Services',
  primaryButtonLink: '/services',
  secondaryButtonText: 'Contact Us',
  secondaryButtonLink: '/contact',
}

// Features Data (Why Choose Us)
const features = [
  {
    _type: 'feature',
    title: 'Trusted Network',
    description: 'Wide sourcing network across Malaysia and abroad.',
    icon: 'ShieldCheck',
    order: 1,
  },
  {
    _type: 'feature',
    title: 'Quality Assurance',
    description: 'Rigorous inspection and grading processes.',
    icon: 'ShieldCheck',
    order: 2,
  },
  {
    _type: 'feature',
    title: 'Fair Pricing',
    description: 'Transparent and competitive market rates.',
    icon: 'ShieldCheck',
    order: 3,
  },
]

// About Page Data
const aboutPageData = {
  _type: 'aboutPage',
  pageTitle: 'About Us',
  pageSubtitle:
    'We are a dynamic trading company specializing in heavy machinery and scrap metal, committed to quality and trust.',
  whoWeAreTitle: 'Who We Are',
  whoWeAreContent: [
    {
      _type: 'block',
      children: [
        {
          _type: 'span',
          text: 'With years of experience in machinery sourcing and metal recycling, we provide reliable solutions to contractors, traders, recyclers, and industrial clients across Malaysia and abroad.',
        },
      ],
    },
    {
      _type: 'block',
      children: [
        {
          _type: 'span',
          text: 'Our core strength lies in our wide sourcing network, transparent business approach, and commitment to quality. Whether you need an excavator, a reconditioned hydraulic pump, or premium-grade scrap copper, we deliver with consistency and trust.',
        },
      ],
    },
  ],
  vision:
    'To become a leading regional supplier of heavy machinery and high-quality scrap metals, recognized for reliability, fairness, and sustainable trading practices.',
  missionPoints: [
    'To supply quality used machinery and spare parts at competitive prices.',
    'To provide consistent and well-graded scrap metals for local and international buyers.',
    'To build long-term relationships based on trust, transparency, and customer satisfaction.',
    'To promote sustainable recycling practices.',
  ],
}

// CTA Section Data
const ctaData = {
  _type: 'ctaSection',
  title: 'Ready to work with us?',
  description:
    "Whether you're looking to buy machinery or sell scrap metal, we are here to provide the best solutions for your business.",
  buttonText: 'Get in Touch',
  buttonLink: '/contact',
  backgroundColor: 'royal-blue',
}

// Services Data (from previous migration)
const services = [
  {
    _type: 'service',
    title: 'Heavy Machinery Trading',
    slug: { _type: 'slug', current: 'heavy-machinery-trading' },
    description:
      'Sourcing and supplying high-quality used and reconditioned construction machinery, including excavators, earthmovers, and spare parts.',
    category: 'machinery',
  },
  {
    _type: 'service',
    title: 'Scrap Metal Trading',
    slug: { _type: 'slug', current: 'scrap-metal-trading' },
    description:
      'Competitive pricing and consistent grading for ferrous and non-ferrous scrap metals, ensuring sustainable recycling practices.',
    category: 'scrap',
  },
]

// Company Info Data (from previous migration)
const companyInfo = {
  _type: 'companyInfo',
  name: 'RRY Malaysia',
  address: 'Kuala Lumpur, Malaysia',
  phone: '+60 12-345 6789',
  email: 'contact@rrymalaysia.com',
  whatsapp: '60123456789',
  operatingHours: 'Monday - Friday: 9:00 AM - 6:00 PM',
}

async function migrateAllData() {
  try {
    console.log('🚀 Starting comprehensive data migration to Sanity...')
    console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '6pnhjydq')
    console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET || 'production')
    console.log('')

    // Create Hero
    console.log('📝 Creating Hero section...')
    const heroResult = await writeClient.create(heroData)
    console.log(`✓ Created hero: ${heroResult.title}`)

    // Create Features
    console.log('\n📝 Creating Features...')
    for (const feature of features) {
      const result = await writeClient.create(feature)
      console.log(`✓ Created feature: ${result.title}`)
    }

    // Create About Page
    console.log('\n📝 Creating About Page...')
    const aboutResult = await writeClient.create(aboutPageData)
    console.log(`✓ Created about page: ${aboutResult.pageTitle}`)

    // Create CTA Section
    console.log('\n📝 Creating CTA Section...')
    const ctaResult = await writeClient.create(ctaData)
    console.log(`✓ Created CTA: ${ctaResult.title}`)

    // Create Services
    console.log('\n📝 Creating Services...')
    for (const service of services) {
      const result = await writeClient.create(service)
      console.log(`✓ Created service: ${result.title}`)
    }

    // Create Company Info
    console.log('\n📝 Creating Company Info...')
    const companyResult = await writeClient.create(companyInfo)
    console.log(`✓ Created company info: ${companyResult.name}`)

    console.log('\n✅ Migration completed successfully!')
    console.log('\n📊 Summary:')
    console.log('  - 1 Hero section')
    console.log('  - 3 Features')
    console.log('  - 1 About page')
    console.log('  - 1 CTA section')
    console.log('  - 2 Services')
    console.log('  - 1 Company info')
  } catch (error) {
    console.error('❌ Migration failed:', error)
    throw error
  }
}

// Run migration
migrateAllData()
