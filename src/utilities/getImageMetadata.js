const DOCUMENT_WIDTH = 816
const DOCUMENT_HEIGHT = 1065

const getImage = (url) => {
  const image = document.createElement('img')

  return new Promise((resolve) => {
    image.setAttribute('src', url)
    image.addEventListener('load', () => {
      resolve(image)
    })
  })
}

export const getImageData = async (files) => {
  if (Array.isArray(files)) {
    return await Promise.all(files.map(getFileImageData))
  } else {
    return await getFileImageData(files)
  }
}

export const getFileImageData = async (file) => {
  const image = await getImage(file.fileUrl)
  const heightRatio = image.height / image.width

  return {
    fileUrl: image.src,
    fileName: file.fileName,
    filePath: file.filePath,
    styleOriginalHeight: image.height,
    styleOriginalWidth: image.width,
    styleHeightRatio: heightRatio,
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
