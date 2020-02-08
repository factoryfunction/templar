import { action, thunk, computed, createContextStore } from 'easy-peasy'
import nanoid from 'nanoid'

import { base } from '#utilities/backend/Base'
import * as storage from '#utilities/backend/storage'
import { fontsManager } from '#utilities/fontsManager'
import * as utilities from './storeUtilities'
import { windowLocation } from '#utilities/windowLocation'
import arrayMove from 'array-move'

import * as services from '#services/database'

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
    textValue: 'some text',
    styleTop: 5,
    styleLeft: 5,
    styleWidth: 400,
    styleHeight: 200,
    styleFontFamily: 'Work Sans',
    styleFontStyle: 'normal',
    styleColor: '#000000',
    styleFontWeight: '400',
    styleFontSize: 48,
    styleLetterSpacing: 0.5,
    styleLineHeight: 20,
    styleTextOverflow: 'ellipsis',
    styleBackgroundColor: 'rgba(0,0,0,0)',
    styleOpacity: 100,
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
    styleTop: 5,
    styleLeft: 5,
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
    styleTop: 5,
    styleLeft: 5,
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

export const setLayerProperty = action((state, [id, key, value]) => {
  console.log('ACTION setLayerProperty', [id, key, value])
  utilities.setLayerKeyValue(state.layers, id, key, value)
})

export const setLayerFontFamily = action((state, [id, value]) => {
  utilities.setLayerKeyValue(state.layers, id, 'styleFontFamily', value)
  utilities.setLayerKeyValue(state.layers, id, 'styleFontWeight', '400')
  fontsManager.loadFontByName(value)
})

// Used to change the index of a layer when dragged
// and dropped in the layers panel.
export const reorderLayer = action((state, [oldIndex, newIndex]) => {
  const layers = [...state.layers].reverse()
  const reorderedLayers = arrayMove(layers, oldIndex, newIndex)
  state.layers = [...reorderedLayers].reverse()
})

export const initializeLayers = thunk(async (actions, projectId) => {
  actions.setAreLayersLoading(true)
  const project = await services.data.getProject(projectId)
  const layers = project.layers || []

  for (const layer of layers) {
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

  actions.setLayers(layers)
  actions.setAreLayersLoading(false)
})

export const onCanvasImageDrop = thunk(async (actions, acceptedFiles) => {
  const uploads = await services.cdn.uploadFiles({
    projectId: windowLocation.params.projectId,
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

export const layerCount = computed((state) => {
  return state.layers.length
})
