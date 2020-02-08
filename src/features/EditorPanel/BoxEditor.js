import * as React from 'react'

import { withLayerSubscription } from '#stores/editorStore/useLayer'
import Spacer from '#components/Spacer'
import * as Styled from './LayersTab.styled'
import * as LayerEditors from './LayerEditors'

export const BoxEditor = withLayerSubscription((props) => {
  const currentBackgroundColor = props.styleBackgroundColor
  const currentOpacity = props.styleOpacity
  // const currentFontFamily = props.styleFontFamily
  // const currentFontSize = props.styleFontSize
  // const currentFontColor = props.styleFontColor
  // const currentFontLineHeight = props.styleFontLineHeight
  // const currentFontLetterSpacing = props.styleFontLetterSpacing
  // const currentFontWeight = props.styleFontWeight
  // const currentFontStyle = props.styleFontStyle
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
        <Spacer size='18px' />

        <LayerEditors.Height value={currentHeight} onChange={props.setHeight} />

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
      <LayerEditors.BackgroundColor
        current={currentBackgroundColor}
        onChange={props.setBackgroundColor}
      />
      <Spacer size='18px' />
      <LayerEditors.BottomActions onDeleteClick={() => props.removeLayer(props.id)} />
    </Styled.LayerEditorContainer>
  )
})
