import { EditorStore } from '#stores/editorStore'

export const useCanvas = () => {
  const state = EditorStore.useStoreState((state) => ({
    isPanningEnabled: state.isPanningEnabled,
    panPosition: state.panPosition,
    scale: state.scale,
    panX: state.panX,
    panY: state.panY,
  }))

  const actions = EditorStore.useStoreActions((actions) => ({
    scaleUp: actions.scaleUp,
    scaleDown: actions.scaleDown,
    setScale: actions.setScale,
    setPanX: actions.setPanX,
    setPanY: actions.setPanY,
    setPanToLayer: actions.setPanToLayer,
    setIsPanningEnabled: actions.setIsPanningEnabled,
  }))

  return {
    ...state,
    ...actions,
  }
}
