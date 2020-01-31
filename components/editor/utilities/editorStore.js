import { action, thunk, computed, createContextStore } from 'easy-peasy'
import * as storage from '../../../utilities/backend/storage'
import { prepareAssets, loadFont } from './prepareAssets'
import { windowLocation } from './windowLocation'
import { base } from '../../../utilities/backend/Base'
import nanoid from 'nanoid'
import arrayMove from 'array-move'

import { fontsManager } from './fontsManager'

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
      fontWeight: '400',
      fontStyle: 'normal',
      color: '#000000',
      fontSize: '24',
      letterSpacing: '0.5',
      lineHeight: 140,
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
      backgroundColor: 'rgba(0,0,0,1)',
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

const setLayerFontFamily = action((state, [id, value]) => {
  const layer = getFromListById(state.layers, id)
  layer.style.fontFamily = value
  layer.style.fontWeight = '400'

  loadFont({
    name: value,
    url: fontsManager.getFontUrl(value, '400', 'normal'),
  })
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

const fontAssets = computed((state) => {
  return state.assets.filter((asset) => asset.type === 'font')
})

const imageAssets = computed((state) => {
  return state.assets.filter((asset) => asset.type === 'image')
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

const setIsProjectReady = action((state, value) => {
  state.isProjectReady = value
})

const setLayers = action((state, layers) => {
  state.layers = layers
})

const setProjectId = action((state, projectId) => {
  state.projectId = projectId
})

const initializeProject = thunk(async (actions, options) => {
  const initializeAssets = actions.initializeAssets(options)
  const projectData = await base.getProjectData(`${options.owner}_${options.project}`)

  projectData.layers.forEach((layer) => {
    if (layer.type === 'text') {
      const fontUrl = fontsManager.getFontUrl(
        layer.style.fontFamily,
        layer.style.fontWeight,
        'normal',
      )

      loadFont({ name: layer.style.fontFamily, url: fontUrl })
    }
  })

  await initializeAssets
  actions.setLayers(projectData.layers)
  actions.setProjectId(projectData.projectId)
  actions.setIsProjectReady(true)
})

// loadAssets: utility, not part of store.
const loadAssets = async (options) => {
  const assets = await storage.getFiles(options)
  return await prepareAssets(assets)
}

const registerAssets = action((state, assets) => {
  state.assets = [...assets]
})

const setIsLoadingAssets = action((state, value) => {
  state.isLoadingAssets = value
})

const initializeAssets = thunk(async (actions, options) => {
  actions.setIsLoadingAssets(true)
  const assets = await loadAssets(options)
  await actions.registerAssets([...assets.fonts, ...assets.images])
  actions.setIsLoadingAssets(false)
})

const refreshProjectAssets = thunk(async (actions) => {
  actions.setIsLoadingAssets(true)
  const options = windowLocation.params
  const projectAssets = loadAssets(options)
  const project = await projectAssets
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

const prepareLayersForSave = (layers) => {
  return layers.map((layer) => {
    const asset = layer.imageAsset || layer.fontAsset || {}

    const data =
      layer.type === 'image'
        ? { imageAsset: undefined, imageAssetId: asset.id }
        : layer.type === 'font'
        ? { fontAsset: undefined, fontAssetId: asset.id }
        : {}

    return {
      ...layer,
      ...data,
    }
  })
}

const saveProject = thunk(async (actions, options, { getState }) => {
  const state = getState()
  const layers = prepareLayersForSave(state.layers)

  base.updateProjectData('root-and-roam-creative-studio_sell-sheet', (data) => {
    return {
      layers: layers || [],
      projectId: 'root-and-roam-creative-studio_sell-sheet',
    }
  })
})

const reorderLayer = action((state, { oldIndex, newIndex }) => {
  const layers = [...state.layers].reverse()
  const reorderedLayers = arrayMove(layers, oldIndex, newIndex)
  state.layers = [...reorderedLayers].reverse()
})

// SOURCES

const setIsConfiguringSources = action((state, value) => {
  state.isConfiguringSources = value
})

const setWorkbenchActiveTab = action((state, value) => {
  state.workbenchActiveTab = value
})

const setIsWorkbenchExpanded = action((state, value) => {
  state.isWorkbenchExpanded = value
})

const store = {
  workbenchActiveTab: 'Assets',
  isWorkbenchExpanded: false,
  setWorkbenchActiveTab,
  setIsWorkbenchExpanded,

  projectId: '',
  isProjectReady: false,
  setProjectId,
  setIsProjectReady,
  saveProject,
  refreshProjectAssets,
  initializeProject,

  assets: [],
  isLoadingAssets: false,
  fontAssets,
  imageAssets,
  initializeAssets,
  registerAssets,
  setIsLoadingAssets,
  deleteAsset,

  sources: {},
  isSourcesConfigured: false,
  isConfiguringSources: false,
  setIsConfiguringSources,

  layers: [],
  selectedLayers: [],
  reorderLayer,
  setLayers,
  addTextLayer,
  addImageLayer,
  addBoxLayer,
  removeLayer,
  duplicateLayer,
  setLayerFontFamily,
  setLayerName,
  setLayerText,
  setLayerStyle,
  selectLayer,
  deselectLayer,
  deselectAllLayers,
  setLayerAsset,
  setLayerRatioLocked,
  setLayerWidthRestrcted,
}

export const EditorStore = createContextStore(store)
