import { HandshakeIcon } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export const sponsor = defineType({
  name: 'sponsor',
  title: 'Patrocinador',
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
      ]
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url'
    }),
    defineField({
      name: 'tier',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'Ouro', value: 'gold' },
          { title: 'Prata', value: 'silver' },
          { title: 'Bronze', value: 'bronze' },
          { title: 'Apoio', value: 'support' }
        ]
      }
    })
  ],
  preview: {
    select: { title: 'name', subtitle: 'tier', media: 'logo' }
  }
})
