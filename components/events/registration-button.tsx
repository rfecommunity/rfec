import { ExternalLink } from 'lucide-react'

import { Button } from '@/components/ui/button'

/**
 * External registration CTA (Sympla). Registration is never handled on-platform.
 * Reuses the `Button asChild` external-link pattern from the site Header.
 */
export function RegistrationButton({
  url,
  className,
  label = 'Inscreva-se'
}: {
  url?: string
  className?: string
  label?: string
}) {
  if (!url) return null

  return (
    <Button asChild size="lg" className={className}>
      <a href={url} target="_blank" rel="noopener noreferrer">
        {label} <ExternalLink />
      </a>
    </Button>
  )
}
