import { ArrowDown } from 'lucide-react'
import Link from 'next/link'

import { Button } from './ui/button'

const Hero = () => {
  return (
    <section className="px-5 py-20 text-center">
      <span className="inline-block rounded-full bg-muted-foreground/10 text-muted-foreground px-3 py-1 text-xs font-semibold uppercase tracking-widest mb-2 shadow-sm">
        Recife Front-End Community
      </span>
      <h1 className="text-4xl font-bold tracking-tight leading-tight mb-6">
        Conectando <br /> quem{' '}
        <span className="text-blue-500">constrói a web</span> em Recife
      </h1>
      <p className="mb-8 text-lg">
        Somos uma comunidade que promove aprendizado, networking e troca de
        experiências para desenvolvedores front-end e entusiastas de tecnologia.
      </p>
      <Button asChild>
        <Link href="#about">
          Saiba mais <ArrowDown />
        </Link>
      </Button>
    </section>
  )
}

export default Hero
