import { ClockIcon } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export const agendaItem = defineType({
  name: 'agendaItem',
  title: 'Item da programação',
  type: 'object',
  icon: ClockIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
      rows: 2
    }),
    defineField({
      name: 'startTime',
      title: 'Horário de início',
      description: 'Formato 24h, ex.: 19:00',
      type: 'string',
      validation: (rule) =>
        rule.regex(/^([01]\d|2[0-3]):[0-5]\d$/, {
          name: 'hora',
          invert: false
        })
    }),
    defineField({
      name: 'endTime',
      title: 'Horário de término',
      description: 'Formato 24h, ex.: 19:45',
      type: 'string',
      validation: (rule) =>
        rule.regex(/^([01]\d|2[0-3]):[0-5]\d$/, {
          name: 'hora',
          invert: false
        })
    }),
    defineField({
      name: 'speaker',
      title: 'Palestrante',
      type: 'reference',
      to: [{ type: 'speaker' }]
    })
  ],
  preview: {
    select: { title: 'title', startTime: 'startTime', speaker: 'speaker.name' },
    prepare({ title, startTime, speaker }) {
      return {
        title,
        subtitle: [startTime, speaker].filter(Boolean).join(' — ')
      }
    }
  }
})
