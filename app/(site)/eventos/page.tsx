import { CalendarX } from 'lucide-react'
import type { Metadata } from 'next'

import { EventCard } from '@/components/events/event-card'
import { EventFilterBar } from '@/components/events/event-filter-bar'
import { Pagination } from '@/components/events/pagination'
import {
  getEventTags,
  getPastEvents,
  getUpcomingEvents
} from '@/sanity/lib/queries'
import type { EventStatus } from '@/sanity/lib/types'

export const metadata: Metadata = {
  title: 'Eventos | RFEC',
  description:
    'Confira os próximos eventos da Recife Frontend Community e explore o histórico de encontros passados.',
  alternates: { canonical: '/eventos' }
}

type SearchParams = {
  status?: string
  tag?: string
  pagina?: string
}

export default async function EventsPage({
  searchParams
}: {
  searchParams: Promise<SearchParams>
}) {
  const { status: statusParam, tag = '', pagina } = await searchParams
  const status: EventStatus = statusParam === 'past' ? 'past' : 'upcoming'
  const page = Math.max(1, Number(pagina) || 1)

  const tags = await getEventTags()

  const past = status === 'past' ? await getPastEvents({ tag, page }) : null
  const events = status === 'past' ? past!.items : await getUpcomingEvents(tag)

  const totalPages = past ? Math.ceil(past.total / past.pageSize) : 1

  function buildHref(targetPage: number) {
    const params = new URLSearchParams()
    params.set('status', 'past')
    if (tag) params.set('tag', tag)
    if (targetPage > 1) params.set('pagina', String(targetPage))
    return `/eventos?${params.toString()}`
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <header className="mb-8">
        <h1 className="text-3xl font-bold md:text-4xl">Eventos</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Encontros, workshops e meetups da Recife Frontend Community. Participe
          dos próximos e revisite os que já aconteceram.
        </p>
      </header>

      <div className="mb-8">
        <EventFilterBar tags={tags} status={status} activeTag={tag} />
      </div>

      {events.length > 0 ? (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <li key={event._id}>
              <EventCard event={event} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border py-16 text-center text-muted-foreground">
          <CalendarX className="size-10" />
          <p>
            {status === 'past'
              ? 'Nenhum evento passado por aqui ainda.'
              : 'Nenhum evento próximo no momento. Volte em breve!'}
          </p>
        </div>
      )}

      {status === 'past' && totalPages > 1 && (
        <div className="mt-10">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            buildHref={buildHref}
          />
        </div>
      )}
    </div>
  )
}
