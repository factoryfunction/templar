import { action, thunk, computed, createContextStore } from 'easy-peasy'
import nanoid from 'nanoid'

import { base } from '#utilities/backend/Base'
import * as storage from '#utilities/backend/storage'
import { fontsManager } from '#utilities/fontsManager'
import * as utilities from './storeUtilities'
import { getImageData } from '#utilities/getImageMetadata'
import { windowLocation } from '#utilities/windowLocation'
import arrayMove from 'array-move'

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

export const addTextLayer = action((state, options = ({} = {})) => {
  state.layers.push({
    id: nanoid(),
    isEditingText: false,
    isVisible: true,
    type: 'text',
    name: 'Text Layer',
    text: 'some text',
    styleTop: 100,
    styleLeft: 100,
    styleWidth: 400,
    styleHeight: 200,
    styleFontFamily: 'Work Sans',
    styleFontStyle: 'normal',
    styleFontColor: '#000000',
    styleFontWeight: '400',
    styleFontSize: 48,
    styleFontLetterSpacing: 0.5,
    styleFontLineHeight: 140,
    styleBackgroundColor: 'rgba(0,0,0,0)',
    styleOpacity: 100,
    styleTextOverflow: 'ellipsis',
    // stylePosition: 'absolute',
    // styleOverflow: 'hidden',
    // styleDisplay: 'flex',
    ...options,
  })
})

export const addImageLayer = action((state, options = {}) => {
  state.layers.push({
    id: nanoid(),
    isVisible: true,
    name: 'Image Layer',
    type: 'image',
    stylePosition: 'absolute',
    styleOverflow: 'hidden',
    styleDisplay: 'flex',
    styleTop: 100,
    styleLeft: 100,
    styleWidth: 300,
    styleHeight: 200,
    styleOpacity: 100,
    styleBackgroundSize: 'cover',
    styleBackgroundColor: 'rgba(0,0,0,0)',
    styleBackgroundImage: '',
    ...options,
  })
})

export const addBoxLayer = action((state, options = {}) => {
  state.layers.push({
    id: nanoid(),
    type: 'box',
    name: 'Box Layer',
    isVisible: true,
    // stylePosition: 'absolute',
    styleOverflow: 'hidden',
    styleDisplay: 'flex',
    styleTop: 100,
    styleLeft: 100,
    styleWidth: 300,
    styleHeight: 200,
    styleOpacity: 100,
    styleBackgroundColor: 'rgba(0,0,0,1)',
    ...options,
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
  utilities.setLayerKeyValue(state.layers, id, 'styleWidth', value)
})

export const setLayerHeight = action((state, [id, value]) => {
  utilities.setLayerKeyValue(state.layers, id, 'styleHeight', value)
})

export const setLayerPositionTop = action((state, [id, value]) => {
  utilities.setLayerKeyValue(state.layers, id, 'styleTop', value)
})

export const setLayerPositionLeft = action((state, [id, value]) => {
  utilities.setLayerKeyValue(state.layers, id, 'styleLeft', value)
})

export const setLayerText = action((state, [id, value]) => {
  utilities.setLayerKeyValue(state.layers, id, 'text', value)
})

export const setIsEditingText = action((state, [id, value]) => {
  utilities.setLayerKeyValue(state.layers, id, 'isEditingText', value)
})

export const setLayerFontFamily = action((state, [id, value]) => {
  utilities.setLayerKeyValue(state.layers, id, 'styleFontFamily', value)
  utilities.setLayerKeyValue(state.layers, id, 'styleFontWeight', '400')
  fontsManager.loadFontByName(value)
})

export const setLayerFontSize = action((state, [id, value]) => {
  utilities.setLayerKeyValue(state.layers, id, 'styleFontSize', value)
})

export const setLayerFontWeight = action((state, [id, value]) => {
  utilities.setLayerKeyValue(state.layers, id, 'styleFontWeight', value)
})

export const setLayerFontColor = action((state, [id, value]) => {
  utilities.setLayerKeyValue(state.layers, id, 'styleFontColor', value)
})

export const setLayerLetterSpacing = action((state, [id, value]) => {
  utilities.setLayerKeyValue(state.layers, id, 'styleFontLetterSpacing', value)
})

export const setLayerLineHeight = action((state, [id, value]) => {
  utilities.setLayerKeyValue(state.layers, id, 'styleFontLineHeight', value)
})

export const setLayerFontStyle = action((state, [id, value]) => {
  utilities.setLayerKeyValue(state.layers, id, 'styleFontStyle', value)
})

export const setLayerTextShadow = action((state, [id, value]) => {
  utilities.setLayerKeyValue(state.layers, id, 'styleFontTextShadow', value)
})

export const setLayerBoxShadow = action((state, [id, value]) => {
  utilities.setLayerKeyValue(state.layers, id, 'styleBoxShadow', value)
})

export const setLayerOpacity = action((state, [id, value]) => {
  utilities.setLayerKeyValue(state.layers, id, 'styleOpacity', value)
})

export const setLayerBackgroundColor = action((state, [id, value]) => {
  utilities.setLayerKeyValue(state.layers, id, 'styleBackgroundColor', value)
})

// Used to change the index of a layer when dragged
// and dropped in the layers panel.
export const reorderLayer = action((state, [oldIndex, newIndex]) => {
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
        layer.styleFontFamily,
        layer.styleFontWeight,
        layer.styleFontStyle,
      )

      fontsManager.loadFont({
        name: layer.styleFontFamily,
        url: fontUrl,
      })
    }
  }

  actions.setLayers(project.layers)
  actions.setAreLayersLoading(false)
})

export const onCanvasImageDrop = thunk(async (actions, acceptedFiles) => {
  const uploads = await storage.uploadFiles({
    ...windowLocation.params,
    files: acceptedFiles,
  })

  const uploadsData = await storage.getUploadsData(uploads)

  for (const data of uploadsData) {
    actions.addImageLayer({
      styleWidth: data.styleOriginalWidth,
      styleHeight: data.styleOriginalHeight,
      ...data,
    })
  }
})

export const screenshotCanvas = thunk(async (actions) => {
  console.log('screenshotting that shit ')
  const canvas = document.querySelector('.react-transform-element')
})

// COMPUTED STORE PROPERTIES ------------------------------
// These values are accessed and handled as static data
// types and are recomputed automatically when there are
// relevant changes to the store.

export const layerCount = computed((state) => {
  return state.layers.length
})
