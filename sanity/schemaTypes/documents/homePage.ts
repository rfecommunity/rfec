import { ImageIcon } from 'lucide-react'
import { defineArrayMember, defineField, defineType } from 'sanity'

/**
 * Singleton holding the homepage's editorial imagery. There is exactly one
 * instance (documentId `homePage`, enforced in `sanity/structure.ts`). Each
 * section is a flexible array — the components fill their fixed grid from the
 * first N photos, so editors can swap/reorder freely.
 */
export const homePage = defineType({
  name: 'homePage',
  title: 'Página inicial',
  type: 'document',
  icon: ImageIcon,
  groups: [
    { name: 'about', title: 'Quem somos', default: true },
    { name: 'mission', title: 'Nossa Missão' },
    { name: 'join', title: 'Junte-se' }
  ],
  fields: [
    defineField({
      name: 'aboutImages',
      title: 'Imagens — Quem somos',
      description:
        'A primeira imagem é o destaque; as 3 seguintes preenchem a grade.',
      type: 'array',
      group: 'about',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Texto alternativo',
              type: 'string'
            })
          ]
        })
      ],
      validation: (rule) => rule.min(1)
    }),
    defineField({
      name: 'missionImages',
      title: 'Imagens — Nossa Missão',
      description:
        'A primeira imagem é o destaque; as 2 seguintes preenchem a grade.',
      type: 'array',
      group: 'mission',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Texto alternativo',
              type: 'string'
            })
          ]
        })
      ],
      validation: (rule) => rule.min(1)
    }),
    defineField({
      name: 'joinBackground',
      title: 'Imagem de fundo — Junte-se',
      type: 'image',
      group: 'join',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Texto alternativo', type: 'string' })
      ]
    })
  ],
  preview: {
    select: { media: 'aboutImages.0' },
    prepare({ media }) {
      return { title: 'Página inicial', media }
    }
  }
})
