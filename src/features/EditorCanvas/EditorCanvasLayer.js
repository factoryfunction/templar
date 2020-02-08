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
  const canvas = useCanvas()
  const rndClassName = ResizeHandle.getRndClassName(props)

  const resizeHandleStyles = props.isSelected
    ? ResizeHandle.selectedHandleStyles
    : ResizeHandle.notSelectedHandleStyles

  const resizeHandles = props.isSelected
    ? ResizeHandle.selectedComponents
    : ResizeHandle.notSelectedComponents

  console.log(props.styleZIndex)

  return (
    <Choose>
      <When condition={props.type === 'text'}>
        <TextCanvasLayer
          onSingleClick={props.onCanvasLayerSingleClick}
          dragGrid={props.dragGrid}
          onDoubleClick={props.onCanvasLayerDoubleClick}
          onResizeStop={props.onCanvasLayerResizeStop}
          onDrop={props.onCanvasLayerDrop}
          scale={canvas.scale}
          isSelected={props.isSelected}
          layer={props}
          resizeHandles={resizeHandles}
          resizeHandleStyles={resizeHandleStyles}
          rndClassName={rndClassName}
          onChange={(value, height) => {
            props.setTextValue(value)
            props.setHeight(height)
          }}
        />
      </When>
      <When condition={props.type === 'image'}>
        <ImageCanvasLayer
          scale={canvas.scale}
          resizeHandles={resizeHandles}
          resizeHandleStyles={resizeHandleStyles}
          rndClassName={rndClassName}
          isSelected={props.isSelected}
          onDrop={props.onCanvasLayerDrop}
          onSingleClick={props.onCanvasLayerSingleClick}
          dragGrid={props.dragGrid}
          onDoubleClick={props.onCanvasLayerDoubleClick}
          onResizeStop={props.onCanvasLayerResizeStop}
          layer={props}
        />
      </When>
      <When condition={props.type === 'box'}>
        <BoxCanvasLayer
          scale={canvas.scale}
          resizeHandles={resizeHandles}
          resizeHandleStyles={resizeHandleStyles}
          rndClassName={rndClassName}
          isSelected={props.isSelected}
          onDrop={props.onCanvasLayerDrop}
          onSingleClick={props.onCanvasLayerSingleClick}
          dragGrid={props.dragGrid}
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
      'styleTextAlign',
      'isSelected',
    ])
  }),
)
