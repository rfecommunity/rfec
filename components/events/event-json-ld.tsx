import { getImageUrl } from '@/sanity/lib/image'
import type { EventDetail } from '@/sanity/lib/types'

/**
 * schema.org `Event` structured data for rich results. Rendered as a plain
 * <script> so it ships in the static HTML.
 */
export function EventJsonLd({
  event,
  url
}: {
  event: EventDetail
  url: string
}) {
  const isOnline = event.location?.isOnline
  const image = getImageUrl(event.banner, { width: 1200, height: 630 })

  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.shortDescription,
    startDate: event.startAt,
    ...(event.endAt && { endDate: event.endAt }),
    eventAttendanceMode: isOnline
      ? 'https://schema.org/OnlineEventAttendanceMode'
      : 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    url,
    ...(image && { image: [image] }),
    location: isOnline
      ? {
          '@type': 'VirtualLocation',
          url: event.registrationUrl || url
        }
      : {
          '@type': 'Place',
          name: event.location?.name || 'Recife',
          ...(event.location?.address && {
            address: event.location.address
          })
        },
    organizer: {
      '@type': 'Organization',
      name: 'Recife Frontend Community',
      url: 'https://recifefrontend.com.br'
    },
    ...(event.registrationUrl && {
      offers: {
        '@type': 'Offer',
        url: event.registrationUrl,
        availability: 'https://schema.org/InStock'
      }
    }),
    ...(event.speakers?.length && {
      performer: event.speakers.map((speaker) => ({
        '@type': 'Person',
        name: speaker.name
      }))
    })
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
