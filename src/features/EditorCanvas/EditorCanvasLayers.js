import { EditorStore } from '#stores/editorStore'
import { useScale } from '#utilities/useScale'
import { EditorCanvasLayer } from './EditorCanvasLayer'

const useStore = () => {
  const state = EditorStore.useStoreState((state) => ({
    layers: state.layers,
    selectedLayers: state.selectedLayers,
  }))

  const actions = EditorStore.useStoreActions((actions) => ({
    removeLayer: actions.removeLayer,
    duplicateLayer: actions.duplicateLayer,
    selectLayer: actions.selectLayer,
    deselectAllLayers: actions.deselectAllLayers,
    setLayerText: actions.setLayerText,
    setLayerWidth: actions.setLayerWidth,
    setLayerHeight: actions.setLayerHeight,
    setLayerOpacity: actions.setLayerOpacity,
    setLayerBoxShadow: actions.setLayerBoxShadow,
    setLayerTextShadow: actions.setLayerTextShadow,
    setLayerPositionTop: actions.setLayerPositionTop,
    setLayerPositionLeft: actions.setLayerPositionLeft,
    setLayerFontColor: actions.setLayerFontColor,
    setLayerFontWeight: actions.setLayerFontWeight,
    setLayerFontStyle: actions.setLayerFontStyle,
    setLayerLineHeight: actions.setLayerLineHeight,
    setLayerLetterSpacing: actions.setLayerLetterSpacing,
    setIsEditingText: actions.setIsEditingText,
  }))

  return {
    state,
    actions,
  }
}

export const EditorCanvasLayers = (props) => {
  const store = useStore()
  const scale = useScale()

  return (
    <For each='layer' of={store.state.layers}>
      <EditorCanvasLayer
        scale={scale}
        layer={layer}
        key={layer.id}
        store={store}
        {...store.actions}
      />
    </For>
  )
}
