import * as React from 'react'
import useDoubleClick from 'use-double-click'
import layersStore from '../stores/layersStore'

const useLayer = (layerId) => {
  const { layer, index } = layersStore.getLayerById(layerId)
  const layerRef = React.useRef()

  const selectLayer = React.useCallback(() => {
    layersStore.selectLayer(layerId)
  }, [])

  const removeLayer = React.useCallback(() => {
    layersStore.removeLayer(layerId)
  }, [])

  const setLayerName = React.useCallback((event) => {
    layersStore.setLayerName(layerId, event.target.value)
  }, [])

  const setLayerText = React.useCallback((event) => {
    layersStore.setLayerText(layerId, event.target.value)
  }, [])

  const setLayerStyleLeft = React.useCallback((event) => {
    layersStore.setLayerStyle(layerId, 'left', event.target.value + '%')
  }, [])

  const setLayerStyleTop = React.useCallback((event) => {
    layersStore.setLayerStyle(layerId, 'top', event.target.value + '%')
  }, [])

  const setLayerStyleSize = React.useCallback((event) => {
    layersStore.setLayerStyle(layerId, 'size', Number(event.target.value))
  }, [])

  const setLayerStyleWidth = React.useCallback((event) => {
    layersStore.setLayerStyle(layerId, 'width', event.target.value + '%')
  }, [])

  const setLayerStyleMaxWidth = React.useCallback((event) => {
    layersStore.setLayerStyle(layerId, 'maxWidth', event.target.value + '%')
  }, [])

  const setLayerStyleHeight = React.useCallback((event) => {
    layersStore.setLayerStyle(layerId, 'height', event.target.value + '%')
  }, [])

  const setLayerStylePlaceholderImageUrl = React.useCallback((event) => {
    layersStore.setLayerStyle(layerId, 'backgroundImage', `url(${event.target.value})`)
  }, [])

  const setLayerUrl = React.useCallback((event) => {
    layersStore.setLayerUrl(layerId, event.target.value)
  }, [])

  useDoubleClick({
    onSingleClick: (e) => {
      layersStore.selectLayer(layerId)
    },
    onDoubleClick: (e) => {
      layersStore.enableLayerEditing(layerId, true)
    },
    ref: layerRef,
    latency: 250,
  })

  const layerActions = {
    selectLayer,
    removeLayer,
    setLayerName,
    setLayerText,
    setLayerStyleLeft,
    setLayerStyleTop,
    setLayerStyleSize,
    setLayerStyleWidth,
    setLayerStyleMaxWidth,
    setLayerStyleHeight,
    setLayerStylePlaceholderImageUrl,
    setLayerUrl,
  }

  return {
    layer,
    layerActions,
    layerRef,
  }
}

export default useLayer
