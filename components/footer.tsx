import { Github, Linkedin, Instagram, Mail } from 'lucide-react'

import RFECLogo from './logo'

const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-white py-12 md:py-10 lg:flex lg:justify-center lg:items-center">
      <div className="container sm:max-w-full px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-12">
          <div className="space-y-3">
            <RFECLogo variant="light" className="w-[140px] h-auto" />
            <p className="text-sm text-muted-foreground">
              Recife Front-End Community - Conectando desenvolvedores e
              impulsionando o conhecimento.
            </p>
            <div className="flex space-x-3 border-b border-muted-foreground lg:border-none pb-8">
              <a
                href="https://github.com/rfecommunity"
                target="_blank"
                rel="noopener noreferrer"
                className="group h-9 w-9 flex items-center justify-center rounded-md border hover:bg-muted transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5 group-hover:stroke-zinc-950 transition-colors" />
              </a>
              <a
                href="https://www.linkedin.com/company/recife-front-end-community/"
                target="_blank"
                rel="noopener noreferrer"
                className="group h-9 w-9 flex items-center justify-center rounded-md border hover:bg-muted transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 group-hover:stroke-zinc-950 transition-colors" />
              </a>
              <a
                href="https://instagram.com/rfecommunity"
                target="_blank"
                rel="noopener noreferrer"
                className="group h-9 w-9 flex items-center justify-center rounded-md border hover:bg-muted transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 group-hover:stroke-zinc-950 transition-colors" />
              </a>
              <a
                href="mailto:recifefrontendcommunity@gmail.com"
                className="group h-9 w-9 flex items-center justify-center rounded-md border hover:bg-muted transition-colors"
              >
                <Mail className="h-5 w-5 group-hover:stroke-zinc-950 transition-colors" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-2">Sobre a RFEC</h4>
            <nav className="flex flex-col space-y-2">
              <a href="#" className="text-sm hover:underline">
                Início
              </a>
              <a href="#about" className="text-sm hover:underline">
                Quem Somos
              </a>
              <a href="#mission" className="text-sm hover:underline">
                Nossa Missão
              </a>
              <a href="#join" className="text-sm hover:underline">
                Faça Parte
              </a>
              <a href="#partners" className="text-sm hover:underline">
                Parceiros
              </a>
            </nav>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-muted-foreground flex flex-col md:flex-row lg:items-center justify-between lg:justify-center">
          <p className="text-xs text-muted-foreground text-center">
            &copy; 2025 Recife Front-End Community. <br /> Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
