'use client'

import AutoScroll from 'embla-carousel-auto-scroll'
import Image from 'next/image'

import TitleWithTag from './title-with-tag'
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from './ui/carousel'

const partners = [
  {
    name: 'Faculdade FIAP',
    logo: '/assets/images/partners/fiap.png',
    alt: 'Logo da faculdade FIAP'
  },
  {
    name: 'Comunidade IV',
    logo: '/assets/images/partners/iv.png',
    alt: 'Logo da comunidade IV'
  },
  {
    name: 'Alura',
    logo: '/assets/images/partners/alura.png',
    alt: 'Logo da Alura'
  }
]

const Partners = () => {
  return (
    <section id="partners" className="px-5 py-20">
      <div className="container mx-auto">
        <TitleWithTag className="text-2xl mb-6 xl:text-3xl">Parceiros</TitleWithTag>
        <p className="text-base mb-12">
          Conheça nossos parceiros que colaboram para o sucesso da Recife
          Front-End Community.
        </p>

        <div className="block lg:hidden">
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
              {partners.map((partner) => (
                <CarouselItem key={partner.name} className="basis-2/4">
                  <div className="flex flex-col gap-3 items-center">
                    <Image
                      src={partner.logo}
                      alt={partner.alt}
                      width={150}
                      height={150}
                      className="rounded-lg"
                    />
                    <p className="font-semibold underline">{partner.name}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        <div className="hidden lg:grid grid-cols-3 gap-10 place-items-center">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex flex-col gap-3 items-center"
            >
              <Image
                src={partner.logo}
                alt={partner.alt}
                width={150}
                height={150}
                className="rounded-lg"
              />
              <p className="font-semibold underline">{partner.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Partners
