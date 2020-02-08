import { action, computed } from 'easy-peasy'

export const scaleUp = action((state) => {
  state.scale += 0.1
})

export const scaleDown = action((state) => {
  state.scale -= 0.1
})

export const setScale = action((state, value) => {
  state.scale = value
})

export const setPanX = action((state, value) => {
  state.panX = value
})

export const setPanY = action((state, value) => {
  state.panY = value
})

export const setPanToLayer = action((state, layerId) => {
  const layer = document.querySelector(`[data-layer-id="${layerId}"]`)
  // getBoundingRectClient shit
  // get top and left points
  // set panPosition to top/left - 10% or something
})

export const setIsPanningEnabled = action((state, value) => {
  state.isPanningEnabled = value
})
