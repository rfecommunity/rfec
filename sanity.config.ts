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

export default defineConfig({
  basePath: '/studio',
  title: 'RFEC — Conteúdo',
  projectId,
  dataset,
  schema,
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
