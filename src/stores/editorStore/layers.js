import { action, thunk, computed, createContextStore } from 'easy-peasy'
import nanoid from 'nanoid'

import { base } from '#utilities/backend/Base'
import * as storage from '#utilities/backend/storage'
import { fontsManager } from '#utilities/fontsManager'
import * as utilities from './storeUtilities'
import { getImageMetadata } from '#utilities/getImageMetadata'
import { windowLocation } from '#utilities/windowLocation'

// BASIC STORE ACTIONS ------------------------------------
// Since actions are *synchronous* ways of updating the
// store, we use "thunks" when we need to do something
// *asynchrnously* while updating the store along the way.

export const setAreLayersLoading = action((state, value) => {
  state.areLayersLoading = value
})

// Used to completely replace the list of layers in the store.
export const setLayers = action((state, layers) => {
  state.layers = layers
})

export const addTextLayer = action((state, options) => {
  state.layers.push({
    id: nanoid(),
    isSelected: false,
    isEditingText: false,
    type: 'text',
    name: 'Text Layer',
    text: 'some text',
    fontAsset: null,
    style: {
      top: 0,
      left: 0,
      width: 2,
      height: 2,
      fontFamily: 'Work Sans',
      fontWeight: '400',
      fontStyle: 'normal',
      color: '#000000',
      fontSize: '24',
      letterSpacing: '0.5',
      lineHeight: 140,
      backgroundColor: 'rgba(0,0,0,0)',
      opacity: 100,
    },
  })
})

export const addImageLayer = action((state, options) => {
  state.layers.push({
    id: nanoid(),
    isSelected: false,
    isOverflowEnabled: false,
    type: 'image',
    name: 'Image Layer',
    imageAsset: null,
    url: null,
    style: {
      display: 'flex',
      backgroundSize: 'cover',
      top: 0,
      left: 0,
      opacity: 1,
    },
  })
})

export const addBoxLayer = action((state, options) => {
  state.layers.push({
    id: nanoid(),
    isSelected: false,
    type: 'box',
    name: 'Box Layer',
    style: {
      top: 0,
      left: 0,
      width: 2.5,
      height: 1.5,
      background: '#000000',
      opacity: 1,
    },
  })
})

export const duplicateLayer = action((state, id) => {
  const layerToClone = utilities.getFromListById(state.layers, id)

  state.layers.push({
    ...layerToClone,
    id: nanoid(),
  })
})

export const removeLayer = action((state, id) => {
  state.layers = state.layers.filter((layer) => {
    return layer.id !== id
  })
})

export const selectLayer = action((state, id) => {
  state.selectedLayers = [id]
})

export const deselectLayer = action((state, id) => {
  state.selectedLayers = state.selectedLayers.filter((layerId) => {
    return layerId !== id
  })
})

export const deselectAllLayers = action((state) => {
  state.selectedLayers = []

  state.layers.forEach((layer) => {
    layer.isEditingText = false
  })
})

export const setLayerName = action((state, [id, value]) => {
  utilities.setLayerKeyValue(state.layers, id, 'name', value)
})

export const setLayerWidth = action((state, [id, value]) => {
  utilities.setLayerKeyValue(state.layers, id, 'style.width', value)
})

export const setLayerHeight = action((state, [id, value]) => {
  utilities.setLayerKeyValue(state.layers, id, 'style.height', value)
})

export const setLayerPositionTop = action((state, [id, value]) => {
  utilities.setLayerKeyValue(state.layers, id, 'style.top', value)
})

export const setLayerPositionLeft = action((state, [id, value]) => {
  utilities.setLayerKeyValue(state.layers, id, 'style.left', value)
})

export const setLayerText = action((state, [id, value]) => {
  utilities.setLayerKeyValue(state.layers, id, 'text', value)
})

export const setIsEditingText = action((state, [id, value]) => {
  utilities.setLayerKeyValue(state.layers, id, 'isEditingText', value)
})

