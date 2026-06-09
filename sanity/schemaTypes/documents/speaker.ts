import { MicIcon } from 'lucide-react'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const speaker = defineType({
  name: 'speaker',
  title: 'Palestrante',
  type: 'document',
  icon: MicIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nome',
      type: 'string',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'photo',
      title: 'Foto',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Texto alternativo', type: 'string' })
      ]
    }),
    defineField({
      name: 'role',
      title: 'Cargo',
      type: 'string'
    }),
    defineField({
      name: 'company',
      title: 'Empresa',
      type: 'string'
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })]
    }),
    defineField({
      name: 'social',
      title: 'Redes sociais',
      type: 'array',
      of: [defineArrayMember({ type: 'socialLink' })]
    })
  ],
  preview: {
    select: { title: 'name', role: 'role', company: 'company', media: 'photo' },
    prepare({ title, role, company, media }) {
      return {
        title,
        subtitle: [role, company].filter(Boolean).join(' @ '),
        media
      }
    }
  }
})
