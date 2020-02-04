import { action, computed } from 'easy-peasy'

import { getSheetIdFromShareUrl } from './storeUtilities'

export const setSourceShareUrl = action((state, value) => {
  state.sourceShareUrl = value
})

export const sourceSheetId = computed((state) => {
  const { sourceShareUrl } = state
  return sourceShareUrl && getSheetIdFromShareUrl(sourceShareUrl)
})
