import * as fs from 'fs'
import { createClient } from 'next-sanity'
import * as path from 'path'

// Load .env.local manually
const envPath = path.join(process.cwd(), '.env.local')
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8')
  envContent.split('\n').forEach(line => {
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

// Hardcoded data to migrate
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

const companyInfo = {
  _type: 'companyInfo',
  name: 'RRY Malaysia',
  address: 'Kuala Lumpur, Malaysia',
  phone: '+60 12-345 6789',
  email: 'contact@rrymalaysia.com',
  whatsapp: '60123456789',
  operatingHours: 'Monday - Friday: 9:00 AM - 6:00 PM',
}

async function migrateData() {
  try {
    console.log('Starting data migration to Sanity...')
    console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '6pnhjydq')
    console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET || 'production')

    // Create services
    console.log('\nCreating services...')
    for (const service of services) {
      const result = await writeClient.create(service)
      console.log(`✓ Created service: ${result.title}`)
    }

    // Create company info
    console.log('\nCreating company info...')
    const companyResult = await writeClient.create(companyInfo)
    console.log(`✓ Created company info: ${companyResult.name}`)

    console.log('\n✅ Migration completed successfully!')
  } catch (error) {
    console.error('❌ Migration failed:', error)
    throw error
  }
}

// Run migration
migrateData()

