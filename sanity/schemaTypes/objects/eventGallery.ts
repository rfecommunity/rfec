import { ImagesIcon } from 'lucide-react'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const eventGallery = defineType({
  name: 'eventGallery',
  title: 'Galeria',
  type: 'object',
  icon: ImagesIcon,
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: 'cover',
      title: 'Capa da galeria',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Texto alternativo', type: 'string' })
      ]
    }),
    defineField({
      name: 'externalAlbumUrl',
      title: 'Álbum externo',
      description:
        'Para grandes volumes de fotos, prefira linkar um álbum externo (Google Fotos, Flickr) em vez de subir tudo aqui.',
      type: 'url'
    }),
    defineField({
      name: 'photos',
      title: 'Fotos',
      type: 'array',
      of: [defineArrayMember({ type: 'galleryPhoto' })]
    })
  ]
})
