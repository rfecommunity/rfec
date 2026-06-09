import { ShapesIcon } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export const eventType = defineType({
  name: 'eventType',
  title: 'Tipo de evento',
  type: 'document',
  icon: ShapesIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Nome',
      description: 'Ex.: Meetup, Workshop, Hackathon.',
      type: 'string',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required()
    })
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug.current' }
  }
})
