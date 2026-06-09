import type { PortableTextBlock } from '@portabletext/react'

/** A Sanity image reference as projected by our GROQ queries. */
export type SanityImage = {
  _type?: 'image'
  asset?: { _ref: string; _type: 'reference' }
  alt?: string
  hotspot?: { x: number; y: number; height: number; width: number }
  crop?: { top: number; bottom: number; left: number; right: number }
}

export type TagRef = {
  title: string
  slug: string
}

export type EventTypeRef = {
  title: string
  slug: string
}

export type EventLocation = {
  name?: string
  address?: string
  mapUrl?: string
  isOnline?: boolean
}

export type SocialLink = {
  _key?: string
  platform?: string
  url?: string
}

export type Speaker = {
  _id: string
  name: string
  photo?: SanityImage
  role?: string
  company?: string
  bio?: PortableTextBlock[]
  social?: SocialLink[]
}

/** Lighter speaker shape embedded inside agenda items. */
export type SpeakerSummary = Pick<
  Speaker,
  '_id' | 'name' | 'photo' | 'role' | 'company'
>

export type Sponsor = {
  _id: string
  name: string
  logo?: SanityImage
  website?: string
  tier?: string
}

export type AgendaItem = {
  _key: string
  title: string
  description?: string
  startTime?: string
  endTime?: string
  speaker?: SpeakerSummary | null
}

export type GalleryPhoto = {
  _key: string
  image: SanityImage
  caption?: string
  isHighlight?: boolean
}

export type LinkedResource = {
  _key?: string
  label?: string
  url?: string
}

export type PastAssets = {
  slidesUrl?: string
  videoUrls?: string[]
  repositories?: LinkedResource[]
  resources?: LinkedResource[]
}

/** Card shape used on the listing page. */
export type EventListItem = {
  _id: string
  title: string
  slug: string
  shortDescription?: string
  startAt: string
  endAt?: string
  banner?: SanityImage
  location?: EventLocation
  eventType?: EventTypeRef | null
  tags?: TagRef[]
}

/** Full event shape for the detail page. */
export type EventDetail = EventListItem & {
  fullDescription?: PortableTextBlock[]
  registrationUrl?: string
  featured?: boolean
  seo?: {
    title?: string
    description?: string
    ogImage?: SanityImage
  }
  agenda?: AgendaItem[]
  speakers?: Speaker[]
  sponsors?: Sponsor[]
  gallery?: {
    cover?: SanityImage
    externalAlbumUrl?: string
    highlights?: GalleryPhoto[]
    photoCount?: number
  }
  pastAssets?: PastAssets
}

/** Full gallery for the dedicated gallery page. */
export type EventGallery = {
  title: string
  slug: string
  gallery?: {
    cover?: SanityImage
    externalAlbumUrl?: string
    photos?: GalleryPhoto[]
  }
}

export type EventStatus = 'upcoming' | 'past'
