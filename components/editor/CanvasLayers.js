import useScale from '../useScaleState'
import { Rnd } from 'react-rnd'
import Icon from '../Icon'
import { useHotkeys } from 'react-hotkeys-hook'
import { EditorStore } from './utilities/editorStore'

const useStore = () => {
  const state = EditorStore.useStoreState((state) => ({
    layers: state.layers,
    selectedLayers: state.selectedLayers,
  }))

  const actions = EditorStore.useStoreActions((actions) => ({
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

// Functions used to choose static, constant
// values for providing to react-rnd.

const RESIZE_HANDLE_SELECTED_STYLE = {
  display: 'inherit',
}

const RESIZE_HANDLE_NOT_SELECTED_STYLE = {
  display: 'none',
}

const getResizeHandleWrapperStyle = (isSelected) => {
  return isSelected ? RESIZE_HANDLE_SELECTED_STYLE : RESIZE_HANDLE_NOT_SELECTED_STYLE
}

const CanvasLayers = (props) => {
  const store = useStore()
  const scale = useScale()

  return (
    <For each='layer' of={store.state.layers}>
      <CanvasLayer scale={scale} layer={layer} key={layer.id} store={store} />
    </For>
  )
}

const CanvasLayer = (props) => {
  const isSelected = props.store.state.selectedLayers.includes(props.layer.id)
  const resizeHandleWrapperStyle = getResizeHandleWrapperStyle(isSelected)

  return (
    <Choose>
      <When condition={props.layer.type === 'text'}>
        <TextCanvasLayer
          scale={props.scale}
          store={props.store}
          isSelected={isSelected}
          layer={props.layer}
          resizeHandleWrapperStyle={resizeHandleWrapperStyle}
        />
      </When>
      <When condition={props.layer.type === 'image'}>
        <ImageCanvasLayer
          scale={props.scale}
          store={props.store}
          isSelected={isSelected}
          layer={props.layer}
          resizeHandleWrapperStyle={resizeHandleWrapperStyle}
        />
      </When>
      <When condition={props.layer.type === 'block'}>
        <BlockCanvasLayer
          scale={props.scale}
          store={props.store}
          isSelected={isSelected}
          layer={props.layer}
          resizeHandleWrapperStyle={resizeHandleWrapperStyle}
        />
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
      opacity: 0,
    }}
  />
)

const resizeHandleComponents = {
  topLeft: ResizeHandle,
  topRight: ResizeHandle,
  bottomRight: ResizeHandle,
  bottomLeft: ResizeHandle,
}

const TextCanvasLayer = (props) => {
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
    lineHeight: `${props.layer.style.lineHeight}%`,
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
      resizeHandleComponent={resizeHandleComponents}
      resizeHandleWrapperStyle={props.resizeHandleWrapperStyle}
      disableDragging={!props.isSelected}
      scale={props.scale}
      onDragStop={onDrop}
      onResizeStop={onResizeStop}
      className={props.isSelected ? 'SelectedCanvasLayer' : ''}
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
        data-is-selected={props.isSelected}
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
      className={props.isSelected ? 'SelectedCanvasLayer' : ''}
      resizeHandleComponent={resizeHandleComponents}
      resizeHandleWrapperStyle={props.resizeHandleWrapperStyle}
      disableDragging={!props.isSelected}
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
        data-is-selected={props.isSelected}
        style={style}
      />
    </Rnd>
  )
}

const ImageCanvasLayer = (props) => {
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
  const backgroundUrl = props.layer.imageAsset && props.layer.imageAsset.url

  const style = {
    ...layerStyle,
    width: '100%',
    height: '100%',
    top: props.layer.style.top + 'in',
    left: props.layer.style.left + 'in',
    backgroundImage: `url("${backgroundUrl}")`,
    backgroundSize: '100%',
  }

  return (
    <Rnd
      className={props.isSelected ? 'SelectedCanvasLayer' : ''}
      resizeHandleComponent={resizeHandleComponents}
      resizeHandleWrapperStyle={props.resizeHandleWrapperStyle}
      lockAspectRatio={true}
      disableDragging={!props.isSelected}
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
        data-is-selected={String(props.isSelected)}
        style={style}
      />
    </Rnd>
  )
}

export default CanvasLayers