'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { cn } from '@/lib/utils'
import type { EventStatus } from '@/sanity/lib/types'
import type { TagRef } from '@/sanity/lib/types'

const STATUS_TABS: { value: EventStatus; label: string }[] = [
  { value: 'upcoming', label: 'Próximos' },
  { value: 'past', label: 'Passados' }
]

export function EventFilterBar({
  tags,
  status,
  activeTag
}: {
  tags: TagRef[]
  status: EventStatus
  activeTag: string
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function update(next: { status?: EventStatus; tag?: string }) {
    const params = new URLSearchParams(searchParams.toString())

    if (next.status !== undefined) params.set('status', next.status)
    if (next.tag !== undefined) {
      if (next.tag) params.set('tag', next.tag)
      else params.delete('tag')
    }
    // Any filter change resets pagination.
    params.delete('pagina')

    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div
        role="tablist"
        aria-label="Filtrar eventos por período"
        className="inline-flex rounded-lg border border-border bg-muted p-1"
      >
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={status === tab.value}
            onClick={() => update({ status: tab.value })}
            className={cn(
              'rounded-md px-4 py-1.5 text-sm font-medium transition-colors',
              status === tab.value
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {tags.length > 0 && (
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="sr-only sm:not-sr-only">Tag:</span>
          <select
            value={activeTag}
            onChange={(event) => update({ tag: event.target.value })}
            className="h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">Todas as tags</option>
            {tags.map((tag) => (
              <option key={tag.slug} value={tag.slug}>
                {tag.title}
              </option>
            ))}
          </select>
        </label>
      )}
    </div>
  )
}
