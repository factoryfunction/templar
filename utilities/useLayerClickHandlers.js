import * as React from 'react'
import useDoubleClick from 'use-double-click'
import useLayersStore from '../stores/layersStore'

const useLayerClickHandlers = (id) => {
  const layersStore = useLayersStore()
  const layerRef = React.useRef()

  useDoubleClick({
    onSingleClick: (event) => {
      if (!event.target.getAttribute('data-is-component-action')) {
        layersStore.selectLayer(id)
      }
    },
    onDoubleClick: (event) => {
      layersStore.enableLayerEditing(id)
    },
    ref: layerRef,
    latency: 250,
  })

  return {
    layerRef,
  }
}

export default useLayerClickHandlers
