import { ArchiveIcon } from 'lucide-react'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const pastAssets = defineType({
  name: 'pastAssets',
  title: 'Materiais do evento',
  description: 'Conteúdo disponibilizado após o evento.',
  type: 'object',
  icon: ArchiveIcon,
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: 'slidesUrl',
      title: 'Slides',
      type: 'url'
    }),
    defineField({
      name: 'videoUrls',
      title: 'Vídeos',
      type: 'array',
      of: [defineArrayMember({ type: 'url' })]
    }),
    defineField({
      name: 'repositories',
      title: 'Repositórios',
      type: 'array',
      of: [defineArrayMember({ type: 'linkedResource' })]
    }),
    defineField({
      name: 'resources',
      title: 'Outros recursos',
      type: 'array',
      of: [defineArrayMember({ type: 'linkedResource' })]
    })
  ]
})
