import { defineCliConfig } from 'sanity/cli'

import { dataset, projectId } from './sanity/env'

export default defineCliConfig({
  api: { projectId, dataset },
  /** Auto-updates Studio dependencies via the Sanity CLI. */
  autoUpdates: true
})
