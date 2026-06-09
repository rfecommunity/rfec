import { defineEnableDraftMode } from 'next-sanity/draft-mode'

import { client } from '@/sanity/lib/client'
import { readToken } from '@/sanity/lib/token'

/**
 * Enables draft mode for an authenticated editor. Paired with the Presentation
 * tool's `previewUrl.previewMode.enable` in `sanity.config.ts`.
 *
 * Conditionally defined so the build/runtime stays sane when Sanity (or the
 * read token) is not configured.
 */
export const { GET } =
  client && readToken
    ? defineEnableDraftMode({
        client: client.withConfig({ token: readToken })
      })
    : {
        GET: async () => new Response('Preview not configured', { status: 501 })
      }
