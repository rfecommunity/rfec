import { createClient } from 'next-sanity'

import { apiVersion, dataset, isSanityConfigured, projectId } from '../env'

/**
 * Server-side read client. `useCdn` is enabled for fast, cached reads; freshness
 * is driven by on-demand tag revalidation (see `app/api/revalidate/route.ts`),
 * not by hitting the live API on every request.
 *
 * `null` when the project is not configured so the build/runtime can degrade to
 * empty states rather than throwing at import time.
 */
export const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: 'published'
    })
  : null
