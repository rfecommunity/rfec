import { MapPinIcon } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export const eventLocation = defineType({
  name: 'eventLocation',
  title: 'Local',
  type: 'object',
  icon: MapPinIcon,
  fields: [
    defineField({
      name: 'isOnline',
      title: 'Evento online',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'name',
      title: 'Nome do local',
      description: 'Ex.: CESAR School, ou a plataforma (Zoom, YouTube...).',
      type: 'string'
    }),
    defineField({
      name: 'address',
      title: 'Endereço',
      type: 'string',
      hidden: ({ parent }) => Boolean(parent?.isOnline)
    }),
    defineField({
      name: 'mapUrl',
      title: 'Link do mapa',
      type: 'url',
      hidden: ({ parent }) => Boolean(parent?.isOnline)
    })
  ],
  preview: {
    select: { title: 'name', isOnline: 'isOnline', address: 'address' },
    prepare({ title, isOnline, address }) {
      return {
        title: title || 'Local',
        subtitle: isOnline ? 'Online' : address
      }
    }
  }
})
