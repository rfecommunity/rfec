/**
 * Embedded Sanity Studio at `/studio`. Because this route lives outside the
 * `(site)` group it does not inherit the marketing Header/Footer.
 *
 * The exported metadata/viewport from `next-sanity/studio` set `noindex`, so
 * the Studio stays out of search results.
 */

import { NextStudio } from 'next-sanity/studio'

import config from '@/sanity.config'

export const dynamic = 'force-static'

export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  return <NextStudio config={config} />
}
