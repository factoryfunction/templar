import { getFormattedFontsMap } from './getFormattedFonts'
import DEFAULT_FONTS from './googleFonts.json'

class FontsManager extends Map {
  loadedFontUrls = []

  // TODO: Memoize this so if the list of
  // names hasn't changed we can just return
  // the same list from the last invocation.
  get fontNames() {
    return Array.from(this.keys())
  }

  // TODO: Memoize this so if the list of
  // fonts hasn't changed we can just return
  // the same list from the last invocation.
  get fonts() {
    return Array.from(this.values())
  }

  // Basic method for adding a new font family to
  // the manager's memory for quick lookup later.
  add = (fontData) => {
    this.set(fontData.family, fontData)
  }

  // Given a font family name, getFontWeights looks up and
  // returns which font weights are available.
  getFontWeights = (family) => {
    const font = this.get(family)
    return Object.keys(font.fontWeights)
  }

  // Given a font family name and font weight, getFontWeightStyles
  // looks up and returns which font styles are available.
  getFontWeightStyles = (family, weight = '400') => {
    const font = this.get(family)
    const fontWeight = font.fontWeights[weight]
    return Object.keys(fontWeight)
  }

  // Given a font family name, font weight, and font style,
  // getFontUrl looks up and returns the needed url.
  getFontUrl = (family, weight, style) => {
    const font = this.get(family)
    const fontWeight = font.fontWeights[weight]
    return fontWeight[style]
  }

  // Adds a font to the document using a provided name and url.
  // If there is already an element trying to use the font, there
  // will be a temporary laps in which the element inherits its
  // font from a parent element, but once the font has been loaded
  // the element will automatically receive it.
  loadFont = async ({ name, url }) => {
    if (!this.loadedFontUrls.includes(url)) {
      const font = new FontFace(name, `url("${url}")`)
      await font.load()
      document.fonts.add(font)
      this.loadedFontUrls.push(url)
    }
  }

  // A convenience wrapper around this.loadFont. Meant
  // to simplify loading fonts that we provide (via Google fonts)
  // and already have the urls for. When a new font is
  // being introduced (uploaded to a project or downloaded
  // from project storage), loadFont is used with the
  // respective name and url.
  loadFontByName = (name) => {
    const url = this.getFontUrl(name, '400', 'normal')

    this.loadFont({
      name,
      url,
    })
  }
}

const formattedFontsMap = getFormattedFontsMap(DEFAULT_FONTS)
export const fontsManager = new FontsManager(formattedFontsMap)
