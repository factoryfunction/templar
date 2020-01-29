import styled from 'styled-components'
import useLayersStore from '../stores/layersStore'
import useLayerClickHandlers from '../utilities/useLayerClickHandlers'
import useAssetsStore from '../stores/assetsStore'
import Draggable, { DraggableCore } from 'react-draggable' // Both at the same time
import useScale from './useScaleState'
import { Rnd } from 'react-rnd'
import Icon from './Icon'
import { useHotkeys } from 'react-hotkeys-hook'

const CanvasLayers = (props) => {
  const layersStore = useLayersStore()
  const assetsStore = useAssetsStore()

  return (
    <For each='layer' of={layersStore.layers}>
      <CanvasLayer
        layer={layer}
        key={layer.id}
        layersStore={layersStore}
        assetsStore={assetsStore}
      />
    </For>
  )
}

const CanvasLayer = (props) => {
  const scale = useScale()

  useHotkeys(
    'delete,backspace',
    (e) => {
      e.preventDefault()
      props.layer.isSelected && props.layersStore.removeLayer(props.layer.id)
    },
    [props.layer.isSelected],
  )

  useHotkeys(
    'ctrl+d',
    (e) => {
      e.preventDefault()
      props.layer.isSelected && props.layersStore.duplicateLayer(props.layer)
    },
    [props.layer.isSelected],
  )

  return (
    <Choose>
      <When condition={props.layer.type === 'text'}>
        <TextCanvasLayer scale={scale} layersStore={props.layersStore} layer={props.layer} />
      </When>
      <When condition={props.layer.type === 'image'}>
        <ImageCanvasLayer scale={scale} layersStore={props.layersStore} layer={props.layer} />
      </When>
      <When condition={props.layer.type === 'block'}>
        <BlockCanvasLayer scale={scale} layersStore={props.layersStore} layer={props.layer} />
      </When>
    </Choose>
  )
}

const ResizeHandle = (
  <div
    className='ResizeHandle'
    style={{
      width: 12,
      height: 12,
      background: 'white',
      border: '1px solid black',
      borderRadius: 20,
      margin: '2px 4px',
      opacity: 0,
    }}
  />
)

const TextCanvasLayer = (props) => {
  const onClick = (event) => {
    props.layersStore.selectLayer(props.layer.id)
    props.layersStore.enableLayerEditing(props.layer.id)
  }

  const style = {
    ...props.layer.style,
    width: '100%',
    height: '100%',
    top: props.layer.style.top + 'in',
    left: props.layer.style.left + 'in',
    fontFamily: `"${props.layer.style.fontFamily}"`,
    overflow: 'hidden',
  }

  const onDrop = (event, position) => {
    props.layersStore.setLayerStyle(props.layer.id, 'left', position.x / 96)
    props.layersStore.setLayerStyle(props.layer.id, 'top', position.y / 96)
  }

  const onResizeStop = (e, direction, ref, d) => {
    props.layersStore.setLayerStyle(
      props.layer.id,
      'width',
      props.layer.style.width + d.width / 96,
    )
    props.layersStore.setLayerStyle(
      props.layer.id,
      'height',
      props.layer.style.height + d.height / 96,
    )
  }

  return (
    <Rnd
      resizeHandleComponent={{
        topLeft: ResizeHandle,
        topRight: ResizeHandle,
        bottomRight: ResizeHandle,
        bottomLeft: ResizeHandle,
      }}
      disableDragging={!props.layer.isSelected}
      scale={props.scale}
      onDragStop={onDrop}
      onResizeStop={onResizeStop}
      default={{
        x: props.layer.style.left * 96,
        y: props.layer.style.top * 96,
        width: props.layer.style.width * 96,
        height: props.layer.style.height * 96,
      }}
    >
      <p
        onClick={onClick}
        className='CanvasLayer'
        data-is-selected={props.layer.isSelected}
        style={style}
      >
        <For each='line' of={props.layer.text.split('\n')}>
          <React.Fragment key={line}>
            {line}
            <br />
          </React.Fragment>
        </For>
      </p>
    </Rnd>
  )
}

const BlockCanvasLayer = (props) => {
  const onClick = (event) => {
    props.layersStore.selectLayer(props.layer.id)
    props.layersStore.enableLayerEditing(props.layer.id)
  }

  const style = {
    ...props.layer.style,
    top: props.layer.style.top + 'in',
    left: props.layer.style.left + 'in',
    width: '100%',
    height: '100%',
  }

  const onDrop = (event, position) => {
    props.layersStore.setLayerStyle(props.layer.id, 'left', position.x / 96)
    props.layersStore.setLayerStyle(props.layer.id, 'top', position.y / 96)
  }

  const onResizeStop = (e, direction, ref, d) => {
    props.layersStore.setLayerStyle(
      props.layer.id,
      'width',
      props.layer.style.width + d.width / 96,
    )
    props.layersStore.setLayerStyle(
      props.layer.id,
      'height',
      props.layer.style.height + d.height / 96,
    )
  }

  return (
    <Rnd
      resizeHandleComponent={{
        topLeft: ResizeHandle,
        topRight: ResizeHandle,
        bottomRight: ResizeHandle,
        bottomLeft: ResizeHandle,
      }}
      disableDragging={!props.layer.isSelected}
      scale={props.scale}
      onDragStop={onDrop}
      onResizeStop={onResizeStop}
      default={{
        x: props.layer.style.left * 96,
        y: props.layer.style.top * 96,
        width: props.layer.style.width * 96,
        height: props.layer.style.height * 96,
      }}
    >
      <div
        onClick={onClick}
        className='CanvasLayer'
        data-is-selected={props.layer.isSelected}
        style={style}
      />
    </Rnd>
  )
}

const ImageCanvasLayer = (props) => {
  const onClick = (event) => {
    props.layersStore.selectLayer(props.layer.id)
    props.layersStore.enableLayerEditing(props.layer.id)
  }

  const onDrop = (event, position) => {
    props.layersStore.setLayerStyle(props.layer.id, 'left', position.x / 96)
    props.layersStore.setLayerStyle(props.layer.id, 'top', position.y / 96)
  }

  const onResizeStop = (e, direction, ref, d) => {
    props.layersStore.setLayerStyle(
      props.layer.id,
      'width',
      props.layer.style.width + d.width / 96,
    )
    props.layersStore.setLayerStyle(
      props.layer.id,
      'height',
      props.layer.style.height + d.height / 96,
    )
  }

  const { width, height, ...layerStyle } = props.layer.style

  const style = {
    ...layerStyle,
    width: '100%',
    height: '100%',
    top: props.layer.style.top + 'in',
    left: props.layer.style.left + 'in',
    backgroundImage: `url("${props.layer.imageAsset.url}")`,
    backgroundSize: '100%',
  }

  return (
    <Rnd
      resizeHandleComponent={{
        topLeft: ResizeHandle,
        topRight: ResizeHandle,
        bottomRight: ResizeHandle,
        bottomLeft: ResizeHandle,
      }}
      lockAspectRatio={true}
      disableDragging={!props.layer.isSelected}
      scale={props.scale}
      onDragStop={onDrop}
      onResizeStop={onResizeStop}
      default={{
        x: props.layer.style.left * 96,
        y: props.layer.style.top * 96,
        width: props.layer.style.width * 96,
        height: props.layer.style.height * 96,
      }}
    >
      <div
        onClick={onClick}
        className='CanvasLayer'
        data-is-selected={String(props.layer.isSelected)}
        style={style}
      />
    </Rnd>
  )
}

export default CanvasLayers
