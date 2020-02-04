import * as React from 'react'

const FONT_FILE_EXTENSIONS = ['.otf', '.ttf', '.woff', '.woff2']

const hasFontFileExtension = (name) => {
  const extension = name.substr(name.lastIndexOf('.'))
  return FONT_FILE_EXTENSIONS.includes(extension)
}

export const loadFont = async (name, url) => {
  const font = new FontFace(name, `url("${url}")`)
  await font.load()
  document.fonts.add(font)
}

const loadFonts = (assets = []) => {
  assets.fonts.forEach((asset) => {
    if (hasFontFileExtension(asset.name)) {
      loadFont(asset.name, asset.url)
    }
  })
}

export const useFontLoader = (assets = []) => {
  React.useEffect(() => loadFonts(assets), [assets.length])
}
