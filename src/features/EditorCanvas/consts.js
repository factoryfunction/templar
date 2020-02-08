export const PAN_SCALE_WRAPPER_PROPS = {
  defaultScale: 0.5,
  scale: 0.5,
  defaultPositionX: 565,
  defaultPositionY: 80,
  style: { width: '100%', height: '100%' },
  zoomIn: {
    step: 100,
  },
  zoomOut: {
    step: 100,
  },
  options: {
    minScale: 0.3,
    limitToBounds: true,
    transformEnabled: true,
    disabled: false,
    limitToWrapper: true,
    centerContent: false,
  },
  scalePadding: { size: 222 },
  pinch: { disabled: true },
  doubleClick: { disabled: true },
  wheel: {
    wheelEnabled: true,
    touchPadEnabled: false,
    limitsOnWheel: false,
    step: 100,
  },
}
