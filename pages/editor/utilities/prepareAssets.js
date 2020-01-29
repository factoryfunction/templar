import { organizeAssets } from './organizeAssets'
import { DOCUMENT_WIDTH, DOCUMENT_HEIGHT } from '../../../consts'

const getInches = (pixels, maxPixels = Infinity) => {
  return pixels > maxPixels ? maxPixels / 96 : pixels / 96
}

const getPercent = (value, total) => {
  return (value / total) * 100
}

const getImage = (url) => {
  const image = document.createElement('img')

  return new Promise((resolve) => {
    image.setAttribute('src', url)
    image.addEventListener('load', () => {
      resolve(image)
    })
  })
}

export const prepareImageAsset = async (file) => {
  const image = await getImage(file.url)

  // Calculate original values for a "reset dimensions" feature later.
  const originalPercentWidth = getPercent(image.width, DOCUMENT_WIDTH)
  const originalPercentHeight = getPercent(image.height, DOCUMENT_HEIGHT)
  const originalInchesWidth = getInches(image.width)
  const originalInchesHeight = getInches(image.height)

  // Calculate values for the asset to start with once placed.
  const startingWidth = getInches(image.width, DOCUMENT_WIDTH)
  const heightRatio = image.height / image.width
  const startingHeight = startingWidth * heightRatio

  const originalDimensions = {
    pixelsWidth: image.width,
    pixelsHeight: image.height,
    width: originalInchesWidth,
    height: originalInchesHeight,
    percentWidth: originalPercentWidth,
    percentHeight: originalPercentHeight,
  }

  return {
    type: 'image',
    url: image.src,
    name: file.name,
    size: file.size,
    canDelete: true,
    canEdit: true,
    canFile: true,
    height: startingHeight,
    width: startingWidth,
    originalDimensions,
    heightRatio,
  }
}

export const prepareFontAsset = async (file) => {
  await loadFont(file)

  return {
    type: 'font',
    id: file.fullPath,
    name: file.name,
    url: file.url,
    meta: file.meta,
    canDelete: true,
    canEdit: true,
    canFile: true,
  }
}

const loadFont = async (asset) => {
  const font = new FontFace(asset.name, `url("${asset.url}")`)
  await font.load()
  document.fonts.add(font)
}

export const prepareAssets = async (assets) => {
  const organizedAssets = organizeAssets(assets)
  const images = await Promise.all(organizedAssets.images.map(prepareImageAsset))
  const fonts = await Promise.all(organizedAssets.fonts.map(prepareFontAsset))

  return {
    images,
    fonts,
  }
}
