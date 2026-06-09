import type { SchemaTypeDefinition } from 'sanity'

import { event } from './documents/event'
import { eventType } from './documents/eventType'
import { speaker } from './documents/speaker'
import { sponsor } from './documents/sponsor'
import { tag } from './documents/tag'
import { agendaItem } from './objects/agendaItem'
import { eventGallery } from './objects/eventGallery'
import { eventLocation } from './objects/eventLocation'
import { galleryPhoto } from './objects/galleryPhoto'
import { linkedResource } from './objects/linkedResource'
import { pastAssets } from './objects/pastAssets'
import { seo } from './objects/seo'
import { socialLink } from './objects/socialLink'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Documents
    event,
    speaker,
    sponsor,
    tag,
    eventType,
    // Objects
    eventLocation,
    agendaItem,
    galleryPhoto,
    eventGallery,
    linkedResource,
    pastAssets,
    seo,
    socialLink
  ]
}
