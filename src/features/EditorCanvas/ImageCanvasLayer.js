import { Rnd } from 'react-rnd'

const prepareImageCanvasLayerStyles = (props) => {
  const element = {
    // Rnd (container) receives the custom width/height. The
    // p element always uses 100% to fill that space.
    width: '100%',
    height: '100%',
    backgroundSize: '100%',
    backgroundImage: `url("${props.layer.styleBackgroundImage}")`,
    opacity: props.layer.styleOpacity,
    top: props.layer.styleTop,
    left: props.layer.styleLeft,
    position: props.layer.stylePosition,
    display: props.layer.styleDisplay,
    top: props.layer.styleTop,
    left: props.layer.styleLeft,
  }

  const container = {
    width: props.layer.styleWidth,
    height: props.layer.styleHeight,
    top: props.layer.styleTop,
    left: props.layer.styleLeft,
  }

  return { element, container }
}

export const ImageCanvasLayer = (props) => {
  const { width, height, ...layerStyle } = props.layer.style
  const styles = prepareImageCanvasLayerStyles(props)

  return (
    <Rnd
      className={props.rndClassName}
      resizeHandleComponent={props.resizeHandles}
      resizeHandleStyle={props.resizeHandleStyle}
      lockAspectRatio={true}
      disableDragging={!props.isSelected}
      scale={props.scale}
      onDragStop={props.onDrop}
      onResizeStop={props.onResizeStop}
      default={styles.container}
    >
      <div
        onClick={props.onSingleClick}
        data-is-canvaslayer='true'
        data-is-selected={props.isSelected}
        style={styles.element}
      />
    </Rnd>
  )
}
