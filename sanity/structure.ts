import type { StructureResolver } from 'sanity/structure'

/**
 * Desk structure: editors land on Events first; the reusable reference docs
 * (speakers, sponsors, tags, event types) sit below a divider as supporting
 * collections.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Conteúdo')
    .items([
      S.documentTypeListItem('event').title('Eventos'),
      S.divider(),
      S.documentTypeListItem('speaker').title('Palestrantes'),
      S.documentTypeListItem('sponsor').title('Patrocinadores'),
      S.documentTypeListItem('tag').title('Tags'),
      S.documentTypeListItem('eventType').title('Tipos de evento')
    ])
