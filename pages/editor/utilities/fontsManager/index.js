import { getFormattedFontsMap } from './getFormattedFonts'
import DEFAULT_FONTS from './defaultFonts.json'

class FontsManager extends Map {
  fontNames = Array.from(this.keys())
  fonts = Array.from(this.values())

  add = (fontData) => {
    this.set(fontData.family, fontData)
  }

  getFontWeights = (family) => {
    const font = this.get(family)
    return Object.keys(font.fontWeights)
  }

  getFontWeightStyles = (family, weight) => {
    const font = this.get(family)
    const fontWeight = font.fontWeights[weight]
    return Object.keys(fontWeight)
  }

  getFontUrl = (family, weight, style) => {
    const font = this.get(family)
    const fontWeight = font.fontWeights[weight]
    return fontWeight[style]
  }
}

export const fontsManager = new FontsManager(getFormattedFontsMap(DEFAULT_FONTS))

// NOTE: For potential use later to fetch updated list of Google fonts.
// export const GOOGLE_FONTS_API_URL = 'https://www.googleapis.com/webfonts/v1/webfonts?sort=alpha&key=API_KEY'
