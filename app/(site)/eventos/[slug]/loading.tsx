export default function EventDetailLoading() {
  return (
    <div>
      <div className="aspect-[21/9] w-full animate-pulse bg-muted" />
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl space-y-6 py-8 md:py-12">
          <div className="h-4 w-32 animate-pulse rounded bg-muted" />
          <div className="flex gap-2">
            <div className="h-6 w-20 animate-pulse rounded-md bg-muted" />
            <div className="h-6 w-16 animate-pulse rounded-md bg-muted" />
          </div>
          <div className="h-10 w-3/4 animate-pulse rounded bg-muted" />
          <div className="space-y-2">
            <div className="h-5 w-56 animate-pulse rounded bg-muted" />
            <div className="h-5 w-44 animate-pulse rounded bg-muted" />
          </div>
          <div className="space-y-2 pt-6">
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
          </div>
        </div>
      </div>
    </div>
  )
}
