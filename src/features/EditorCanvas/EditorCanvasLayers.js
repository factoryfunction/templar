import { EditorStore } from '#stores/editorStore'
import { useScale } from '#utilities/useScale'
import EditorCanvasLayer from './EditorCanvasLayer'

const useLayersList = () => {
  return EditorStore.useStoreState((state) => state.layers)
}

export const EditorCanvasLayers = () => {
  const layers = useLayersList()
  const { scale } = useScale()

  return (
    <For each='layer' of={layers}>
      <EditorCanvasLayer scale={scale} layerType={layer.type} layerId={layer.id} key={layer.id} />
    </For>
  )
}
