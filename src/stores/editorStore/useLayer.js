import { EditorStore } from '#stores/editorStore'

export const useLayerActions = (layerId) => {
  const actions = EditorStore.useStoreActions((actions) => ({
    setName: (value) => actions.setLayerProperty([layerId, 'name', value]),
    setOpacity: (value) => actions.setLayerProperty([layerId, 'styleOpacity', value]),
    setPositionTop: (value) => actions.setLayerProperty([layerId, 'styleTop', value]),
    setPositionLeft: (value) => actions.setLayerProperty([layerId, 'styleLeft', value]),
    setBoxShadow: (value) => actions.setLayerProperty([layerId, 'styleBoxShadow', value]),
    setWidth: (value) => actions.setLayerProperty([layerId, 'styleWidth', value]),
    setHeight: (value) => actions.setLayerProperty([layerId, 'styleHeight', value]),
    selectLayer: () => actions.selectLayer(layerId),
    removeLayer: () => actions.removeLayer(layerId),
    setFontFamily: (value) => actions.setLayerFontFamily([layerId, value]),
    setLetterSpacing: (value) => actions.setLayerProperty([layerId, 'styleLetterSpacing', value]),
    setLineHeight: (value) => actions.setLayerProperty([layerId, 'styleLineHeight', value]),
    setFontWeight: (value) => actions.setLayerProperty([layerId, 'styleFontWeight', value]),
    setFontStyle: (value) => actions.setLayerProperty([layerId, 'styleFontStyle', value]),
    setFontSize: (value) => actions.setLayerProperty([layerId, 'styleFontSize', value]),
    setColor: (value) => actions.setLayerProperty([layerId, 'styleColor', value]),
    setTextShadow: (value) => actions.setLayerProperty([layerId, 'styleTextShadow', value]),
    setIsEditingText: (value) => actions.setLayerProperty([layerId, 'isEditingText', value]),
    setTextValue: (value) => actions.setLayerProperty([layerId, 'textValue', value]),
    setBackgroundColor: (value) =>
      actions.setLayerProperty([layerId, 'styleBackgroundColor', value]),
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
      actions.setWidth(Number(state.styleWidth) + d.width)
      actions.setHeight(Number(state.styleHeight) + d.height)
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
