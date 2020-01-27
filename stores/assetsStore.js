import * as React from 'react'
import createContextStore from '../utilities/createContextStore'
import useFamiliarObjectArray from '../utilities/useFamiliarObjectArray'
import prepareImageAsset, { prepareFontAsset, loadFont } from '../utilities/prepareImageAsset'

import { DEFAULT_ASSETS } from '../consts/defaultAssets'

const typeMatches = (type) => (option) => {
  return option.type === type
}

const DEFAULT_ASSETS_ARRAY = Object.values(DEFAULT_ASSETS)

const useStoreCreator = () => {
  const assets = useFamiliarObjectArray(DEFAULT_ASSETS_ARRAY, 'editorAssets')

  const addAsset = React.useCallback((asset) => {
    assets.addOne(asset)
  }, [])

  const removeAsset = React.useCallback((id) => {
    assets.removeOne(id)
  }, [])

  const setAssetName = React.useCallback((id, name) => {
    assets.updateOne(id, (asset) => {
      asset.name = name
      return asset
    })
  }, [])

  const assFontAsset = React.useCallback((file) => {
    const prepare = async () => {
      try {
        const asset = await prepareFontAsset(file)
        console.log('font...', asset)
        addAsset(asset)
      } catch (error) {
        throw error
      }
    }

    prepare()
  }, [])

  const addImageAsset = React.useCallback((file) => {
    const prepare = async () => {
      try {
        const asset = await prepareImageAsset(file)
        addAsset(asset)
      } catch (error) {
        throw error
      }
    }

    prepare()
  }, [])

  const getAssetsByType = React.useCallback(
    (type) => {
      return assets.list.filter(typeMatches(type))
    },
    [assets.list.length],
  )

  React.useEffect(() => {
    console.log({ DEFAULT_ASSETS })
    loadFont(DEFAULT_ASSETS.defaultFontAsset.name, DEFAULT_ASSETS.defaultFontAsset.url)
  })

  global.assetsList = assets.list

  return {
    defaultAssets: DEFAULT_ASSETS,
    assets: assets.list,
    getAssetById: assets.getOneById,
    removeAsset,
    addAsset,
    setAssetName,
    getAssetsByType,
    addImageAsset,
    assFontAsset,
  }
}

const [AssetsStoreProvider, useAssetsStore, AssetsStoreContext] = createContextStore(useStoreCreator)

export { AssetsStoreProvider, AssetsStoreContext }
export default useAssetsStore
