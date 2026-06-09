import { Clock } from 'lucide-react'

import type { AgendaItem } from '@/sanity/lib/types'

export function EventAgenda({ items }: { items?: AgendaItem[] }) {
  if (!items?.length) return null

  return (
    <section aria-labelledby="agenda-heading">
      <h2 id="agenda-heading" className="mb-6 text-2xl font-semibold">
        Programação
      </h2>
      <ol className="space-y-4">
        {items.map((item) => {
          const time = [item.startTime, item.endTime]
            .filter(Boolean)
            .join(' – ')
          return (
            <li
              key={item._key}
              className="flex flex-col gap-1 rounded-lg border border-border p-4 sm:flex-row sm:gap-6"
            >
              {time && (
                <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground sm:w-32 sm:shrink-0">
                  <Clock className="size-4" />
                  {time}
                </div>
              )}
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold">{item.title}</h3>
                {item.speaker?.name && (
                  <p className="text-sm text-muted-foreground">
                    {item.speaker.name}
                    {item.speaker.role ? ` · ${item.speaker.role}` : ''}
                  </p>
                )}
                {item.description && (
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
