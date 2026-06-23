import Image from 'next/image'

import { getImageUrl } from '@/sanity/lib/image'
import { getHomePage } from '@/sanity/lib/queries'

import TitleWithTag from './title-with-tag'
import { Button } from './ui/button'

const Join = async () => {
  const home = await getHomePage()
  const background = home?.joinBackground
  const backgroundUrl = getImageUrl(background, { width: 1536, height: 1152 })

  return (
    <section id="join" className="relative scroll-mt-20 px-5 py-20 lg:py-28">
      <div className="container mx-auto text-white">
        <TitleWithTag className="mb-6 text-2xl md:text-3xl lg:text-4xl">
          Junte-se à comunidade!
        </TitleWithTag>
        <p className="mb-12 text-base md:max-w-2xl md:text-lg">
          Fique por dentro dos eventos, novidades e faça parte das nossas
          conversas. Entre agora no grupo da RFEC no WhatsApp!
        </p>
        <Button variant="secondary" className="md:h-11 md:px-8 md:text-base">
          Entrar na RFEC!
        </Button>
      </div>
      <div className="absolute inset-0 z-[-1] overflow-hidden bg-zinc-900">
        {backgroundUrl && (
          <Image
            src={backgroundUrl}
            alt={background?.alt ?? ''}
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        )}
        <span className="absolute inset-0 bg-black/70"></span>
      </div>
    </section>
  )
}

export default Join
