// 8.5 * 96 pixels per inch
// and 11 * 96 pixels per inch.
export const DOCUMENT_WIDTH = 816
export const DOCUMENT_HEIGHT = 1104
const FONT_FILE_EXTENSIONS = ['.otf', '.ttf', '.woff', '.woff2']

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

const getFileType = (asset) => {
  return FONT_FILE_EXTENSIONS.includes(asset.name.substr(asset.name.lastIndexOf('.')))
    ? 'font'
    : 'image'
}

const filterAssetsByType = (assets, type) => {
  return assets.filter((asset) => {
    return getFileType(asset) === type
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
    id: file.fullPath,
    url: image.src,
    name: file.name,
    size: file.size,
    type: 'image',
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
  loadFont(file)

  return {
    id: file.fullPath,
    name: file.name,
    url: file.url,
    meta: file.meta,
    type: 'font',
    canDelete: true,
    canEdit: true,
    canFile: true,
  }
}

const loadedFonts = []

export const loadFont = async (asset) => {
  if (loadedFonts.includes(asset.name)) {
    return
  }

  try {
    const font = new FontFace(asset.name, `url("${asset.url}")`)
    await font.load()
    document.fonts.add(font)
    loadedFonts.push(asset.name)
  } catch (error) {
    throw error
  }
}

export const prepareAssets = async (assets) => {
  const imageAssets = filterAssetsByType(assets, 'image')
  const fontAssets = filterAssetsByType(assets, 'font')

  const images = await Promise.all(imageAssets.map(prepareImageAsset))
  const fonts = await Promise.all(fontAssets.map(prepareFontAsset))

  return {
    images,
    fonts,
  }
}
