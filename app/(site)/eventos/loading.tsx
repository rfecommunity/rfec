export default function EventsLoading() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="mb-8 space-y-3">
        <div className="h-9 w-48 animate-pulse rounded-md bg-muted" />
        <div className="h-5 w-full max-w-2xl animate-pulse rounded-md bg-muted" />
      </div>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <li
            key={index}
            className="overflow-hidden rounded-xl border border-border"
          >
            <div className="aspect-video animate-pulse bg-muted" />
            <div className="space-y-2 p-4">
              <div className="h-4 w-24 animate-pulse rounded bg-muted" />
              <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
              <div className="h-4 w-full animate-pulse rounded bg-muted" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
