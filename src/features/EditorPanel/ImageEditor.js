import * as React from 'react'
import Spacer from '#components/Spacer'
import * as Styled from './LayersTab.styled'
import { EditorStore } from '#stores/editorStore'
import { withLayerSubscription } from '#stores/editorStore/useLayer'
import * as LayerEditors from './LayerEditors'
import './styles/FontEditor.css'
import { useLayerActions } from '#stores/editorStore/useLayer'

export const ImageEditor = withLayerSubscription((props) => {
  return (
    <Styled.LayerEditorContainer>
      <LayerEditors.LayerName value={props.name} onChange={props.setName} />
      <Spacer size='18px' />
      <LayerEditors.Opacity value={props.styleOpacity} onChange={props.setOpacity} />
      <Spacer size='18px' />
      <LayerEditors.BottomActions onDeleteClick={() => props.removeLayer(props.id)} />
    </Styled.LayerEditorContainer>
  )
})
