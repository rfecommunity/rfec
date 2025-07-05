import { ArrowDown } from 'lucide-react'
import Link from 'next/link'

import { Button } from './ui/button'

const Hero = () => {
  return (
    <section className="px-5 py-24 text-center bg-gradient-to-b from-white to-zinc-50">
      <div className="max-w-3xl mx-auto">
        <span className="inline-block rounded-full bg-muted-foreground/10 text-muted-foreground px-4 py-1 text-xs lg:text-sm font-semibold uppercase tracking-widest mb-4 shadow-sm">
          Recife Front-End Community
        </span>

        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-6">
          Conectando <br />
          quem <span className="text-blue-600">constrói a web</span> em Recife
        </h1>

        <p className="mb-10 text-lg lg:text-xl text-muted-foreground">
          Somos uma comunidade que promove aprendizado, networking e troca de
          experiências para desenvolvedores front-end e entusiastas de
          tecnologia.
        </p>

        <Button asChild className="group">
          <Link 
            href="#about" 
            className="inline-flex items-center gap-2"
          >
            Saiba mais
            <ArrowDown className="h-5 w-5 group-hover:translate-y-1 transition-transform duration-200" />
          </Link>
        </Button>
      </div>
    </section>
  )
}

export default Hero
