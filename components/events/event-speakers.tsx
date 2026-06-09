import {
  Github,
  Globe,
  Instagram,
  Linkedin,
  Twitter,
  type LucideIcon
} from 'lucide-react'
import Image from 'next/image'

import { RichText } from '@/components/events/portable-text'
import { getImageUrl } from '@/sanity/lib/image'
import type { Speaker } from '@/sanity/lib/types'

const SOCIAL_ICONS: Record<string, LucideIcon> = {
  linkedin: Linkedin,
  github: Github,
  x: Twitter,
  instagram: Instagram,
  website: Globe,
  other: Globe
}

export function EventSpeakers({ speakers }: { speakers?: Speaker[] }) {
  if (!speakers?.length) return null

  return (
    <section aria-labelledby="speakers-heading">
      <h2 id="speakers-heading" className="mb-6 text-2xl font-semibold">
        Palestrantes
      </h2>
      <ul className="grid gap-6 sm:grid-cols-2">
        {speakers.map((speaker) => {
          const photo = getImageUrl(speaker.photo, { width: 160, height: 160 })
          return (
            <li
              key={speaker._id}
              className="flex gap-4 rounded-lg border border-border p-4"
            >
              <div className="relative size-20 shrink-0 overflow-hidden rounded-full bg-muted">
                {photo && (
                  <Image
                    src={photo}
                    alt={speaker.photo?.alt || speaker.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold">{speaker.name}</h3>
                {(speaker.role || speaker.company) && (
                  <p className="text-sm text-muted-foreground">
                    {[speaker.role, speaker.company]
                      .filter(Boolean)
                      .join(' @ ')}
                  </p>
                )}
                {speaker.bio && (
                  <div className="text-sm text-muted-foreground [&_p]:mb-2">
                    <RichText value={speaker.bio} />
                  </div>
                )}
                {speaker.social && speaker.social.length > 0 && (
                  <div className="mt-1 flex gap-3">
                    {speaker.social.map((link, index) => {
                      const Icon =
                        SOCIAL_ICONS[link.platform ?? 'other'] ?? Globe
                      if (!link.url) return null
                      return (
                        <a
                          key={link._key ?? index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={link.platform ?? 'Link'}
                          className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <Icon className="size-5" />
                        </a>
                      )
                    })}
                  </div>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
