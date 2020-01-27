import { DEFAULT_FONT_BASE64 } from './base64'

export const PLACEHOLDER_IMAGE_URL = '/images/editor-placeholder-image.png'
export const DEFAULT_FONT_URL = '/fonts/WorkSans-Regular.ttf'

const PLACEHOLDER_IMAGE_ASSET = {
  type: 'image',
  id: 'placeholder-image',
  url: '/images/editor-placeholder-image.png',
  name: 'PlaceholderImage.png',
  size: 5537,
  canDelete: false,
  canEdit: false,
  canFile: false,
  heightRatio: 0.6002087682672234,
  height: 5.101774530271398,
  width: 8.5,
  originalDimensions: {
    pixelsWidth: 958,
    pixelsHeight: 575,
    width: 9.979166666666666,
    height: 5.989583333333333,
    percentWidth: 117.40196078431373,
    percentHeight: 52.083333333333336,
  },
}

const DEFAULT_FONT_ASSET = {
  type: 'font',
  name: 'WorkSans-Regular.ttf',
  size: 131620,
  id: 'WorkSans-Regular.ttf',
  canDelete: false,
  canEdit: false,
  canFile: false,
  base64: DEFAULT_FONT_BASE64,
  url: DEFAULT_FONT_URL,
}

export const DEFAULT_ASSETS = {
  placeholderImageAsset: PLACEHOLDER_IMAGE_ASSET,
  defaultFontAsset: DEFAULT_FONT_ASSET,
}
