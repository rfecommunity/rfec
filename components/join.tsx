import Image from 'next/image'

import TitleWithTag from './title-with-tag'
import { Button } from './ui/button'

const Join = () => {
  return (
    <section id="join" className="px-5 py-20 relative">
      <div className="container mx-auto text-white">
        <TitleWithTag className="text-2xl mb-6">
          Junte-se à comunidade!
        </TitleWithTag>
        <p className="text-base mb-12">
          Fique por dentro dos eventos, novidades e faça parte das nossas
          conversas. Entre agora no grupo da RFEC no WhatsApp!
        </p>
        <Button variant="secondary">Entrar na RFEC!</Button>
      </div>
      <div className="overflow-hidden absolute inset-0 z-[-1]">
        <Image
          src="/assets/pictures/picture10.jpeg"
          alt="RFEC Meetup"
          width={1536}
          height={1152}
          className="object-cover object-center h-full w-full"
        />
        <span className="absolute inset-0 bg-black/70"></span>
      </div>
    </section>
  )
}

export default Join
