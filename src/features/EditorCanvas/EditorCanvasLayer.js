// import ContentEditable from 'react-contenteditable'
// import ContentEditable from 'react-sane-contenteditable'
import EdiText from 'react-editext'
import { Rnd } from 'react-rnd'
import useDoubleClick from 'use-double-click'

import { ResizeHandle } from '#components/ResizeHandle'
import './styles/EditorCanvasLayer.css'
import { EditableText } from '#components/EditableText'

export const EditorCanvasLayer = (props) => {
  const isSelected = props.store.state.selectedLayers.includes(props.layer.id)
  const rndClassName = ResizeHandle.getRndClassName(isSelected)
  const resizeHandleStyle = ResizeHandle.getStyle(isSelected)
  const clickerRef = React.useRef()

  const resizeHandles = isSelected
    ? ResizeHandle.selectedComponents
    : ResizeHandle.notSelectedComponents

  const onDrop = (_, position) => {
    props.setLayerPositionLeft([props.layer.id, position.x])
    props.setLayerPositionTop([props.layer.id, position.y])
  }

  const onResizeStop = (_, __, ___, d) => {
    props.setLayerWidth([props.layer.id, props.layer.style.width + d.width])
    props.setLayerHeight([props.layer.id, props.layer.style.height + d.height])
  }

  const onSingleClick = () => {
    props.store.actions.selectLayer(props.layer.id)
  }

  const onDoubleClick = () => {
    props.store.actions.selectLayer(props.layer.id)

    if (props.layer.type === 'text') {
      props.store.actions.setIsEditingText([props.layer.id, true])
    }
  }

  return (
    <Choose>
      <When condition={props.layer.type === 'text'}>
        <TextCanvasLayer
          onSingleClick={onSingleClick}
          onDoubleClick={onDoubleClick}
          onResizeStop={onResizeStop}
          clickerRef={clickerRef}
          onDrop={onDrop}
          scale={props.scale}
          store={props.store}
          isSelected={isSelected}
          layer={props.layer}
          resizeHandles={resizeHandles}
          resizeHandleStyle={resizeHandleStyle}
          rndClassName={rndClassName}
        />
      </When>
      <When condition={props.layer.type === 'image'}>
        <ImageCanvasLayer
          onSingleClick={onSingleClick}
          onDoubleClick={onDoubleClick}
          onResizeStop={onResizeStop}
          clickerRef={clickerRef}
          onDrop={onDrop}
          scale={props.scale}
          store={props.store}
          isSelected={isSelected}
          layer={props.layer}
          resizeHandles={resizeHandles}
          resizeHandleStyle={resizeHandleStyle}
          rndClassName={rndClassName}
        />
      </When>
      <When condition={props.layer.type === 'box'}>
        <BlockCanvasLayer
          onSingleClick={onSingleClick}
          onDoubleClick={onDoubleClick}
          onResizeStop={onResizeStop}
          clickerRef={clickerRef}
          onDrop={onDrop}
          scale={props.scale}
          store={props.store}
          isSelected={isSelected}
          layer={props.layer}
          resizeHandles={resizeHandles}
          resizeHandleStyle={resizeHandleStyle}
          rndClassName={rndClassName}
        />
      </When>
    </Choose>
  )
}

// const getStyleVariables = (style) => {
//   return Object.entries(style).reduce((final, [key, value]) => {
//     const firstCharacter = key[0].toUpperCase
//     const restOfKey = key.substr(1)
//     const newKey = `--layer${firstCharacter}${restOfKey}`
//     final[newKey] = value
//     return final
//   }, {})
// }

const TextCanvasLayer = (props) => {
  // The layer has to be selected and the text not currently being edited
  // in order for the user to pan.
  const isPanningEnabled = props.isSelected && !props.layer.isEditingText
  const rndClassNames = props.isSelected ? 'SelectedCanvasLayer' : ''

  const style = {
    ...props.layer.style,
    width: '100%',
    height: '100%',
    top: props.layer.style.top,
    left: props.layer.style.left,
    fontFamily: `"${props.layer.style.fontFamily}"`,
    fontWeight: `${props.layer.style.fontWeight}`,
    letterSpacing: `${props.layer.style.letterSpacing}px`,
    fontSize: `${props.layer.style.fontSize}px`,
    lineHeight: `${props.layer.style.lineHeight}%`,
    overflow: 'hidden',
    display: 'flex',
  }

  const containerHeight =
    props.layer.style.height === 'fit-content' ? 'fit-content' : props.layer.style.height

  const onTextChange = (value) => {
    props.store.actions.setLayerText([props.layer.id, value])
  }

  const onMouseUp = (event) => {
    // console.log('up', event.target)
  }

  return (
    <Rnd
      // onDoubleClick={props.onDoubleClick}
      // onMouseDown={(event) => {console.log('mousedown', event.nativeEvent)}}
      onMouseUp={onMouseUp}
      onClick={props.onSingleClick}
      resizeHandleComponent={props.resizeHandles}
      resizeHandleStyle={props.resizeHandleStyle}
      disableDragging={!isPanningEnabled}
      scale={props.scale}
      onDragStop={props.onDrop}
      onResizeStop={props.onResizeStop}
      className={rndClassNames}
      default={{
        x: props.layer.style.left,
        y: props.layer.style.top,
        width: props.layer.style.width,
        height: containerHeight,
      }}
    >
      <EditableText
        data-is-canvaslayer='true'
        value={props.layer.text}
        style={style}
        isEnabled={props.layer.isEditingText}
        onChange={onTextChange}
        onDoubleClick={props.onDoubleClick}
      />
    </Rnd>
  )
}

const BlockCanvasLayer = (props) => {
  const style = {
    ...props.layer.style,
    top: props.layer.style.top,
    left: props.layer.style.left,
    width: '100%',
    height: '100%',
  }

  return (
    <Rnd
      className={props.rndClassName}
      resizeHandleComponent={props.resizeHandles}
      resizeHandleStyle={props.resizeHandleStyle}
      disableDragging={!props.isSelected}
      scale={props.scale}
      onDragStop={props.onDrop}
      onResizeStop={props.onResizeStop}
      default={{
        x: props.layer.style.left,
        y: props.layer.style.top,
        width: props.layer.style.width,
        height: props.layer.style.height,
      }}
    >
      <div
        ref={props.clickerRef}
        onClick={props.onSingleClick}
        data-is-canvaslayer='true'
        data-is-selected={props.isSelected}
        style={style}
      />
    </Rnd>
  )
}

const ImageCanvasLayer = (props) => {
  const { width, height, ...layerStyle } = props.layer.style

  const style = {
    ...layerStyle,
    width: '100%',
    height: '100%',
    padding: '16px !important',
    top: props.layer.style.top,
    left: props.layer.style.left,
    backgroundImage: `url("${props.layer.url}")`,
    backgroundSize: '100%',
  }

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
      default={{
        x: props.layer.style.left,
        y: props.layer.style.top,
        width: props.layer.style.width,
        height: props.layer.style.height,
      }}
    >
      <div
        ref={props.clickerRef}
        onClick={props.onSingleClick}
        data-is-canvaslayer='true'
        data-is-selected={String(props.isSelected)}
        style={style}
      />
    </Rnd>
  )
}
