import * as React from 'react'
import Spacer from '#components/Spacer'
import * as Styled from './LayersTab.styled'
import { EditorStore } from '#stores/editorStore'

import * as LayerEditors from './LayerEditors'
import './styles/FontEditor.css'
import { useLayerActions } from '#stores/editorStore/useLayerActions'

export const ImageEditor = (props) => {
  const actions = useLayerActions(props.layer.id)
  const layerStyles = props.layer.style

  return (
    <Styled.LayerEditorContainer>
      <LayerEditors.LayerName value={props.layer.name} onChange={actions.setName} />
      <Spacer size='18px' />
      <LayerEditors.Opacity value={layerStyles.opacity} onChange={actions.setOpacity} />
      <Spacer size='18px' />
      <LayerEditors.BottomActions onDeleteClick={actions.removeLayer} />
    </Styled.LayerEditorContainer>
  )
}
