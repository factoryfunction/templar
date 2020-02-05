const DOCUMENT_WIDTH = 2550

const DOCUMENT_HEIGHT = 3300

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
  const heightRatio = image.height / image.width

  return {
    type: 'image',
    url: image.src,
    name: file.name,
    id: file.fullPath,
    height: String(image.height),
    width: String(image.width),
    heightRatio: String(heightRatio),
  }
}

const getInches = (pixels, maxPixels = Infinity) => {
  return pixels > maxPixels ? maxPixels : pixels
}

const getPercent = (value, total) => {
  return (value / total) * 100
}

const getExhaustiveMetadata = (image) => {
  // Calculate original values for a "reset dimensions" feature later.
  const originalPercentWidth = getPercent(image.width, DOCUMENT_WIDTH)
  const originalPercentHeight = getPercent(image.height, DOCUMENT_HEIGHT)
  const originalInchesWidth = getInches(image.width)
  const originalInchesHeight = getInches(image.height)
  const heightRatio = image.height / image.width

  return {
    pixelsWidth: String(image.width),
    pixelsHeight: String(image.height),
    originalInchesWidth: String(originalInchesWidth),
    originalInchesHeight: String(originalInchesHeight),
    percentWidth: String(originalPercentWidth),
    percentHeight: String(originalPercentHeight),
    size: String(file.size),
  }
}
