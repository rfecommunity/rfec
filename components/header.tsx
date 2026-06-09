import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import RFECLogo from './logo'
import { Button } from './ui/button'

const Header = () => {
  return (
    <header className="w-full bg-background border-b border-border sticky top-0 z-30">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 lg:py-4">
        <Link href="/" aria-label="Página inicial da RFEC">
          <RFECLogo className="w-[110px] md:w-[140px] h-auto" />
        </Link>
        <nav className="flex items-center gap-2 md:gap-4">
          <Button asChild variant="link" className="text-foreground">
            <Link href="/eventos">Eventos</Link>
          </Button>
          <Button asChild variant="link" className="underline">
            <Link href="/#join">
              Faça Parte <ArrowRight />
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}

export default Header
