import * as React from 'react'
import { useRouter } from 'next/router'

import createContextStore from '../utilities/createContextStore'
import useFamiliarObjectArray from '../utilities/useFamiliarObjectArray'
import * as storage from '../utilities/backend/storage'
import { useProjectAssets } from '../pages/editor/utilities/useProjectAssets'
import { useGlobalProjectAssets } from '../pages/editor/utilities/useGlobalProjectAssets'

import { DEFAULT_ASSETS } from '../consts/defaultAssets'

const DEFAULT_ASSETS_ARRAY = Object.values(DEFAULT_ASSETS)

const typeMatches = (type) => (option) => {
  return option.type === type
}

const sortAssetsByType = (assets) => {
  const accumulator = { ...getAccumulator() }

  const sorted = assets.reduce((final, asset) => {
    final[asset.type].push(asset)
    return final
  }, accumulator)

  return Object.entries(sorted)
}

const getAccumulator = () => {
  return {
    font: [],
    image: [],
  }
}

const useStoreCreator = () => {
  const globalProjectAssets = useGlobalProjectAssets()
  const projectAssets = useProjectAssets()

  const assets = useFamiliarObjectArray(DEFAULT_ASSETS_ARRAY, 'editorAssets')

  const reloadProjectAssets = () => {
    projectAssets.reload()
    globalProjectAssets.reload()
  }

  const addAsset = (asset) => {
    assets.addOne(asset)
  }

  const removeAsset = (id) => {
    assets.removeOne(id)
  }

  const setAssetName = (id, name) => {
    assets.updateOne(id, (asset) => {
      asset.name = name
      return asset
    })
  }

  const addFontAsset = (file) => {
    // const prepare = async () => {
    //   try {
    //     const asset = await prepareFontAsset(file)
    //     addAsset(asset)
    //   } catch (error) {
    //     throw error
    //   }
    // }
    // prepare()
  }

  const addImageAsset = (file) => {
    // const prepare = async () => {
    //   try {
    //     const asset = await prepareImageAsset(file)
    //     addAsset(asset)
    //   } catch (error) {
    //     throw error
    //   }
    // }
    // prepare()
  }

  const getAssetsByType = (type) => {
    return assets.list.filter(typeMatches(type))
  }

  const sortedAssetsByType = React.useMemo(() => {
    return sortAssetsByType(assets.list)
  }, [assets.list])

  return {
    defaultAssets: DEFAULT_ASSETS,
    assets: assets.list,
    getAssetById: assets.getOneById,
    removeAsset,
    addAsset,
    setAssetName,
    getAssetsByType,
    addImageAsset,
    addFontAsset,
    sortedAssetsByType,
    globalProjectAssets,
    projectAssets,
    reloadProjectAssets,
  }
}

const [AssetsStoreProvider, useAssetsStore, AssetsStoreContext] = createContextStore(
  useStoreCreator,
)

export { AssetsStoreProvider, AssetsStoreContext }
export default useAssetsStore
