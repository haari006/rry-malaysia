import { defineField, defineType } from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Auto Parts', value: 'auto-parts' },
          { title: 'Scrap Metal', value: 'scrap-metal' },
          { title: 'Machinery', value: 'machinery' },
          { title: 'Vehicles', value: 'vehicles' },
          { title: 'Other', value: 'other' },
        ],
      },
    }),
    defineField({
      name: 'price',
      title: 'Price (Optional)',
      type: 'number',
      description: 'Leave empty if price is "Contact for Price"',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
})
