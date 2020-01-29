import { createStore, action, thunk, computed } from 'easy-peasy'
import nanoid from 'nanoid'
import * as storage from '../../../utilities/backend/storage'
import { prepareAssets } from './prepareAssets'
import { windowLocation } from './windowLocation'

// getFromListById: utility, not part of store.
const getFromListById = (list, id) => {
  return list.find((item) => {
    return item.id === id
  })
}

// getFromListById: utility, not part of store.
const filterFromListById = (list, id) => {
  return list.filter((item) => {
    return item.id !== id
  })
}

// getFromListByType: utility, not part of store.
const getFromListByType = (list, type) => {
  return list.find((item) => {
    return item.type === type
  })
}

// filterListByType: utility, not part of store.
const filterListByType = (list, type) => {
  return list.filter((item) => {
    return item.type === type
  })
}

const addTextLayer = action((state) => {
  state.layers.push({
    id: nanoid(),
    isWidthRestrictedToDocument: true,
    isSelected: false,
    isBeingEdited: false,
    isRatioLocked: true,
    canFile: true,
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
      fontSize: 24,
      letterSpacing: 0.5,
      lineHeight: '140%',
    },
  })
})

const addImageLayer = action((state) => {
  state.layers.push({
    id: nanoid(),
    isWidthRestrictedToDocument: true,
    isSelected: false,
    isBeingEdited: false,
    isRatioLocked: true,
    isOverflowEnabled: false,
    canFile: true,
    type: 'image',
    name: 'Image Layer',
    imageAsset: null,
    url: null,
    style: {
      display: 'flex',
      backgroundSize: 'cover',

      top: 0,
      left: 0,
    },
  })
})

const addBoxLayer = action((state) => {
  state.layers.push({
    id: nanoid(),
    isWidthRestrictedToDocument: true,
    isSelected: false,
    isBeingEdited: false,
    isRatioLocked: true,
    canFile: true,
    type: 'block',
    name: 'Block Layer',
    style: {
      top: 0,
      left: 0,
      width: 2.5,
      height: 1.5,
      backgroundColor: 'rgba(0,0,0,0.75)',
    },
  })
})

const removeLayer = action((state, id) => {
  state.layers = state.layers.filter((layer) => {
    return layer.id !== id
  })
})

const duplicateLayer = action((state, id) => {
  const layerToClone = getFromListById(state.layers, id)

  state.layers.push({
    ...layerToClone,
    id: nanoid(),
  })
})

const setLayerName = action((state, [id, value]) => {
  const layer = getFromListById(state.layers, id)
  layer.name = value
})

const setLayerText = action((state, [id, value]) => {
  const layer = getFromListById(state.layers, id)
  layer.text = value
})

const setLayerStyle = action((state, [id, property, value]) => {
  const layer = getFromListById(state.layers, id)
  layer.style[property] = value
})

const selectLayer = action((state, id) => {
  state.selectedLayers = [id]
})

const deselectLayer = action((state, id) => {
  state.selectedLayers = state.selectedLayers.filter((layerId) => {
    return layerId !== id
  })
})

const deselectAllLayers = action((state) => {
  state.selectedLayers = []
})

const setLayerAsset = action((state, options) => {
  const layer = getFromListById(state.layers, options.layerId)
  const asset = getFromListById(state.assets, options.assetId)
  layer.asset = asset
})

const setLayerRatioLocked = action((state, options) => {
  const layer = getFromListById(state.layers, options.id)
  layer.isRatioLocked = options.value
})

const setLayerWidthRestrcted = action((state, options) => {
  const layer = getFromListById(state.layers, options.id)
  layer.isWidthRestricted = options.value
})

// loadAssets: utility, not part of store.
const loadAssets = async (options) => {
  const assets = await storage.getFiles(options)
  return await prepareAssets(assets)
}

// const markAsGlobalAsset = (asset) => {
//   asset.isGlobal = true
//   return asset
// }

// // loadGlobalAssets: utility, not part of store.
// const loadGlobalAssets = async () => {
//   const assets = await storage.getFiles('/global-project-assets')
//   const globalAssets = assets.map(markAsGlobalAsset)
//   return await prepareAssets(globalAssets)
// }

const registerAssets = action((state, assets) => {
  state.assets = [...assets]
  state.projectFontAssets = filterListByType(assets, 'font')
  state.projectImageAssets = filterListByType(assets, 'image')
})

const setIsLoadingAssets = action((state, value) => {
  state.isLoadingAssets = value
})

const initializeAssets = thunk(async (actions, options) => {
  actions.setIsLoadingAssets(true)
  const projectAssets = loadAssets(options)
  const project = await projectAssets
  await actions.registerAssets([...project.fonts, ...project.images])
  actions.setIsLoadingAssets(false)
})

const refreshProjectAssets = thunk(async (actions) => {
  actions.setIsLoadingAssets(true)
  console.log('loading...')
  const options = windowLocation.params
  const projectAssets = loadAssets(options)
  const project = await projectAssets
  console.log('done loading...')
  actions.setIsLoadingAssets(false)
  await actions.registerAssets([...project.fonts, ...project.images])
})

const deleteAsset = thunk(async (actions, id, { getState }) => {
  const state = getState()
  const oldAssets = [...state.assets]
  const newAssets = filterFromListById(state.assets, id)
  await actions.registerAssets(newAssets)

  const wasSuccessful = await storage.deleteFile(id)
  !wasSuccessful && actions.registerAssets(oldAssets)
})

const store = {
  assets: [],
  selectedLayers: [],
  layers: [],
  isLoadingAssets: false,
  projectFontAssets: [],
  projectImageAssets: [],

  addTextLayer,
  addImageLayer,
  addBoxLayer,
  removeLayer,
  duplicateLayer,
  setLayerName,
  setLayerText,
  setLayerStyle,
  selectLayer,
  deselectLayer,
  deselectAllLayers,
  setLayerAsset,
  setLayerRatioLocked,
  setLayerWidthRestrcted,
  initializeAssets,
  registerAssets,
  refreshProjectAssets,
  setIsLoadingAssets,
  deleteAsset,
}

export const layersStore = createStore(store)
