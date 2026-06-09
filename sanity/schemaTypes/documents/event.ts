import { CalendarIcon } from 'lucide-react'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Evento',
  type: 'document',
  icon: CalendarIcon,
  groups: [
    { name: 'content', title: 'Conteúdo', default: true },
    { name: 'details', title: 'Detalhes' },
    { name: 'people', title: 'Pessoas' },
    { name: 'media', title: 'Mídia' },
    { name: 'seo', title: 'SEO' }
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'banner',
      title: 'Banner',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo',
          type: 'string'
        })
      ],
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'shortDescription',
      title: 'Descrição curta',
      description:
        'Usada nos cards, busca e compartilhamento. Até 200 caracteres.',
      type: 'text',
      rows: 3,
      group: 'content',
      validation: (rule) => rule.required().max(200)
    }),
    defineField({
      name: 'fullDescription',
      title: 'Descrição completa',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({ type: 'block' })]
    }),
    defineField({
      name: 'featured',
      title: 'Destaque',
      type: 'boolean',
      group: 'content',
      initialValue: false
    }),
    defineField({
      name: 'startAt',
      title: 'Início',
      description: 'Define se o evento é próximo ou passado.',
      type: 'datetime',
      group: 'details',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'endAt',
      title: 'Término',
      type: 'datetime',
      group: 'details',
      validation: (rule) =>
        rule
          .min(rule.valueOfField('startAt'))
          .warning('O término deve ser depois do início.')
    }),
    defineField({
      name: 'location',
      title: 'Local',
      type: 'eventLocation',
      group: 'details'
    }),
    defineField({
      name: 'eventType',
      title: 'Tipo de evento',
      type: 'reference',
      group: 'details',
      to: [{ type: 'eventType' }]
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'details',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'tag' }] })]
    }),
    defineField({
      name: 'registrationUrl',
      title: 'Link de inscrição (Sympla)',
      type: 'url',
      group: 'details'
    }),
    defineField({
      name: 'agenda',
      title: 'Programação',
      type: 'array',
      group: 'details',
      of: [defineArrayMember({ type: 'agendaItem' })]
    }),
    defineField({
      name: 'speakers',
      title: 'Palestrantes',
      type: 'array',
      group: 'people',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'speaker' }] })]
    }),
    defineField({
      name: 'sponsors',
      title: 'Patrocinadores',
      type: 'array',
      group: 'people',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'sponsor' }] })]
    }),
    defineField({
      name: 'gallery',
      title: 'Galeria',
      type: 'eventGallery',
      group: 'media'
    }),
    defineField({
      name: 'pastAssets',
      title: 'Materiais do evento',
      type: 'pastAssets',
      group: 'media'
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo'
    })
  ],
  preview: {
    select: { title: 'title', startAt: 'startAt', media: 'banner' },
    prepare({ title, startAt, media }) {
      const subtitle = startAt
        ? new Date(startAt).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
          })
        : 'Sem data'
      return { title, subtitle, media }
    }
  }
})
