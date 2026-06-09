import { ImageIcon } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export const galleryPhoto = defineType({
  name: 'galleryPhoto',
  title: 'Foto',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Imagem',
      type: 'image',
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
      name: 'caption',
      title: 'Legenda',
      type: 'string'
    }),
    defineField({
      name: 'isHighlight',
      title: 'Destaque',
      description:
        'Fotos em destaque aparecem na página do evento; as demais ficam apenas na galeria completa.',
      type: 'boolean',
      initialValue: false
    })
  ],
  preview: {
    select: { media: 'image', title: 'caption', isHighlight: 'isHighlight' },
    prepare({ media, title, isHighlight }) {
      return {
        media,
        title: title || 'Foto',
        subtitle: isHighlight ? 'Destaque' : undefined
      }
    }
  }
})
