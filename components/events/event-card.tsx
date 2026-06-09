import { CalendarDays, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { formatEventDate } from '@/lib/events'
import { getImageUrl } from '@/sanity/lib/image'
import type { EventListItem } from '@/sanity/lib/types'

export function EventCard({ event }: { event: EventListItem }) {
  const banner = getImageUrl(event.banner, { width: 640, height: 360 })

  return (
    <Link
      href={`/eventos/${event.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="relative aspect-video overflow-hidden bg-muted">
        {banner ? (
          <Image
            src={banner}
            alt={event.banner?.alt || event.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            <CalendarDays className="size-10" />
          </div>
        )}
        {event.eventType && (
          <Badge className="absolute left-3 top-3" variant="secondary">
            {event.eventType.title}
          </Badge>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <time
          dateTime={event.startAt}
          className="flex items-center gap-1.5 text-sm text-muted-foreground"
        >
          <CalendarDays className="size-4" />
          {formatEventDate(event.startAt)}
        </time>

        <h3 className="text-lg font-semibold leading-snug">{event.title}</h3>

        {event.shortDescription && (
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {event.shortDescription}
          </p>
        )}

        {event.location?.name && (
          <p className="mt-auto flex items-center gap-1.5 pt-1 text-sm text-muted-foreground">
            <MapPin className="size-4" />
            {event.location.isOnline ? 'Online' : event.location.name}
          </p>
        )}

        {event.tags && event.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {event.tags.map((tag) => (
              <Badge key={tag.slug} variant="outline">
                {tag.title}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
