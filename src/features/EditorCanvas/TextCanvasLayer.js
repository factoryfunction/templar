import { Rnd } from 'react-rnd'
import { EditableText } from '#components/EditableText'

const prepareTextCanvasLayerStyles = (props) => {
  const element = {
    width: '100%',
    height: '100%',
    fontFamily: props.layer.styleFontFamily,
    color: props.layer.styleColor,
    fontWeight: props.layer.styleFontWeight,
    letterSpacing: props.layer.styleLetterSpacing + 'px',
    fontSize: props.layer.styleFontSize + 'px',
    fontStyle: props.layer.styleFontStyle,
    lineHeight: `${props.layer.styleLineHeight}%`,
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

  return (
    <Rnd
      data-layer-id={props.layer.id}
      size={styles.containerSize}
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
        value={props.layer.textValue}
        style={styles.element}
        isEnabled={props.layer.isEditingText}
        onChange={props.onChange}
        onDoubleClick={props.onDoubleClick}
      />
    </Rnd>
  )
}

export default TextCanvasLayer
