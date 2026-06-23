import type { StructureResolver } from 'sanity/structure'

/**
 * Desk structure: the homepage singleton sits at the top, then events; the
 * reusable reference docs (speakers, sponsors, partners, tags, event types) sit
 * below a divider as supporting collections.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Conteúdo')
    .items([
      S.listItem()
        .title('Página inicial')
        .id('homePage')
        .child(S.document().schemaType('homePage').documentId('homePage')),
      S.divider(),
      S.documentTypeListItem('event').title('Eventos'),
      S.divider(),
      S.documentTypeListItem('speaker').title('Palestrantes'),
      S.documentTypeListItem('sponsor').title('Patrocinadores'),
      S.documentTypeListItem('partner').title('Parceiros'),
      S.documentTypeListItem('tag').title('Tags'),
      S.documentTypeListItem('eventType').title('Tipos de evento')
    ])
