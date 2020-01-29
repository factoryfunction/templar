const getAccumulator = () => {
  return {
    fonts: [],
    images: [],
  }
}

const getAssetType = (asset) => {
  if (asset.meta.contentType.includes('image')) {
    return 'images'
  }

  if (asset.meta.contentType.includes('octet-stream')) {
    return 'fonts'
  }
}

export const organizeAssets = (assets = []) => {
  const sort = (final, asset) => {
    const type = getAssetType(asset)
    final[type].push(asset)
    return final
  }

  return assets.reduce(sort, getAccumulator())
}
