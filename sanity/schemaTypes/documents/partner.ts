import { HandshakeIcon } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export const partner = defineType({
  name: 'partner',
  title: 'Parceiro',
  type: 'document',
  icon: HandshakeIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nome',
      type: 'string',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Texto alternativo', type: 'string' })
      ],
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url'
    }),
    defineField({
      name: 'order',
      title: 'Ordem',
      description: 'Define a ordem no carrossel (menor primeiro).',
      type: 'number'
    })
  ],
  orderings: [
    {
      name: 'manual',
      title: 'Ordem manual',
      by: [
        { field: 'order', direction: 'asc' },
        { field: 'name', direction: 'asc' }
      ]
    }
  ],
  preview: {
    select: { title: 'name', media: 'logo' }
  }
})
