import 'server-only'

/**
 * Server-only read token used for draft/preview content. Guarded by the
 * `server-only` import so it can never leak into a client bundle. Empty when
 * preview is not configured — the draft path degrades to published content.
 */
export const readToken = process.env.SANITY_API_READ_TOKEN || ''
