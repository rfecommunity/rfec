import Image from 'next/image'

import TitleWithTag from './title-with-tag'

const Mission = () => {
  return (
    <section id="mission" className="px-5 py-20 bg-white text-black">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="lg:order-1 order-2">
            <TitleWithTag className="text-2xl mb-6 xl:text-3xl">
              Nossa Missão
            </TitleWithTag>
            <p className="text-base mb-6 max-w-md">
              Promover troca de experiências, eventos e gerar oportunidades para
              as pessoas da comunidade se conectarem, aprenderem e brilharem no
              mundo da tecnologia.
            </p>
          </div>

          <div className="grid grid-rows-3 grid-cols-1 gap-5 h-[500px] lg:h-[600px]">
            <div className="overflow-hidden rounded-lg relative row-span-2">
              <Image
                src="/assets/pictures/picture1.jpeg"
                alt="Celebro da RFEC"
                width={1536}
                height={1152}
                className="object-cover object-center h-full w-full"
              />
              <span className="absolute inset-0 bg-black/40"></span>
            </div>
            <div className="rounded-lg grid grid-cols-2 gap-5 overflow-hidden">
              <div className="overflow-hidden rounded-lg relative">
                <Image
                  src="/assets/pictures/picture2.jpeg"
                  alt="RFEC Meetup"
                  width={512}
                  height={512}
                  className="object-cover object-center h-full w-full"
                />
                <span className="absolute inset-0 bg-black/40"></span>
              </div>
              <div className="overflow-hidden rounded-lg relative">
                <Image
                  src="/assets/pictures/picture8.jpeg"
                  alt="RFEC Meetup"
                  width={512}
                  height={512}
                  className="object-cover object-center h-full w-full"
                />
                <span className="absolute inset-0 bg-black/40"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Mission
