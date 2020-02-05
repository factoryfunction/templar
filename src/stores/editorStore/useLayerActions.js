import { EditorStore } from '#stores/editorStore'

export const useLayerActions = (layerId) => {
  const actions = EditorStore.useStoreActions((actions) => ({
    // Globally available actions.
    setName: (value) => actions.setLayerName([layerId, value]),
    setOpacity: (value) => actions.setLayerOpacity([layerId, value]),
    setBackgroundColor: (value) => actions.setLayerBackgroundColor([layerId, value]),
    removeLayer: () => actions.removeLayer(layerId),
    // Text layer actions.
    setFontLetterSpacing: (value) => actions.setLayerLetterSpacing([layerId, value]),
    setFontLineHeight: (value) => actions.setLayerLineHeight([layerId, value]),
    setFontWeight: (value) => actions.setLayerFontWeight([layerId, value]),
    setFontStyle: (value) => actions.setLayerFontStyle([layerId, value]),
    setFontSize: (value) => actions.setLayerFontSize([layerId, value]),
    setFontColor: (value) => actions.setLayerFontColor([layerId, value]),
    setFontFamily: (value) => actions.setLayerFontFamily([layerId, value]),
    setTextValue: (value) => actions.setLayerText([layerId, value]),
    // Box layer actions.
    // NONE SPECIFICALLY YET.
  }))

  return actions
}

export const useLayerState = (layerId) => {
  const state = EditorStore.useStoreState((state) => ({
    layer: state.layers.find((stateLayer) => stateLayer.id === layerId),
    isSelected: state.selectedLayers.includes(layerId),
  }))

  return {
    ...state.layer,
    isSelected: state.isSelected,
  }
}

export const useLayer = (layerId) => {
  const state = useLayerState(layerId)
  const actions = useLayerActions(layerId)

  return {
    ...state,
    ...actions,
  }
}
