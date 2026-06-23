'use client'

/**
 * Configuration for the embedded Sanity Studio, mounted at `/studio`.
 * See `app/studio/[[...tool]]/page.tsx`.
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'

import { apiVersion, dataset, projectId } from './sanity/env'
import { schema } from './sanity/schemaTypes'
import { structure } from './sanity/structure'

/** Singleton document types: exactly one instance, never created/deleted. */
const SINGLETONS = new Set(['homePage'])

export default defineConfig({
  basePath: '/studio',
  title: 'RFEC — Conteúdo',
  projectId,
  dataset,
  schema,
  document: {
    // Strip create/delete/duplicate actions from singletons so editors can only
    // edit the single instance pinned in the desk structure.
    actions: (input, { schemaType }) =>
      SINGLETONS.has(schemaType)
        ? input.filter(
            ({ action }) =>
              !['unpublish', 'delete', 'duplicate'].includes(action ?? '')
          )
        : input
  },
  plugins: [
    structureTool({ structure }),
    // Live preview: opens the site in an iframe and enables draft mode so
    // editors review unpublished changes in place.
    presentationTool({
      previewUrl: {
        origin: 'same-origin',
        previewMode: {
          enable: '/api/draft-mode/enable'
        }
      }
    }),
    visionTool({ defaultApiVersion: apiVersion })
  ]
})
