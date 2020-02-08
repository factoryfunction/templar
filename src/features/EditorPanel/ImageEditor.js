import * as React from 'react'
import Spacer from '#components/Spacer'
import * as Styled from './LayersTab.styled'
import { EditorStore } from '#stores/editorStore'
import { withLayerSubscription } from '#stores/editorStore/useLayer'
import * as LayerEditors from './LayerEditors'
import './styles/FontEditor.css'
import { useLayerActions } from '#stores/editorStore/useLayer'

export const ImageEditor = withLayerSubscription((props) => {
  const currentOpacity = props.styleOpacity
  const currentWidth = props.styleWidth
  const currentHeight = props.styleHeight
  const currentPositionLeft = props.styleLeft
  const currentPositionTop = props.styleTop

  return (
    <Styled.LayerEditorContainer>
      <LayerEditors.LayerName value={props.name} onChange={props.setName} />
      <Spacer size='18px' />

      <div style={{ display: 'flex', width: '100%' }}>
        <LayerEditors.Width value={currentWidth} onChange={props.setWidth} />
        {/* <Spacer size='18px' />

        <LayerEditors.Height value={currentHeight} onChange={props.setHeight} /> */}

        <Spacer size='18px' />
        <LayerEditors.OpacityInput value={currentOpacity} onChange={props.setOpacity} />
      </div>
      <Spacer size='18px' />
      <div style={{ display: 'flex', width: '100%' }}>
        <LayerEditors.PositionLeft value={currentPositionLeft} onChange={props.setPositionLeft} />
        <Spacer size='18px' />
        <LayerEditors.PositionTop value={currentPositionTop} onChange={props.setPositionTop} />
      </div>
      <Spacer size='18px' />
      <LayerEditors.Opacity value={props.styleOpacity} onChange={props.setOpacity} />
      <Spacer size='18px' />
      <LayerEditors.BottomActions onDeleteClick={() => props.removeLayer(props.id)} />
    </Styled.LayerEditorContainer>
  )
})
