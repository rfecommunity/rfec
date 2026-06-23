import { draftMode } from 'next/headers'

import { client } from './client'
import { readToken } from './token'

/** Broad cache tag — revalidated when any event-related content changes. */
export const EVENTS_TAG = 'events'

/** Cache tag for global site content (homepage imagery, partners). */
export const SITE_TAG = 'site'

/** Per-event cache tag, e.g. `event:meetup-react-2025`. */
export function eventTag(slug: string) {
  return `event:${slug}`
}

type FetchOptions<Params> = {
  query: string
  params?: Params
  /** Cache tags for on-demand revalidation. */
  tags?: string[]
  /** Time-based safety net (seconds) in case a webhook is missed. */
  revalidate?: number
}

/**
 * `draftMode()` can only be read inside a request scope. It throws in contexts
 * like `generateStaticParams`, so we swallow that and fall back to published.
 */
async function isDraftEnabled(): Promise<boolean> {
  try {
    return (await draftMode()).isEnabled
  } catch {
    return false
  }
}

/**
 * Thin wrapper around `client.fetch` with two paths:
 *
 * - **Published** (default): CDN + tag/time caching. Stays statically
 *   generated; freshness comes from on-demand tag revalidation.
 * - **Draft** (preview cookie set): authenticated, uncached `drafts`
 *   perspective so editors see unpublished content.
 *
 * Degrades gracefully: returns `null` when Sanity is unconfigured or a request
 * fails, so a CMS outage yields empty states rather than a hard crash.
 */
export async function sanityFetch<T>({
  query,
  params,
  tags = [EVENTS_TAG],
  revalidate = 3600
}: FetchOptions<Record<string, unknown>>): Promise<T | null> {
  if (!client) return null

  const resolvedParams = params ?? {}

  if (readToken && (await isDraftEnabled())) {
    try {
      return await client
        .withConfig({
          token: readToken,
          useCdn: false,
          perspective: 'drafts'
        })
        .fetch<T>(query, resolvedParams, { cache: 'no-store' })
    } catch (error) {
      console.error('[sanity] draft fetch failed:', error)
      return null
    }
  }

  try {
    return await client.fetch<T>(query, resolvedParams, {
      next: { revalidate, tags }
    })
  } catch (error) {
    console.error('[sanity] fetch failed:', error)
    return null
  }
}
