import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
    }),
    defineField({
      name: 'pageSubtitle',
      title: 'Page Subtitle',
      type: 'text',
    }),
    defineField({
      name: 'whoWeAreTitle',
      title: 'Who We Are - Title',
      type: 'string',
    }),
    defineField({
      name: 'whoWeAreContent',
      title: 'Who We Are - Content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'vision',
      title: 'Vision',
      type: 'text',
    }),
    defineField({
      name: 'missionPoints',
      title: 'Mission Points',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
})
