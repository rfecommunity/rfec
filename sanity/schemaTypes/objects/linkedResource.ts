import { defineField, defineType } from 'sanity'

export const linkedResource = defineType({
  name: 'linkedResource',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Rótulo',
      type: 'string',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (rule) => rule.required()
    })
  ],
  preview: {
    select: { title: 'label', subtitle: 'url' }
  }
})
