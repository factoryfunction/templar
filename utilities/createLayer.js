import nanoid from 'nanoid'

const createLayer = (type) => {
  if (type === 'text') return createTextLayer()
  if (type === 'image') return createImageLayer()
  if (type === 'block') return createBlockLayer()
}

const createTextLayer = () => {
  return {
    isWidthRestrictedToDocument: true,
    isSelected: false,
    isBeingEdited: false,
    isRatioLocked: true,
    canFile: true,
    type: 'text',
    name: 'Text Layer',
    text: 'some text',
    fontAsset: null,
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: 2.5,
      height: 1.5,
      fontFamily: 'Work Sans',
      fontStyle: 'normal',
      fontWeight: 400,
      letterSpacing: 0.5,
      lineHeight: '140%',
    },
  }
}

const createImageLayer = () => {
  return {
    isWidthRestrictedToDocument: true,
    isSelected: false,
    isBeingEdited: false,
    isRatioLocked: true,
    canFile: true,
    type: 'image',
    name: 'Image Layer',
    imageAsset: null,
    url: null,
    style: {
      display: 'flex',
      backgroundSize: 'cover',
      position: 'absolute',
      top: 0,
      left: 0,
    },
  }
}

const createBlockLayer = () => {
  return {
    isWidthRestrictedToDocument: true,
    isSelected: false,
    isBeingEdited: false,
    isRatioLocked: true,
    canFile: true,
    type: 'block',
    name: 'Block Layer',
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: 2.5,
      height: 1.5,
      backgroundColor: 'rgba(0,0,0,0.75)',
    },
  }
}

export default createLayer
