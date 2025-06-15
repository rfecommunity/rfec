import { ArrowRight } from 'lucide-react'

import RFECLogo from './logo'
import { Button } from './ui/button'

const Header = () => {
  return (
    <header className="w-full bg-background border-b border-border sticky top-0 z-30">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 lg:py-4">
        <RFECLogo className="w-[110px] md:w-[140px] h-auto" />
        <Button asChild variant="link" className="underline">
          <a href="#join">
            Faça Parte <ArrowRight />
          </a>
        </Button>
      </div>
    </header>
  )
}

export default Header
