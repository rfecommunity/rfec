import { SearchIcon } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  icon: SearchIcon,
  options: { collapsible: true, collapsed: true },
  description: 'Sobrescreve os metadados padrão (opcional).',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (rule) => rule.max(70)
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(160)
    }),
    defineField({
      name: 'ogImage',
      title: 'Imagem de compartilhamento',
      description: 'Usada quando não houver banner. Proporção 1200×630.',
      type: 'image',
      options: { hotspot: true }
    })
  ]
})
