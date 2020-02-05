// 8.5 * 96 pixels per inch.
export const DOCUMENT_WIDTH = 816

// 11 * 96 pixels per inch.
export const DOCUMENT_HEIGHT = 1104

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

export const getImageMetadata = async (file) => {
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

  return {
    type: 'image',
    url: image.src,
    name: file.name,
    id: file.fullPath,
    size: String(file.size),
    height: String(startingHeight),
    width: String(startingWidth),
    pixelsWidth: String(image.width),
    pixelsHeight: String(image.height),
    originalInchesWidth: String(originalInchesWidth),
    originalInchesHeight: String(originalInchesHeight),
    percentWidth: String(originalPercentWidth),
    percentHeight: String(originalPercentHeight),
    heightRatio: String(heightRatio),
  }
}
