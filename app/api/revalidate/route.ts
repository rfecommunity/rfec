import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

import { EVENTS_TAG, eventTag, SITE_TAG } from '@/sanity/lib/fetch'

/**
 * Sanity webhook target. On publish/unpublish/delete, Sanity POSTs here with a
 * signed payload; we verify the signature and revalidate only the affected
 * cache tags. Configure the webhook to send `_type` and `slug` in the
 * projection, secured with `SANITY_REVALIDATE_SECRET`.
 */
type WebhookPayload = {
  _type?: string
  slug?: { current?: string }
}

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    )

    if (!isValidSignature) {
      return new NextResponse('Invalid signature', { status: 401 })
    }

    if (!body?._type) {
      return new NextResponse('Bad request: missing _type', { status: 400 })
    }

    // Global site content (homepage imagery, partners) maps to its own tag.
    // The second argument is Next 16's required cache-life profile; 'max' purges
    // the tag on demand while leaving each fetch's own `revalidate` window in
    // charge of the time-based safety net.
    if (body._type === 'homePage' || body._type === 'partner') {
      revalidateTag(SITE_TAG, 'max')
    } else {
      // Broad tag covers listing pages, sitemap and tag lists.
      revalidateTag(EVENTS_TAG, 'max')

      // Narrow tag for the specific event detail/gallery pages.
      if (body.slug?.current) {
        revalidateTag(eventTag(body.slug.current), 'max')
      }
    }

    return NextResponse.json({
      revalidated: true,
      type: body._type,
      slug: body.slug?.current ?? null
    })
  } catch (error) {
    console.error('[revalidate] webhook error:', error)
    return new NextResponse('Error revalidating', { status: 500 })
  }
}
