import { type SchemaTypeDefinition } from 'sanity'
import aboutPage from './aboutPage'
import companyInfo from './companyInfo'
import ctaSection from './ctaSection'
import feature from './feature'
import hero from './hero'
import { product } from './product'
import { scrapRate } from './scrapRate'
import service from './service'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [service, companyInfo, hero, feature, aboutPage, ctaSection, product, scrapRate],
}
