import { defineQuery } from 'next-sanity'

import { EVENTS_TAG, eventTag, sanityFetch, SITE_TAG } from './fetch'
import type {
  EventDetail,
  EventGallery,
  EventListItem,
  HomePage,
  Partner,
  TagRef
} from './types'

/** Shared projection for event cards on the listing page. */
const CARD_PROJECTION = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  shortDescription,
  startAt,
  endAt,
  banner,
  location,
  "eventType": eventType->{ title, "slug": slug.current },
  "tags": tags[]->{ title, "slug": slug.current }
`

/**
 * "Upcoming" / "past" is derived from the event date vs. GROQ's `now()` — never a
 * manual boolean. Using `now()` (evaluated server-side) instead of a `$now` param
 * keeps the cache key stable, so results stay cached until a webhook or the
 * time-based safety net revalidates them. `coalesce(endAt, startAt)` keeps
 * multi-day events "upcoming" until they actually finish.
 */
const UPCOMING_FILTER = `coalesce(endAt, startAt) >= now()`
const PAST_FILTER = `coalesce(endAt, startAt) < now()`
const TAG_FILTER = `($tag == "" || $tag in tags[]->slug.current)`

const UPCOMING_EVENTS_QUERY = defineQuery(`
  *[_type == "event" && defined(slug.current) && ${UPCOMING_FILTER} && ${TAG_FILTER}]
    | order(startAt asc) {
      ${CARD_PROJECTION}
    }
`)

const PAST_EVENTS_QUERY = defineQuery(`
  *[_type == "event" && defined(slug.current) && ${PAST_FILTER} && ${TAG_FILTER}]
    | order(startAt desc) [$start...$end] {
      ${CARD_PROJECTION}
    }
`)

const PAST_EVENTS_COUNT_QUERY = defineQuery(`
  count(*[_type == "event" && defined(slug.current) && ${PAST_FILTER} && ${TAG_FILTER}])
`)

const TAGS_QUERY = defineQuery(`
  *[_type == "tag" && count(*[_type == "event" && references(^._id)]) > 0]
    | order(title asc) {
      title,
      "slug": slug.current
    }
`)

const EVENT_SLUGS_QUERY = defineQuery(`
  *[_type == "event" && defined(slug.current)].slug.current
`)

const EVENT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "event" && slug.current == $slug][0]{
    ${CARD_PROJECTION},
    fullDescription,
    registrationUrl,
    featured,
    seo,
    agenda[]{
      _key, title, description, startTime, endTime,
      "speaker": speaker->{ _id, name, photo, role, company }
    },
    "speakers": speakers[]->{ _id, name, photo, role, company, bio, social },
    "sponsors": sponsors[]->{ _id, name, logo, website, tier },
    gallery{
      cover,
      externalAlbumUrl,
      "highlights": photos[isHighlight == true]{ _key, image, caption, isHighlight },
      "photoCount": count(photos)
    },
    pastAssets
  }
`)

const EVENT_GALLERY_QUERY = defineQuery(`
  *[_type == "event" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    gallery{
      cover,
      externalAlbumUrl,
      photos[]{ _key, image, caption, isHighlight }
    }
  }
`)

const PAST_PAGE_SIZE = 9

export async function getUpcomingEvents(tag = ''): Promise<EventListItem[]> {
  const events = await sanityFetch<EventListItem[]>({
    query: UPCOMING_EVENTS_QUERY,
    params: { tag },
    tags: [EVENTS_TAG]
  })
  return events ?? []
}

export async function getPastEvents({
  tag = '',
  page = 1,
  pageSize = PAST_PAGE_SIZE
}: {
  tag?: string
  page?: number
  pageSize?: number
} = {}): Promise<{ items: EventListItem[]; total: number; pageSize: number }> {
  const start = (page - 1) * pageSize
  const params = { tag, start, end: start + pageSize }

  const [items, total] = await Promise.all([
    sanityFetch<EventListItem[]>({
      query: PAST_EVENTS_QUERY,
      params,
      tags: [EVENTS_TAG]
    }),
    sanityFetch<number>({
      query: PAST_EVENTS_COUNT_QUERY,
      params,
      tags: [EVENTS_TAG]
    })
  ])

  return { items: items ?? [], total: total ?? 0, pageSize }
}

export async function getEventTags(): Promise<TagRef[]> {
  const tags = await sanityFetch<TagRef[]>({
    query: TAGS_QUERY,
    tags: [EVENTS_TAG]
  })
  return tags ?? []
}

export async function getEventSlugs(): Promise<string[]> {
  const slugs = await sanityFetch<string[]>({
    query: EVENT_SLUGS_QUERY,
    tags: [EVENTS_TAG]
  })
  return slugs ?? []
}

export async function getEventBySlug(
  slug: string
): Promise<EventDetail | null> {
  return sanityFetch<EventDetail>({
    query: EVENT_BY_SLUG_QUERY,
    params: { slug },
    tags: [EVENTS_TAG, eventTag(slug)]
  })
}

export async function getEventGallery(
  slug: string
): Promise<EventGallery | null> {
  return sanityFetch<EventGallery>({
    query: EVENT_GALLERY_QUERY,
    params: { slug },
    tags: [EVENTS_TAG, eventTag(slug)]
  })
}

const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "homePage"][0]{
    aboutImages,
    missionImages,
    joinBackground
  }
`)

const PARTNERS_QUERY = defineQuery(`
  *[_type == "partner" && defined(logo.asset)]
    | order(coalesce(order, 999) asc, name asc) {
      _id,
      name,
      logo,
      website
    }
`)

export async function getHomePage(): Promise<HomePage | null> {
  return sanityFetch<HomePage>({
    query: HOME_PAGE_QUERY,
    tags: [SITE_TAG]
  })
}

export async function getPartners(): Promise<Partner[]> {
  const partners = await sanityFetch<Partner[]>({
    query: PARTNERS_QUERY,
    tags: [SITE_TAG]
  })
  return partners ?? []
}
