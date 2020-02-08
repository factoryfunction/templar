import { EditorStore } from '#stores/editorStore'

export const useLayerActions = (layerId) => {
  const actions = EditorStore.useStoreActions((actions) => ({
    // Globally available actions.
    setName: (value) => actions.setLayerName([layerId, value]),
    setOpacity: (value) => actions.setLayerOpacity([layerId, value]),
    setPositionTop: (value) => actions.setLayerPositionTop([layerId, value]),
    setPositionLeft: (value) => actions.setLayerPositionLeft([layerId, value]),
    setBackgroundColor: (value) => actions.setLayerBackgroundColor([layerId, value]),
    setBoxShadow: (value) => actions.setLayerBoxShadow([layerId, value]),
    setWidth: (value) => actions.setLayerWidth([layerId, value]),
    setHeight: (value) => actions.setLayerHeight([layerId, value]),
    selectLayer: () => actions.selectLayer(layerId),
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
    setTextShadow: (value) => actions.setLayerTextShadow([layerId, value]),
    setIsEditingText: (value) => actions.setIsEditingText([layerId, value]),
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

export const useLayer = (layerId, layerType) => {
  const state = useLayerState(layerId)
  const actions = useLayerActions(layerId)

  const extendedActions = {
    onCanvasLayerSingleClick: () => {
      actions.selectLayer(layerId)
    },

    onCanvasLayerDoubleClick: () => {
      actions.selectLayer(layerId)

      if (layerType === 'text') {
        actions.setIsEditingText(true)
      }
    },

    onCanvasLayerDrop: (_, data) => {
      actions.setPositionLeft(data.x)
      actions.setPositionTop(data.y)
    },

    onCanvasLayerResizeStop: (_, __, ___, d) => {
      actions.setWidth(state.styleWidth + d.width)
      actions.setHeight(state.styleHeight + d.height)
    },
  }

  return {
    ...state,
    ...actions,
    ...extendedActions,
  }
}

export const withLayerSubscription = (Component) => {
  return React.memo((props) => {
    const layer = useLayer(props.layerId, props.layerType)
    return <Component {...props} {...layer} />
  })
}
