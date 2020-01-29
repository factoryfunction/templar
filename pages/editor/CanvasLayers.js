import useScale from '../../components/useScaleState'
import { Rnd } from 'react-rnd'
import Icon from '../../components/Icon'
import { useHotkeys } from 'react-hotkeys-hook'
import { useStoreState, useStoreActions } from 'easy-peasy'

const useStore = () => {
  const state = useStoreState((state) => ({
    layers: state.layers,
    selectedLayers: state.selectedLayers,
  }))

  const actions = useStoreActions((actions) => ({
    removeLayer: actions.removeLayer,
    duplicateLayer: actions.duplicateLayer,
    selectLayer: actions.selectLayer,
    setLayerStyle: actions.setLayerStyle,
  }))

  return {
    state,
    actions,
  }
}

const CanvasLayers = (props) => {
  const store = useStore()

  return (
    <For each='layer' of={store.state.layers}>
      <CanvasLayer layer={layer} key={layer.id} store={store} />
    </For>
  )
}

const CanvasLayer = (props) => {
  const scale = useScale()
  const isSelected = props.store.state.selectedLayers.includes(props.layer.id)

  useHotkeys(
    'delete,backspace',
    (e) => {
      e.preventDefault()
      isSelected && props.store.actions.removeLayer(props.layer.id)
    },
    [isSelected],
  )

  useHotkeys(
    'ctrl+d',
    (e) => {
      e.preventDefault()
      isSelected && props.store.actions.duplicateLayer(props.layer)
    },
    [isSelected],
  )

  return (
    <Choose>
      <When condition={props.layer.type === 'text'}>
        <TextCanvasLayer scale={scale} store={props.store} layer={props.layer} />
      </When>
      <When condition={props.layer.type === 'image'}>
        <ImageCanvasLayer scale={scale} store={props.store} layer={props.layer} />
      </When>
      <When condition={props.layer.type === 'block'}>
        <BlockCanvasLayer scale={scale} store={props.store} layer={props.layer} />
      </When>
    </Choose>
  )
}

const ResizeHandle = (
  <div
    className='ResizeHandle'
    style={{
      width: 8,
      height: 8,
      background: 'white',
      border: '1px solid black',
      borderRadius: 20,
      margin: '6px 6px',
      opacity: 1,
    }}
  />
)

const TextCanvasLayer = (props) => {
  const isSelected = props.store.state.selectedLayers.includes(props.layer.id)

  const onClick = (event) => {
    props.store.actions.selectLayer(props.layer.id)
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
    props.store.actions.setLayerStyle([props.layer.id, 'left', position.x / 96])
    props.store.actions.setLayerStyle([props.layer.id, 'top', position.y / 96])
  }

  const onResizeStop = (e, direction, ref, d) => {
    props.store.actions.setLayerStyle([
      props.layer.id,
      'width',
      props.layer.style.width + d.width / 96,
    ])

    props.store.actions.setLayerStyle([
      props.layer.id,
      'height',
      props.layer.style.height + d.height / 96,
    ])
  }

  return (
    <Rnd
      resizeHandleComponent={{
        topLeft: ResizeHandle,
        topRight: ResizeHandle,
        bottomRight: ResizeHandle,
        bottomLeft: ResizeHandle,
      }}
      disableDragging={!isSelected}
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
      <p onClick={onClick} className='CanvasLayer' data-is-selected={isSelected} style={style}>
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
  const isSelected = props.store.state.selectedLayers.includes(props.layer.id)
  const onClick = (event) => {
    props.store.actions.selectLayer(props.layer.id)
  }

  const style = {
    ...props.layer.style,
    top: props.layer.style.top + 'in',
    left: props.layer.style.left + 'in',
    width: '100%',
    height: '100%',
  }

  const onDrop = (event, position) => {
    props.store.actions.setLayerStyle([props.layer.id, 'left', position.x / 96])
    props.store.actions.setLayerStyle([props.layer.id, 'top', position.y / 96])
  }

  const onResizeStop = (e, direction, ref, d) => {
    props.store.actions.setLayerStyle([
      props.layer.id,
      'width',
      props.layer.style.width + d.width / 96,
    ])

    props.store.actions.setLayerStyle([
      props.layer.id,
      'height',
      props.layer.style.height + d.height / 96,
    ])
  }

  return (
    <Rnd
      resizeHandleComponent={{
        topLeft: ResizeHandle,
        topRight: ResizeHandle,
        bottomRight: ResizeHandle,
        bottomLeft: ResizeHandle,
      }}
      disableDragging={!isSelected}
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
        data-is-selected={isSelected}
        style={style}
      />
    </Rnd>
  )
}

const ImageCanvasLayer = (props) => {
  const isSelected = props.store.state.selectedLayers.includes(props.layer.id)

  const onClick = (event) => {
    props.store.actions.selectLayer(props.layer.id)
  }

  const onDrop = (event, position) => {
    props.store.actions.setLayerStyle([props.layer.id, 'left', position.x / 96])
    props.store.actions.setLayerStyle([props.layer.id, 'top', position.y / 96])
  }

  const onResizeStop = (e, direction, ref, d) => {
    props.store.actions.setLayerStyle([
      props.layer.id,
      'width',
      props.layer.style.width + d.width / 96,
    ])

    props.store.actions.setLayerStyle([
      props.layer.id,
      'height',
      props.layer.style.height + d.height / 96,
    ])
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
      disableDragging={!isSelected}
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
        data-is-selected={String(isSelected)}
        style={style}
      />
    </Rnd>
  )
}

export default CanvasLayers
