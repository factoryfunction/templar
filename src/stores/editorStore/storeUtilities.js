import setValue from 'set-value'

import { prepareAssets } from '#utilities'
import * as storage from '#utilities/backend/storage'

export const getFromListById = (list, id) => {
  return list.find((item) => {
    return item.id === id
  })
}

export const filterFromListById = (list, id) => {
  return list.filter((item) => {
    return item.id !== id
  })
}

export const getFromListByType = (list, type) => {
  return list.find((item) => {
    return item.type === type
  })
}

export const filterListByType = (list, type) => {
  return list.filter((item) => {
    return item.type === type
  })
}

export const setLayerKeyValue = (layers, layerId, keyPath, value) => {
  const layer = getFromListById(layers, layerId)
  setValue(layer, keyPath, value)
}

export const loadAssets = async (options) => {
  const assets = await storage.getFiles(options)
  return await prepareAssets(assets)
}

export const normalizeLayers = (layers) => {
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

// TODO: Explain this.
export const getSheetIdFromShareUrl = (shareUrl) => {
  const subString = shareUrl.substr(shareUrl.indexOf('/d/') + 3)
  return subString.split('/')[0]
}
