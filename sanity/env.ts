/**
 * Sanity environment configuration.
 *
 * The public values are read from `NEXT_PUBLIC_*` so they are available in both
 * server and client bundles (the embedded Studio needs them in the browser).
 * The site degrades gracefully when these are absent — `isSanityConfigured`
 * lets the data layer return empty results instead of crashing the whole site
 * (see `sanity/lib/fetch.ts`).
 */

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-01'

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''

/** True once a Sanity project id is present in the environment. */
export const isSanityConfigured = projectId.length > 0
