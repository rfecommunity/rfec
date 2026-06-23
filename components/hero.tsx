import { ArrowDown } from 'lucide-react'
import Link from 'next/link'

import { Button } from './ui/button'

const Hero = () => {
  return (
    <section className="container mx-auto px-5 py-20 text-center lg:py-28">
      <span className="bg-muted-foreground/10 text-muted-foreground mb-2 inline-block rounded-full px-3 py-1 text-xs font-semibold tracking-widest uppercase shadow-sm">
        Recife Front-End Community
      </span>
      <h1 className="mb-6 text-4xl leading-tight font-bold tracking-tight md:text-5xl md:text-balance lg:text-6xl">
        Conectando <br /> quem{' '}
        <span className="text-blue-500">constrói a web</span> em Recife
      </h1>
      <p className="mb-8 text-lg md:mx-auto md:max-w-2xl md:text-xl md:text-pretty">
        Somos uma comunidade que promove aprendizado, networking e troca de
        experiências para desenvolvedores front-end e entusiastas de tecnologia.
      </p>
      <Button asChild className="md:h-11 md:px-8 md:text-base">
        <Link href="#about">
          Saiba mais <ArrowDown />
        </Link>
      </Button>
    </section>
  )
}

export default Hero
