import { Rnd } from 'react-rnd'

import { ResizeHandle } from '#components/ResizeHandle'
import { EditableText } from '#components/EditableText'

import { withLayerSubscription } from '#stores/editorStore/useLayer'
import './styles/EditorCanvasLayer.css'

import dynamic from 'next/dynamic'
import { withPureComponent } from '#utilities/withPureComponent'
import { createPropsDiffer } from '#utilities/createPropsDiffer'

import { TextCanvasLayer } from './TextCanvasLayer'
import { BoxCanvasLayer } from './BoxCanvasLayer'
import { ImageCanvasLayer } from './ImageCanvasLayer'
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
          scale={props.scale}
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
          scale={props.scale}
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
