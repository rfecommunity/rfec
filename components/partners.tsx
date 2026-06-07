'use client'

import AutoScroll from 'embla-carousel-auto-scroll'
import Image from 'next/image'

import TitleWithTag from './title-with-tag'
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel'

const Partners = () => {
  return (
    <section id="partners" className="px-5 py-20">
      <div className="container mx-auto">
        <TitleWithTag className="text-2xl mb-6">Parceiros</TitleWithTag>
        <p className="text-base mb-6">
          Conheça nossos parceiros que colaboram para o sucesso da Recife
          Front-End Community.
        </p>
      </div>
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
          <CarouselItem className="basis-1/2">
            <div className="flex flex-col gap-3 items-center">
              <Image
                src="/assets/images/fiap.png"
                alt="Logo da faculdade FIAP"
                width={150}
                height={150}
                className="rounded-lg"
              />
              <p className="font-semibold underline">Faculdade FIAP</p>
            </div>
          </CarouselItem>
          <CarouselItem className="basis-1/2">
            <div className="flex flex-col gap-3 items-center">
              <Image
                src="/assets/images/iv.png"
                alt="Logo da comunidade IV"
                width={150}
                height={150}
                className="rounded-lg"
              />
              <p className="font-semibold underline">Comunidade IV</p>
            </div>
          </CarouselItem>
          <CarouselItem className="basis-1/2">
            <div className="flex flex-col gap-3 items-center">
              <Image
                src="/assets/images/fiap.png"
                alt="Logo da faculdade FIAP"
                width={150}
                height={150}
                className="rounded-lg"
              />
              <p className="font-semibold underline">Faculdade FIAP</p>
            </div>
          </CarouselItem>
          <CarouselItem className="basis-1/2">
            <div className="flex flex-col gap-3 items-center">
              <Image
                src="/assets/images/iv.png"
                alt="Logo da comunidade IV"
                width={150}
                height={150}
                className="rounded-lg"
              />
              <p className="font-semibold underline">Comunidade IV</p>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </section>
  )
}

export default Partners
