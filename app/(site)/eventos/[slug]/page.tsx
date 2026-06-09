import { ArrowLeft, CalendarDays, MapPin } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { EventAgenda } from '@/components/events/event-agenda'
import { EventGalleryPreview } from '@/components/events/event-gallery-preview'
import { EventJsonLd } from '@/components/events/event-json-ld'
import { EventPastAssets } from '@/components/events/event-past-assets'
import { EventSpeakers } from '@/components/events/event-speakers'
import { EventSponsors } from '@/components/events/event-sponsors'
import { RichText } from '@/components/events/portable-text'
import { RegistrationButton } from '@/components/events/registration-button'
import { Badge } from '@/components/ui/badge'
import { formatEventDateTime, isPastEvent } from '@/lib/events'
import { absoluteUrl } from '@/lib/site'
import { getImageUrl } from '@/sanity/lib/image'
import { getEventBySlug, getEventSlugs } from '@/sanity/lib/queries'

export async function generateStaticParams() {
  const slugs = await getEventSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const event = await getEventBySlug(slug)

  if (!event) {
    return { title: 'Evento não encontrado | RFEC' }
  }

  const title = event.seo?.title || event.title
  const description = event.seo?.description || event.shortDescription
  const ogImage = getImageUrl(event.seo?.ogImage ?? event.banner, {
    width: 1200,
    height: 630
  })
  const canonical = `/eventos/${event.slug}`

  return {
    title: `${title} | RFEC`,
    description,
    alternates: { canonical },
    openGraph: {
      type: 'article',
      title,
      description,
      url: canonical,
      ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630 }] })
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(ogImage && { images: [ogImage] })
    }
  }
}

export default async function EventDetailPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const event = await getEventBySlug(slug)

  if (!event) notFound()

  const banner = getImageUrl(event.banner, { width: 1600, height: 720 })
  const past = isPastEvent(event)
  const locationText = event.location?.isOnline
    ? 'Online'
    : [event.location?.name, event.location?.address]
        .filter(Boolean)
        .join(' — ')

  return (
    <article className="pb-16">
      <EventJsonLd event={event} url={absoluteUrl(`/eventos/${event.slug}`)} />

      {banner && (
        <div className="relative aspect-[21/9] w-full bg-muted">
          <Image
            src={banner}
            alt={event.banner?.alt || event.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl py-8 md:py-12">
          <Link
            href="/eventos"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> Voltar para eventos
          </Link>

          <header className="mt-6 flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {event.eventType && (
                <Badge variant="secondary">{event.eventType.title}</Badge>
              )}
              {event.tags?.map((tag) => (
                <Badge key={tag.slug} variant="outline">
                  {tag.title}
                </Badge>
              ))}
            </div>

            <h1 className="text-3xl font-bold md:text-4xl">{event.title}</h1>

            <div className="flex flex-col gap-2 text-muted-foreground">
              <p className="flex items-center gap-2">
                <CalendarDays className="size-5" />
                <time dateTime={event.startAt}>
                  {formatEventDateTime(event.startAt)}
                </time>
              </p>
              {locationText && (
                <p className="flex items-center gap-2">
                  <MapPin className="size-5" />
                  {event.location?.mapUrl ? (
                    <a
                      href={event.location.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4"
                    >
                      {locationText}
                    </a>
                  ) : (
                    locationText
                  )}
                </p>
              )}
            </div>

            {!past && event.registrationUrl && (
              <div className="pt-2">
                <RegistrationButton url={event.registrationUrl} />
              </div>
            )}
          </header>

          <div className="mt-10 space-y-12">
            {event.fullDescription && (
              <section aria-label="Sobre o evento">
                <RichText value={event.fullDescription} />
              </section>
            )}

            <EventAgenda items={event.agenda} />
            <EventSpeakers speakers={event.speakers} />
            <EventGalleryPreview
              slug={event.slug}
              highlights={event.gallery?.highlights}
              photoCount={event.gallery?.photoCount}
              externalAlbumUrl={event.gallery?.externalAlbumUrl}
            />
            {past && <EventPastAssets assets={event.pastAssets} />}
            <EventSponsors sponsors={event.sponsors} />
          </div>
        </div>
      </div>
    </article>
  )
}
