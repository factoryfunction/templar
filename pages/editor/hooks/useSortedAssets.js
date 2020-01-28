import * as React from 'react'
import useAssetsStore from '../../../stores/assetsStore'

const getAccumulator = () => {
  return {
    font: [],
    image: [],
  }
}

const sortAssets = (assets) => {
  const sorted = assets.reduce(
    (final, asset) => {
      final[asset.type].push(asset)
      return final
    },
    { ...getAccumulator() },
  )

  return Object.entries(sorted)
}

export const useSortedAssets = () => {
  const assetsStore = useAssetsStore()
  const sortedAssets = sortAssets(assetsStore.assets)

  return {
    sortedAssets,
    assetsStore,
  }
}
