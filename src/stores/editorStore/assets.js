import { action, thunk, computed } from 'easy-peasy'

import { windowLocation } from '#utilities/windowLocation'
import * as storage from '#utilities/backend/storage'
import { loadAssets, filterFromListById } from './storeUtilities'

// import { base } from '#utilities/backend/Base'
// import { fontsManager } from '#utilities/fontsManager'

// BASIC STORE ACTIONS ------------------------------------
// Since actions are *synchronous* ways of updating the
// store, we use "thunks" when we need to do something
// *asynchrnously* while updating the store along the way.

export const registerAssets = action((state, assets) => {
  state.assets = [...assets]
})

export const setAreAssetsLoading = action((state, value) => {
  state.areAssetsLoading = value
})

// ASYNC STORE ACTIONS (THUNKS) ---------------------------
// Since actions are *synchronous* ways of updating the
// store, we use "thunks" when we need to do something
// *asynchrnously* while updating the store along the way.

export const initializeAssets = thunk(async (actions, options) => {
  actions.setAreAssetsLoading(true)
  const assets = await loadAssets(options)
  await actions.registerAssets([...assets.fonts, ...assets.images])
  actions.setAreAssetsLoading(false)
})

export const refreshProjectAssets = thunk(async (actions) => {
  actions.setAreAssetsLoading(true)
  const options = windowLocation.params
  const projectAssets = loadAssets(options)
  const project = await projectAssets
  actions.setAreAssetsLoading(false)
  await actions.registerAssets([...project.fonts, ...project.images])
})

export const deleteAsset = thunk(async (actions, id, { getState }) => {
  const state = getState()
  const oldAssets = [...state.assets]
  const newAssets = filterFromListById(state.assets, id)
  await actions.registerAssets(newAssets)

  const wasSuccessful = await storage.deleteFile(id)
  !wasSuccessful && actions.registerAssets(oldAssets)
})

// COMPUTED STORE PROPERTIES ------------------------------
// These values are accessed and handled as static data
// types and are recomputed automatically when there are
// relevant changes to the store.

export const fontAssets = computed((state) => {
  return state.assets.filter((asset) => asset.type === 'font')
})

export const imageAssets = computed((state) => {
  return state.assets.filter((asset) => asset.type === 'image')
})
