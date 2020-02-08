import { EditorStore } from '#stores/editorStore'
import EditorCanvasLayer from './EditorCanvasLayer'

const useLayersList = () => {
  return EditorStore.useStoreState((state) => state.layers)
}

export const EditorCanvasLayers = () => {
  const layers = useLayersList()

  return (
    <For each='layer' of={layers}>
      <EditorCanvasLayer layerType={layer.type} layerId={layer.id} key={layer.id} />
    </For>
  )
}
