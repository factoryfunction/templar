import * as React from 'react'

import { useLayerActions } from '#stores/editorStore/useLayerActions'
import Spacer from '#components/Spacer'
import * as Styled from './LayersTab.styled'
import * as LayerEditors from './LayerEditors'

export const BoxEditor = (props) => {
  const actions = useLayerActions(props.layer.id)
  const layerStyles = props.layer.style

  return (
    <Styled.LayerEditorContainer>
      <LayerEditors.BackgroundColor
        current={layerStyles.background}
        onChange={actions.setBackgroundColor}
      />
      <Spacer size='18px' />
      <LayerEditors.Opacity value={layerStyles.opacity} onChange={actions.setOpacity} />
      <Spacer size='18px' />
      <LayerEditors.BottomActions onDeleteClick={actions.screenshot} />
    </Styled.LayerEditorContainer>
  )
}