export const setLayerFontFamily = action((state, [id, value]) => {
  utilities.setLayerKeyValue(state.layers, id, 'style.fontFamily', value)
  utilities.setLayerKeyValue(state.layers, id, 'style.fontWeight', '400')
  fontsManager.loadFontByName(value)
})

export const setLayerFontSize = action((state, [id, value]) => {
  utilities.setLayerKeyValue(state.layers, id, 'style.fontSize', value)
})

export const setLayerFontWeight = action((state, [id, value]) => {
  utilities.setLayerKeyValue(state.layers, id, 'style.fontWeight', value)
})

export const setLayerFontColor = action((state, [id, value]) => {
  utilities.setLayerKeyValue(state.layers, id, 'style.color', value)
})

export const setLayerLetterSpacing = action((state, [id, value]) => {
  utilities.setLayerKeyValue(state.layers, id, 'style.letterSpacing', value)
})

export const setLayerLineHeight = action((state, [id, value]) => {
  utilities.setLayerKeyValue(state.layers, id, 'style.lineHeight', value)
})

export const setLayerFontStyle = action((state, [id, value]) => {
  utilities.setLayerKeyValue(state.layers, id, 'style.fontStyle', value)
})

export const setLayerTextShadow = action((state, [id, value]) => {
  utilities.setLayerKeyValue(state.layers, id, 'style.textShadow', value)
})

export const setLayerBoxShadow = action((state, [id, value]) => {
  utilities.setLayerKeyValue(state.layers, id, 'style.boxShadow', value)
})

export const setLayerOpacity = action((state, [id, value]) => {
  utilities.setLayerKeyValue(state.layers, id, 'style.opacity', value)
})

export const setLayerBackgroundColor = action((state, [id, value]) => {
  utilities.setLayerKeyValue(state.layers, id, 'style.backgroundColor', value)
})

// Used to change the index of a layer when dragged
// and dropped in the layers panel.
export const reorderLayer = action((state, { oldIndex, newIndex }) => {
  const layers = [...state.layers].reverse()
  const reorderedLayers = arrayMove(layers, oldIndex, newIndex)
  state.layers = [...reorderedLayers].reverse()
})

// ASYNC STORE ACTIONS (THUNKS) ---------------------------
// Since actions are *synchronous* ways of updating the
// store, we use "thunks" when we need to do something
// *asynchrnously* while updating the store along the way.

export const initializeLayers = thunk(async (actions, projectId) => {
  actions.setAreLayersLoading(true)
  const project = await base.getProjectData(projectId)

  for (const layer of project.layers) {
    if (layer.type === 'text') {
      const fontUrl = fontsManager.getFontUrl(
        layer.style.fontFamily,
        layer.style.fontWeight,
        layer.style.fontStyle,
      )

      fontsManager.loadFont({
        name: layer.style.fontFamily,
        url: fontUrl,
      })
    }
  }

  actions.setLayers(project.layers)
  actions.setAreLayersLoading(false)
})

export const handleFileUpload = thunk(async (actions, acceptedFiles) => {
  const uploads = []

  for (const file of acceptedFiles) {
    uploads.push(
      storage.uploadFile({
        ...windowLocation.params,
        file,
      }),
    )
  }

  const files = await Promise.all(uploads)
  const updateTasks = []

  for (const file of files) {
    console.log({ file })
    const url = await file.ref.getDownloadURL()

    const customMetadata = await getImageMetadata({
      id: file.metadata.fullPath,
      name: file.metadata.name,
      size: file.metadata.size,
      url,
    })

    updateTasks.push(
      file.ref.updateMetadata({
        customMetadata,
      }),
    )
  }

  const updates = Promise.all(updateTasks)
  console.log({ updates })
})

// COMPUTED STORE PROPERTIES ------------------------------
// These values are accessed and handled as static data
// types and are recomputed automatically when there are
// relevant changes to the store.

export const layerCount = computed((state) => {
  return state.layers.length
})
