import * as React from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import createContextStore from '../utilities/createContextStore'
import createLayer from '../utilities/createLayer'
import useFamiliarObjectArray from '../utilities/useFamiliarObjectArray'
import useAssetsStore from './assetsStore'
import useAssets from '../pages/editor/utilities/useAssets'
import { useUndo } from '../pages/editor/utilities/useUndo'

// Always have the placeholder image asset.
// This asset can not be edited or removed.
const DEFAULT_LAYERS = []

const useStoreCreator = () => {
  const assets = useAssets()
  const layers = useFamiliarObjectArray(DEFAULT_LAYERS, 'editorLayers')
  const undo = useUndo(layers.list, layers.replaceState)

  useHotkeys('ctrl+z', undo)

  const addBlockLayer = () => {
    const newLayer = createLayer('block')
    layers.addOne(newLayer)
  }

  const addTextLayer = () => {
    const newLayer = createLayer('text')
    layers.addOne(newLayer)
  }

  const addImageLayer = () => {
    // New image layers have the placeholder image asset by default.
    const newLayer = createLayer('image')
    const imageAsset = assets.globalProjectAssets.images.find((image) => {
      return image.name === 'editor-placeholder-image.png'
    })

    layers.addOne({
      ...newLayer,
      imageAsset,
      style: {
        ...newLayer.style,
        width: imageAsset.width,
        height: imageAsset.height,
      },
    })
  }

  const duplicateLayer = (layer) => {
    layers.addOne(
      JSON.parse(
        JSON.stringify({
          ...layer,
          isSelected: false,
          id: undefined,
        }),
      ),
    )
  }

  const onLayerDragDrop = (event, position) => {}

  const setLayerName = (id, name) => {
    layers.updateOne(id, (layer) => {
      layer.name = name
      return layer
    })
  }

  const setLayerText = (id, text) => {
    layers.updateOne(id, (layer) => {
      layer.text = text
      return layer
    })
  }

  const setLayerStyle = (id, styleProperty, styleValue) => {
    layers.updateOne(id, (layer) => {
      const style = { ...layer.style, [styleProperty]: styleValue }
      return { ...layer, style }
    })
  }

  const setLayerUrl = (id, url) => {
    layers.updateOne(id, (layer) => {
      layer.url = url
      return layer
    })
  }

  const setLayerImageAsset = (id, asset) => {
    layers.updateOne(id, (layer) => {
      layer.imageAsset = asset
      layer.url = asset.url
      layer.style.width = asset.width
      layer.style.height = asset.height
      return layer
    })
  }

  const setLayerFontAsset = (id, asset) => {
    layers.updateOne(id, (layer) => {
      layer.fontAsset = asset
      return layer
    })
  }

  const setLayerRatioLocked = (id, bool) => {
    layers.updateOne(id, (layer) => {
      layer.isRatioLocked = bool
      return layer
    })
  }

  const setLayerWidthRestrcted = (id, bool) => {
    layers.updateOne(id, (layer) => {
      layer.isWidthRestrictedToDocument = bool
      return layer
    })
  }

  const setLayerIndex = (id, newIndex) => {
    layers.respositionOne(id, newIndex)
  }

  const selectLayer = (id) => {
    layers.updateAll((layer) => {
      if (layer.id !== id) {
        layer.isSelected = false
        layer.isBeingEdited = false
      } else {
        layer.isSelected = true
      }

      return layer
    })
  }

  const deselectLayer = (id) => {
    layers.updateOne(id, (layer) => {
      layer.isSelected = false
      layer.isBeingEdited = false
      return layer
    })
  }

  const selectAllLayers = () => {
    layers.updateAll((layer) => {
      layer.isSelected = true
      return layer
    })
  }

  const deselectAllLayers = () => {
    layers.updateAll((layer) => {
      layer.isSelected = false
      layer.isBeingEdited = false
      return layer
    })
  }

  const enableLayerEditing = (id) => {
    layers.updateOne(id, (layer) => {
      layer.isSelected = true
      layer.isBeingEdited = true
      return layer
    })
  }

  const disableLayerEditing = (id) => {
    layers.updateOne(id, (layer) => {
      layer.isBeingEdited = false
      return layer
    })
  }

  const getLayerById = (id) => {
    return layers.list.find((layer) => {
      return layer.id === id
    })
  }

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
    onLayerDragDrop,
    duplicateLayer,
  }
}

const [LayersStoreProvider, useLayersStore, LayersStoreContext] = createContextStore(
  useStoreCreator,
)
export { LayersStoreProvider, LayersStoreContext }
export default useLayersStore
