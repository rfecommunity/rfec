import Image from 'next/image'

import TitleWithTag from './title-with-tag'

const WhoWeAre = () => {
  return (
    <section id="about" className="bg-zinc-950 text-white px-5 py-20">
      <div className="container mx-auto">
        <TitleWithTag className="text-2xl mb-6">Quem somos</TitleWithTag>
        <p className="text-base mb-6">
          Uma comunidade que prioriza aprendizado, conexão e troca de
          experiências para devs front-end e entusiastas de tecnologia no
          Recife.
        </p>
        <div className="grid grid-rows-3 grid-cols-1 gap-5 h-96">
          <div className="overflow-hidden rounded-lg relative row-span-2">
            <Image
              src="/assets/pictures/picture10.jpeg"
              alt="Celebro da RFEC"
              width={1536}
              height={1152}
              className="object-cover object-center h-full w-full"
            />
            <span className="absolute inset-0 bg-black/40"></span>
          </div>
          <div className="rounded-lg grid grid-cols-4 gap-5 overflow-hidden">
            <div className="overflow-hidden rounded-lg relative col-span-2">
              <Image
                src="/assets/pictures/picture6.jpeg"
                alt="RFEC Meetup"
                width={512}
                height={512}
                className="object-cover object-center h-full w-full"
              />
              <span className="absolute inset-0 bg-black/40"></span>
            </div>
            <div className="overflow-hidden rounded-lg relative">
              <Image
                src="/assets/pictures/picture14.jpeg"
                alt="RFEC Meetup"
                width={512}
                height={512}
                className="object-cover object-center h-full w-full"
              />
              <span className="absolute inset-0 bg-black/40"></span>
            </div>
            <div className="overflow-hidden rounded-lg relative">
              <Image
                src="/assets/pictures/picture11.jpeg"
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
    </section>
  )
}

export default WhoWeAre
