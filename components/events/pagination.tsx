import Link from 'next/link'

import { cn } from '@/lib/utils'

/**
 * Server-rendered, link-based pagination so deep links stay shareable and the
 * past-events archive never renders everything at once.
 */
export function Pagination({
  currentPage,
  totalPages,
  buildHref
}: {
  currentPage: number
  totalPages: number
  buildHref: (page: number) => string
}) {
  if (totalPages <= 1) return null

  const hasPrev = currentPage > 1
  const hasNext = currentPage < totalPages

  const linkClass =
    'inline-flex h-9 items-center rounded-md border border-input bg-background px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground'
  const disabledClass = 'pointer-events-none opacity-50'

  return (
    <nav
      className="flex items-center justify-between gap-4"
      aria-label="Paginação dos eventos passados"
    >
      <Link
        href={buildHref(currentPage - 1)}
        aria-disabled={!hasPrev}
        tabIndex={hasPrev ? undefined : -1}
        className={cn(linkClass, !hasPrev && disabledClass)}
      >
        Anterior
      </Link>

      <span className="text-sm text-muted-foreground">
        Página {currentPage} de {totalPages}
      </span>

      <Link
        href={buildHref(currentPage + 1)}
        aria-disabled={!hasNext}
        tabIndex={hasNext ? undefined : -1}
        className={cn(linkClass, !hasNext && disabledClass)}
      >
        Próxima
      </Link>
    </nav>
  )
}
