import fonts from './fonts.json'

// NOTE: For potential use later to fetch updated
// list of Google fonts.
export const GOOGLE_FONTS_API_URL =
  'https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity'

export const GOOGLE_FONTS_MAP = new Map(fonts)
export const GOOGLE_FONT_NAMES = Array.from(GOOGLE_FONTS_MAP.keys())
export const GOOGLE_FONTS_LIST = Array.from(GOOGLE_FONTS_MAP.values())
