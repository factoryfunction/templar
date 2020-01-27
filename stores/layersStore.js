import * as React from 'react'
import createContextStore from '../utilities/createContextStore'
import createLayer from '../utilities/createLayer'
import useFamiliarObjectArray from '../utilities/useFamiliarObjectArray'
import useAssetsStore from './assetsStore'

// Always have the placeholder image asset.
// This asset can not be edited or removed.
const DEFAULT_LAYERS = []

const useStoreCreator = () => {
  const assetsStore = useAssetsStore()
  const layers = useFamiliarObjectArray(DEFAULT_LAYERS, 'editorLayers')

  const addBlockLayer = React.useCallback(() => layers.addOne(createLayer('block')), [])

  const addTextLayer = React.useCallback(() => {
    // New font layers have the WorkSans font asset by default.
    const newLayer = createLayer('text')
    const fontAsset = assetsStore.defaultAssets.defaultFontAsset

    layers.addOne({
      ...newLayer,
      fontAsset,
    })
  }, [])

  const addImageLayer = React.useCallback(() => {
    // New image layers have the placeholder image asset by default.
    const newLayer = createLayer('image')
    const imageAsset = assetsStore.defaultAssets.placeholderImageAsset

    layers.addOne({
      ...newLayer,
      imageAsset,
      style: {
        ...newLayer.style,
        width: imageAsset.width,
        height: imageAsset.height,
      },
    })
  }, [])

  const setLayerName = React.useCallback((id, name) => {
    layers.updateOne(id, (layer) => {
      layer.name = name
      return layer
    })
  }, [])

  const setLayerText = React.useCallback((id, text) => {
    layers.updateOne(id, (layer) => {
      layer.text = text
      return layer
    })
  }, [])

  const setLayerStyle = React.useCallback((id, styleProperty, styleValue) => {
    layers.updateOne(id, (layer) => {
      const style = { ...layer.style, [styleProperty]: styleValue }
      return { ...layer, style }
    })
  }, [])

  const setLayerUrl = React.useCallback((id, url) => {
    layers.updateOne(id, (layer) => {
      layer.url = url
      return layer
    })
  }, [])

  const setLayerImageAsset = React.useCallback((id, asset) => {
    layers.updateOne(id, (layer) => {
      layer.imageAsset = asset
      layer.url = asset.url
      layer.style.width = asset.width
      layer.style.height = asset.height
      return layer
    })
  }, [])

  const setLayerFontAsset = React.useCallback((id, asset) => {
    layers.updateOne(id, (layer) => {
      layer.fontAsset = asset
      return layer
    })
  }, [])

  const setLayerRatioLocked = React.useCallback((id, bool) => {
    layers.updateOne(id, (layer) => {
      layer.isRatioLocked = bool
      return layer
    })
  }, [])

  const setLayerWidthRestrcted = React.useCallback((id, bool) => {
    layers.updateOne(id, (layer) => {
      layer.isWidthRestrictedToDocument = bool
      return layer
    })
  }, [])

  const setLayerIndex = React.useCallback((id, newIndex) => {
    layers.respositionOne(id, newIndex)
  }, [])

  const selectLayer = React.useCallback((id) => {
    layers.updateAll((layer) => {
      if (layer.id !== id) {
        layer.isSelected = false
        layer.isBeingEdited = false
      } else {
        layer.isSelected = true
      }

      return layer
    })
  }, [])

  const deselectLayer = React.useCallback((id) => {
    layers.updateOne(id, (layer) => {
      layer.isSelected = false
      layer.isBeingEdited = false
      return layer
    })
  }, [])

  const selectAllLayers = React.useCallback(() => {
    layers.updateAll((layer) => {
      layer.isSelected = true
      return layer
    })
  }, [])

  const deselectAllLayers = React.useCallback(() => {
    layers.updateAll((layer) => {
      layer.isSelected = false
      layer.isBeingEdited = false
      return layer
    })
  }, [])

  const enableLayerEditing = React.useCallback((id) => {
    layers.updateOne(id, (layer) => {
      layer.isSelected = true
      layer.isBeingEdited = true
      return layer
    })
  }, [])

  const disableLayerEditing = React.useCallback((id) => {
    layers.updateOne(id, (layer) => {
      layer.isBeingEdited = false
      return layer
    })
  }, [])

  const getLayerById = React.useCallback((id) => {
    return layers.list.find((layer) => {
      return layer.id === id
    })
  }, [])

  global.layersList = layers.list

  return {
    layers: layers.list,
    removeLayer: layers.removeOne,
    addTextLayer,
    addImageLayer,
    addBlockLayer,
    setLayerName,
    setLayerText,
    setLayerStyle,
    setLayerUrl,
    selectLayer,
    deselectLayer,
    selectAllLayers,
    deselectAllLayers,
    enableLayerEditing,
    disableLayerEditing,
    getLayerById,
    setLayerIndex,
    setLayerImageAsset,
    setLayerRatioLocked,
    setLayerWidthRestrcted,
    setLayerFontAsset,
  }
}

const [LayersStoreProvider, useLayersStore, LayersStoreContext] = createContextStore(useStoreCreator)
export { LayersStoreProvider, LayersStoreContext }
export default useLayersStore
