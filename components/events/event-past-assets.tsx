import { FileText, Github, Link2, Video } from 'lucide-react'

import type { PastAssets } from '@/sanity/lib/types'

export function EventPastAssets({ assets }: { assets?: PastAssets }) {
  if (!assets) return null

  const hasContent =
    assets.slidesUrl ||
    assets.videoUrls?.length ||
    assets.repositories?.length ||
    assets.resources?.length

  if (!hasContent) return null

  const linkClass =
    'inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4'

  return (
    <section aria-labelledby="assets-heading">
      <h2 id="assets-heading" className="mb-6 text-2xl font-semibold">
        Materiais
      </h2>
      <div className="flex flex-col gap-3">
        {assets.slidesUrl && (
          <a
            href={assets.slidesUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            <FileText className="size-4" /> Slides
          </a>
        )}

        {assets.videoUrls?.map((url) => (
          <a
            key={url}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            <Video className="size-4" /> Vídeo
          </a>
        ))}

        {assets.repositories?.map((repo, index) => (
          <a
            key={repo._key ?? index}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            <Github className="size-4" /> {repo.label}
          </a>
        ))}

        {assets.resources?.map((resource, index) => (
          <a
            key={resource._key ?? index}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            <Link2 className="size-4" /> {resource.label}
          </a>
        ))}
      </div>
    </section>
  )
}
