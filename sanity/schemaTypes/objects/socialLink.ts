import { LinkIcon } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export const socialLink = defineType({
  name: 'socialLink',
  title: 'Rede social',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'platform',
      title: 'Plataforma',
      type: 'string',
      options: {
        list: [
          { title: 'LinkedIn', value: 'linkedin' },
          { title: 'GitHub', value: 'github' },
          { title: 'X / Twitter', value: 'x' },
          { title: 'Instagram', value: 'instagram' },
          { title: 'Website', value: 'website' },
          { title: 'Outro', value: 'other' }
        ]
      },
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
    select: { title: 'platform', subtitle: 'url' }
  }
})
