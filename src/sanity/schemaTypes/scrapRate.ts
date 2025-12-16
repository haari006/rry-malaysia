import { defineField, defineType } from 'sanity'

export const scrapRate = defineType({
  name: 'scrapRate',
  title: 'Scrap Metal Rate',
  type: 'document',
  fields: [
    defineField({
      name: 'materialName',
      title: 'Material Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g., Copper, Aluminum, Steel',
    }),
    defineField({
      name: 'currentPrice',
      title: 'Current Price (RM)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'unit',
      title: 'Unit',
      type: 'string',
      options: {
        list: [
          { title: 'Per KG', value: 'kg' },
          { title: 'Per Ton', value: 'ton' },
        ],
      },
      initialValue: 'kg',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'trend',
      title: 'Market Trend',
      type: 'string',
      options: {
        list: [
          { title: 'Up', value: 'up' },
          { title: 'Down', value: 'down' },
          { title: 'Stable', value: 'stable' },
        ],
      },
      initialValue: 'stable',
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'materialName',
      subtitle: 'currentPrice',
    },
    prepare({ title, subtitle }) {
      return {
        title: title,
        subtitle: `RM ${subtitle}`,
      }
    },
  },
})
