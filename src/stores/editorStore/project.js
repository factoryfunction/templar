import { action, thunk, computed } from 'easy-peasy'
import sleep from 'sleepjs'

import { normalizeLayers } from './storeUtilities'
import { base } from '#utilities/backend/Base'

// BASIC STORE ACTIONS ------------------------------------
// Since actions are *synchronous* ways of updating the
// store, we use "thunks" when we need to do something
// *asynchrnously* while updating the store along the way.

export const setIsProjectLoading = action((state, value) => {
  state.isProjectLoading = value
})

export const setIsProjectSaving = action((state, value) => {
  state.isProjectSaving = value
})

export const setProjectId = action((state, value) => {
  state.projectId = value
})

export const setWasProjectRecentlySaved = action((state, value) => {
  state.wasProjectRecentlySaved = value
})

// ASYNC STORE ACTIONS (THUNKS) ---------------------------
// Since actions are *synchronous* ways of updating the
// store, we use "thunks" when we need to do something
// *asynchrnously* while updating the store along the way.

export const initializeProject = thunk(async (actions, [projectId, options = {}]) => {
  // await actions.initializeAssets(options)
  options.scale && actions.setScale(options.scale)
  await actions.initializeLayers(projectId)
  actions.setProjectId(projectId)
})

export const saveProject = thunk(async (actions, options, { getState }) => {
  const { layers: _layers, projectId } = getState()
  const layers = normalizeLayers(_layers) || []

  await base.updateProjectData(projectId, () => {
    return {
      layers,
      projectId,
    }
  })

  // TODO: Probably handle in component...
  actions.setWasProjectRecentlySaved(true)
  await sleep(2000)
  actions.setWasProjectRecentlySaved(false)
})

// COMPUTED STORE PROPERTIES ------------------------------
// These values are accessed and handled as static data
// types and are recomputed automatically when there are
// relevant changes to the store.

export const isProjectReady = computed((state) => {
  const projectId = state.projectId
  return !!projectId
})
