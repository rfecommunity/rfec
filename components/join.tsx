import Image from 'next/image'

import TitleWithTag from './title-with-tag'
import { Button } from './ui/button'

const Join = () => {
  return (
    <section id="join" className="px-5 py-20 relative">
      <div className="absolute inset-0 z-[-1]">
        <Image
          src="/assets/pictures/picture10.jpeg"
          alt="RFEC Meetup"
          width={1536}
          height={1152}
          className="object-cover object-center h-full w-full"
        />
        <span className="absolute inset-0 bg-black/70"></span>
      </div>

      <div className="container mx-auto text-white flex flex-col justify-center items-start h-full lg:min-h-[500px] lg:max-w-2xl">
        <TitleWithTag className="text-3xl lg:text-4xl mb-6">
          Junte-se à comunidade!
        </TitleWithTag>
        <p className="text-base lg:text-lg mb-8">
          Fique por dentro dos eventos, novidades e faça parte das nossas
          conversas. Entre agora no grupo da RFEC no WhatsApp!
        </p>
        <Button
          asChild
          variant="secondary"
          size="lg"
          className="cursor-pointer"
        >
          <a
            href="https://chat.whatsapp.com/GSWOYPiW3WDIadID2E3xwd"
            target="_blank"
            rel="noopener noreferrer"
          >
            Entrar na RFEC!
          </a>
        </Button>
      </div>
    </section>
  )
}

export default Join
