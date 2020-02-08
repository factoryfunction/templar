import { Rnd } from 'react-rnd'

import { ResizeHandle } from '#components/ResizeHandle'
import { EditableText } from '#components/EditableText'

import { withLayerSubscription } from '#stores/editorStore/useLayer'
import './styles/EditorCanvasLayer.css'

import dynamic from 'next/dynamic'
import { withPureComponent } from '#utilities/withPureComponent'

// const DynamicComponent = dynamic(() => import('../components/hello'))

export const EditorCanvasLayer = (props) => {
  // console.log('rendering EditorCanvasLayer', props)
  const rndClassName = ResizeHandle.getRndClassName(props.isSelected)
  const resizeHandleStyle = ResizeHandle.getStyle(props.isSelected)
  const clickerRef = React.useRef()

  const resizeHandles = props.isSelected
    ? ResizeHandle.selectedComponents
    : ResizeHandle.notSelectedComponents

  return (
    <Choose>
      <When condition={props.type === 'text'}>
        <TextCanvasLayer
          onSingleClick={props.onCanvasLayerSingleClick}
          onDoubleClick={props.onCanvasLayerDoubleClick}
          onResizeStop={props.onCanvasLayerResizeStop}
          clickerRef={clickerRef}
          onDrop={props.onCanvasLayerDrop}
          scale={props.scale}
          isSelected={props.isSelected}
          layer={{ ...props }}
          resizeHandles={resizeHandles}
          resizeHandleStyle={resizeHandleStyle}
          rndClassName={rndClassName}
          onChange={props.setTextValue}
        />
      </When>
      <When condition={props.type === 'image'}>
        <ImageCanvasLayer
          clickerRef={clickerRef}
          scale={props.scale}
          resizeHandles={resizeHandles}
          resizeHandleStyle={resizeHandleStyle}
          rndClassName={rndClassName}
          isSelected={props.isSelected}
          onDrop={props.onCanvasLayerDrop}
          onSingleClick={props.onCanvasLayerSingleClick}
          onDoubleClick={props.onCanvasLayerDoubleClick}
          onResizeStop={props.onCanvasLayerResizeStop}
          layer={{ ...props }}
        />
      </When>
      <When condition={props.type === 'box'}>
        <BlockCanvasLayer
          clickerRef={clickerRef}
          scale={props.scale}
          resizeHandles={resizeHandles}
          resizeHandleStyle={resizeHandleStyle}
          rndClassName={rndClassName}
          isSelected={props.isSelected}
          onDrop={props.onCanvasLayerDrop}
          onSingleClick={props.onCanvasLayerSingleClick}
          onDoubleClick={props.onCanvasLayerDoubleClick}
          onResizeStop={props.onCanvasLayerResizeStop}
          layer={{ ...props }}
        />
      </When>
    </Choose>
  )
}

const prepareTextCanvasLayerStyles = (props) => {
  const element = {
    // Rnd (container) receives the custom width/height. The
    // p element always uses 100% to fill that space.
    width: '100%',
    height: '100%',
    position: props.layer.stylePosition,
    overflow: props.layer.styleOverflow,
    display: props.layer.styleDisplay,
    fontFamily: props.layer.styleFontFamily,
    color: props.layer.styleFontColor,
    fontWeight: props.layer.styleFontWeight,
    letterSpacing: props.layer.styleLetterSpacing + 'px',
    fontSize: props.layer.styleFontSize + 'px',
    lineHeight: `${props.layer.styleLineHeight}%`,
    backgroundColor: props.layer.styleBackgroundColor,
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

const TextCanvasLayer = (props) => {
  // The layer has to be selected and the text not
  // currently being edited in order for the user to pan.
  const isPanningEnabled = props.isSelected && !props.layer.isEditingText
  const styles = prepareTextCanvasLayerStyles(props)

  const onMouseUp = (event) => {
    // console.log('up', event.target)
  }

  return (
    <Rnd
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
        onChange={props.layer.setTextValue}
        onDoubleClick={props.onDoubleClick}
      />
    </Rnd>
  )
}

const prepareBoxCanvasLayerStyles = (props) => {
  const element = {
    // Rnd (container) receives the custom width/height. The
    // p element always uses 100% to fill that space.
    width: '100%',
    height: '100%',
    backgroundColor: props.layer.styleBackgroundColor,
    opacity: props.layer.styleOpacity,
    top: props.layer.styleTop,
    left: props.layer.styleLeft,
    position: props.layer.stylePosition,
    overflow: props.layer.styleOverflow,
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

const BlockCanvasLayer = (props) => {
  const styles = prepareBoxCanvasLayerStyles(props)

  return (
    <Rnd
      className={props.rndClassName}
      resizeHandleComponent={props.resizeHandles}
      resizeHandleStyle={props.resizeHandleStyle}
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

const ImageCanvasLayer = (props) => {
  const { width, height, ...layerStyle } = props.layer.style
  const styles = prepareImageCanvasLayerStyles(props)

  // const style = {
  //   ...layerStyle,
  //   width: '100%',
  //   height: '100%',
  //   padding: '16px !important',
  //   backgroundImage: `url("${props.layer.url}")`,
  //   backgroundSize: '100%',
  // }

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

export default withLayerSubscription(
  withPureComponent(EditorCanvasLayer, (oldProps, newProps) => {
    const differ = createDiffer(oldProps, newProps)

    return differ([
      'scale',
      'layerType',
      'layerId',
      'id',
      'isEditingText',
      'isVisible',
      'type',
      'name',
      'text',
      'styleTop',
      'styleLeft',
      'styleWidth',
      'styleHeight',
      'styleFontFamily',
      'styleFontStyle',
      'styleFontColor',
      'styleFontWeight',
      'styleFontSize',
      'styleFontLetterSpacing',
      'styleFontLineHeight',
      'styleBackgroundColor',
      'styleOpacity',
      'isSelected',
    ])
  }),
)

const createDiffer = (oldProps, newProps) => (propNames) => {
  let allSame = true

  for (const propName of propNames) {
    if (oldProps[propName] !== newProps[propName]) {
      allSame = false

      console.warn(`[differ] ${propName} changed:`, {
        propName,
        old: oldProps[propName],
        new: newProps[propName],
      })
    }
  }

  return !allSame
}
