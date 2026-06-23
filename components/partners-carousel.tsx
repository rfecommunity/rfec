'use client'

import AutoScroll from 'embla-carousel-auto-scroll'
import Image from 'next/image'

import { getImageUrl } from '@/sanity/lib/image'
import type { Partner } from '@/sanity/lib/types'

import { Carousel, CarouselContent, CarouselItem } from './ui/carousel'

type PartnersCarouselProps = {
  partners: Partner[]
}

const PartnersCarousel = ({ partners }: PartnersCarouselProps) => {
  return (
    <Carousel
      opts={{
        align: 'center',
        loop: true
      }}
      plugins={[
        AutoScroll({
          active: true,
          speed: 0.5
        })
      ]}
    >
      <CarouselContent>
        {partners.map((partner) => {
          const logoUrl = getImageUrl(partner.logo, { width: 150, height: 150 })
          return (
            <CarouselItem
              key={partner._id}
              className="basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <div className="flex flex-col items-center gap-3">
                {logoUrl && (
                  <Image
                    src={logoUrl}
                    alt={partner.logo?.alt ?? `Logo ${partner.name}`}
                    width={150}
                    height={150}
                    className="rounded-lg"
                  />
                )}
                {partner.website ? (
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold underline"
                  >
                    {partner.name}
                  </a>
                ) : (
                  <p className="font-semibold underline">{partner.name}</p>
                )}
              </div>
            </CarouselItem>
          )
        })}
      </CarouselContent>
    </Carousel>
  )
}

export default PartnersCarousel
