import * as React from 'react'

import { withLayerSubscription } from '#stores/editorStore/useLayer'
import Spacer from '#components/Spacer'
import * as Styled from './LayersTab.styled'
import * as LayerEditors from './LayerEditors'

export const BoxEditor = withLayerSubscription((props) => {
  const currentBackgroundColor = props.styleBackgroundColor
  const currentOpacity = props.styleOpacity

  return (
    <Styled.LayerEditorContainer>
      <LayerEditors.LayerName value={props.name} onChange={props.setName} />
      <Spacer size='18px' />
      <LayerEditors.BackgroundColor
        current={currentBackgroundColor}
        onChange={props.setBackgroundColor}
      />
      <Spacer size='18px' />
      <LayerEditors.Opacity value={currentOpacity} onChange={props.setOpacity} />
      <Spacer size='18px' />
      <LayerEditors.BottomActions onDeleteClick={() => props.removeLayer(props.id)} />
    </Styled.LayerEditorContainer>
  )
})
