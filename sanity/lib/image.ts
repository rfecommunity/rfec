import {
  createImageUrlBuilder,
  type SanityImageSource
} from '@sanity/image-url'

import { dataset, projectId } from '../env'

const builder = createImageUrlBuilder({ projectId, dataset })

/**
 * Returns an image-url builder for a Sanity image. Always chain explicit
 * dimensions and call `.url()` so we only request the sizes actually rendered:
 *
 *   urlForImage(banner).width(1200).height(630).url()
 *
 * `auto('format')` serves AVIF/WebP when supported; `fit('crop')` honors the
 * editor's hotspot/crop. Storage is not unlimited — never request the original.
 */
export function urlForImage(source: SanityImageSource) {
  return builder.image(source).auto('format').fit('crop')
}

type ImageLike = { asset?: { _ref?: string } } | undefined | null

/**
 * Null-safe URL helper for use in components. Returns `null` when the image has
 * no uploaded asset, so callers can render a placeholder instead of crashing.
 */
export function getImageUrl(
  source: ImageLike,
  { width, height }: { width: number; height?: number }
): string | null {
  if (!source?.asset?._ref) return null
  const url = urlForImage(source as SanityImageSource).width(width)
  return (height ? url.height(height) : url).url()
}
