import { Rnd } from 'react-rnd'
import { EditableText } from '#components/EditableText'

const prepareTextCanvasLayerStyles = (props) => {
  const element = {
    // Rnd (container) receives the custom width/height. The
    // p element always uses 100% to fill that space.
    width: '100%',
    height: '100%',
    position: props.layer.stylePosition,
    overflow: props.layer.styleOverflow,
    textOverflow: props.layer.styleTextOverflow,
    display: props.layer.styleDisplay,
    fontFamily: props.layer.styleFontFamily,
    color: props.layer.styleFontColor,
    fontWeight: props.layer.styleFontWeight,
    letterSpacing: props.layer.styleFontLetterSpacing + 'px',
    fontSize: props.layer.styleFontSize + 'px',
    lineHeight: `${props.layer.styleFontLineHeight}%`,
    backgroundColor: props.layer.styleBackgroundColor,
    opacity: props.layer.styleOpacity,
    top: props.layer.styleTop,
    left: props.layer.styleLeft,
    maxHeight: '60vh',
    minHeight: props.layer.styleHeight,
  }

  const container = {
    width: props.layer.styleWidth,
    height: props.layer.styleHeight,
    y: props.layer.styleTop,
    x: props.layer.styleLeft,
  }

  const containerSize = {
    width: props.layer.styleWidth,
    height: props.layer.styleHeight,
  }

  return { element, container, containerSize }
}

export const TextCanvasLayer = (props) => {
  // The layer has to be selected and the text not
  // currently being edited in order for the user to pan.
  const isPanningEnabled = props.isSelected && !props.layer.isEditingText
  const styles = prepareTextCanvasLayerStyles(props)

  const onMouseUp = (event) => {
    // console.log('up', event.target)
  }

  return (
    <Rnd
      size={styles.containerSize}
      onMouseUp={onMouseUp}
      scale={props.scale}
      onDragStop={props.onDrop}
      default={styles.container}
      onClick={props.onSingleClick}
      className={props.rndClassName}
      onResizeStop={props.onResizeStop}
      disableDragging={!isPanningEnabled}
      resizeHandleComponent={props.resizeHandles}
      resizeHandleStyle={props.resizeHandleStyle}
    >
      <EditableText
        data-is-canvaslayer='true'
        value={props.layer.text}
        style={styles.element}
        isEnabled={props.layer.isEditingText}
        onChange={props.onChange}
        onDoubleClick={props.onDoubleClick}
      />
    </Rnd>
  )
}
