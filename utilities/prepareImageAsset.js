import { DOCUMENT_WIDTH, DOCUMENT_HEIGHT } from '../consts'

const getInches = (pixels, maxPixels = Infinity) => {
  console.log(pixels > maxPixels, maxPixels, maxPixels / 96)
  return pixels > maxPixels ? maxPixels / 96 : pixels / 96
}

const getPercent = (value, total) => {
  return (value / total) * 100
}

const getImageData = (file) => {
  const reader = new FileReader()
  const blob = URL.createObjectURL(file)
  const image = document.createElement('img')
  image.setAttribute('src', blob)

  return new Promise((resolve) => {
    image.addEventListener('load', () => {
      reader.readAsDataURL(file)
      reader.addEventListener('load', () => {
        const base64 = reader.result
        resolve(finalizeImageAsset(file, image, base64))
      })
    })
  })
}

const finalizeImageAsset = (file, image, base64) => {
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

  const asset = {
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
    base64,
  }

  return asset
}

const prepareImageAsset = (file, suppliedImage, suppliedBase64) => {
  return suppliedImage ? finalizeImageAsset(file, suppliedImage, suppliedBase64) : getImageData(file)
}

export default prepareImageAsset

export const prepareFontAsset = (file) => {
  const reader = new FileReader()

  return new Promise((resolve) => {
    const onBase64 = async () => {
      const base64 = reader.result
      await loadFont(file.name, base64)

      resolve({
        type: 'font',
        name: file.name,
        size: file.size,
        id: file.path,
        canDelete: true,
        canEdit: true,
        canFile: true,
        base64,
      })
    }

    reader.addEventListener('load', onBase64)
    reader.readAsDataURL(file)
  })
}

//
export const loadFont = async (name, url) => {
  const font = new FontFace(name, `url("${url}")`)
  await font.load()
  document.fonts.add(font)
}
