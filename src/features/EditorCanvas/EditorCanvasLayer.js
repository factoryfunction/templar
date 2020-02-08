import { Rnd } from 'react-rnd'

import { ResizeHandle } from '#components/ResizeHandle'

import { withLayerSubscription } from '#stores/editorStore/useLayer'
import './styles/EditorCanvasLayer.css'

import { withPureComponent } from '#utilities/withPureComponent'
import { createPropsDiffer } from '#utilities/createPropsDiffer'

import dynamic from 'next/dynamic'
import { useCanvas } from '#stores/editorStore/useCanvas'

const TextCanvasLayer = dynamic(() => import('./TextCanvasLayer'))
const BoxCanvasLayer = dynamic(() => import('./BoxCanvasLayer'))
const ImageCanvasLayer = dynamic(() => import('./ImageCanvasLayer'))

export const EditorCanvasLayer = (props) => {
  // console.log('rendering EditorCanvasLayer', props)
  const canvas = useCanvas()
  const rndClassName = ResizeHandle.getRndClassName(props)
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
          scale={canvas.scale}
          isSelected={props.isSelected}
          layer={props}
          resizeHandles={resizeHandles}
          resizeHandleStyle={resizeHandleStyle}
          rndClassName={rndClassName}
          onChange={(value, height) => {
            props.setTextValue(value)
            props.setHeight(height)
          }}
        />
      </When>
      <When condition={props.type === 'image'}>
        <ImageCanvasLayer
          clickerRef={clickerRef}
          scale={canvas.scale}
          resizeHandles={resizeHandles}
          resizeHandleStyle={resizeHandleStyle}
          rndClassName={rndClassName}
          isSelected={props.isSelected}
          onDrop={props.onCanvasLayerDrop}
          onSingleClick={props.onCanvasLayerSingleClick}
          onDoubleClick={props.onCanvasLayerDoubleClick}
          onResizeStop={props.onCanvasLayerResizeStop}
          layer={props}
        />
      </When>
      <When condition={props.type === 'box'}>
        <BoxCanvasLayer
          clickerRef={clickerRef}
          scale={canvas.scale}
          resizeHandles={resizeHandles}
          resizeHandleStyle={resizeHandleStyle}
          rndClassName={rndClassName}
          isSelected={props.isSelected}
          onDrop={props.onCanvasLayerDrop}
          onSingleClick={props.onCanvasLayerSingleClick}
          onDoubleClick={props.onCanvasLayerDoubleClick}
          onResizeStop={props.onCanvasLayerResizeStop}
          layer={props}
        />
      </When>
    </Choose>
  )
}

export default withLayerSubscription(
  withPureComponent(EditorCanvasLayer, (oldProps, newProps) => {
    const differ = createPropsDiffer(oldProps, newProps)

    return differ([
      'scale',
      'layerType',
      'layerId',
      'id',
      'isEditingText',
      'isVisible',
      'type',
      'name',
      'textValue',
      'styleTop',
      'styleLeft',
      'styleWidth',
      'styleHeight',
      'styleFontFamily',
      'styleFontStyle',
      'styleColor',
      'styleFontWeight',
      'styleFontSize',
      'styleLetterSpacing',
      'styleLineHeight',
      'styleBackgroundColor',
      'styleOpacity',
      'isSelected',
    ])
  }),
)
