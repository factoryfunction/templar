import { Rnd } from 'react-rnd'

const prepareImageCanvasLayerStyles = (props) => {
  const element = {
    // Rnd (container) receives the custom width/height. The
    // p element always uses 100% to fill that space.
    width: '100%',
    height: '100%',
    backgroundSize: '100%',
    backgroundImage: `url("${props.layer.fileUrl}")`,
    opacity: props.layer.styleOpacity,
    top: props.layer.styleTop,
    left: props.layer.styleLeft,
  }

  const container = {
    width: props.layer.styleWidth,
    height: props.layer.styleHeight,
    y: props.layer.styleTop,
    x: props.layer.styleLeft,
  }

  return { element, container }
}

export const ImageCanvasLayer = (props) => {
  const styles = prepareImageCanvasLayerStyles(props)

  return (
    <Rnd
      data-layer-id={props.layer.id}
      lockAspectRatio={true}
      scale={props.scale}
      onDragStop={props.onDrop}
      default={styles.container}
      onClick={props.onSingleClick}
      className={props.rndClassName}
      onResizeStop={props.onResizeStop}
      disableDragging={!props.isSelected}
      resizeHandleComponent={props.resizeHandles}
      resizeHandleStyle={props.resizeHandleStyle}
    >
      <div
        data-is-canvaslayer='true'
        data-is-selected={props.isSelected}
        style={styles.element}
      />
    </Rnd>
  )
}

export default ImageCanvasLayer
