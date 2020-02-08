import * as React from 'react'
import Spacer from '#components/Spacer'
import * as Styled from './LayersTab.styled'
import { EditorStore } from '#stores/editorStore'
import { fontsManager } from '#utilities/fontsManager'
import { useLayerActions } from '#stores/editorStore/useLayer'
import * as LayerEditors from './LayerEditors'
import { withLayerSubscription } from '#stores/editorStore/useLayer'
import './styles/FontEditor.css'

// TODO: Add font assets to FontManager for selection in FontEditor.
export const FontEditor = withLayerSubscription((props) => {
  const currentFontFamily = props.styleFontFamily
  const currentFontSize = props.styleFontSize
  const currentColor = props.styleColor
  const currentLineHeight = props.styleLineHeight
  const currentLetterSpacing = props.styleLetterSpacing
  const currentFontWeight = props.styleFontWeight
  const currentFontStyle = props.styleFontStyle
  const currentOpacity = props.styleOpacity
  const currentWidth = props.styleWidth
  const currentHeight = props.styleHeight

  const fontFamilyOptions = fontsManager.fontNames
  const fontWeightOptions = fontsManager.getFontWeights(currentFontFamily)
  const fontStyleOptions = fontsManager.getFontWeightStyles(currentFontFamily, currentFontWeight)

  return (
    <Styled.LayerEditorContainer>
      <LayerEditors.LayerName value={props.name} onChange={props.setName} />
      <Spacer size='18px' />
      <LayerEditors.TextFontFamily
        options={fontFamilyOptions}
        current={currentFontFamily}
        onChange={props.setFontFamily}
      />
      <Spacer size='18px' />
      <div style={{ display: 'flex', width: '100%' }}>
        <LayerEditors.TextFontSize value={currentFontSize} onChange={props.setFontSize} />
        <Spacer size='18px' />

        <LayerEditors.TextFontWeight
          options={fontWeightOptions}
          current={currentFontWeight}
          onChange={props.setFontWeight}
        />

        <Spacer size='18px' />
        <LayerEditors.TextFontStyle
          options={fontStyleOptions}
          current={currentFontStyle}
          onChange={props.setFontStyle}
        />
      </div>

      <Spacer size='18px' />
      <div style={{ display: 'flex', width: '100%' }}>
        <LayerEditors.TextLineHeight value={currentLineHeight} onChange={props.setLineHeight} />
        <Spacer size='18px' />
        <LayerEditors.TextLetterSpacing
          value={currentLetterSpacing}
          onChange={props.setLetterSpacing}
        />
      </div>

      <Spacer size='18px' />

      <div style={{ display: 'flex', width: '100%' }}>
        <LayerEditors.Width value={currentWidth} onChange={props.setWidth} />
        <Spacer size='18px' />

        <LayerEditors.Height value={currentHeight} onChange={props.setHeight} />

        <Spacer size='18px' />
        <LayerEditors.OpacityInput value={currentOpacity} onChange={props.setOpacity} />
      </div>

      <Spacer size='18px' />
      <LayerEditors.TextFontColor current={currentColor} onChange={props.setColor} />
      {/* <Spacer size='18px' />
      <LayerEditors.Opacity value={currentOpacity} onChange={props.setOpacity} /> */}
      <Spacer size='18px' />
      <LayerEditors.BottomActions onDeleteClick={() => props.removeLayer(props.id)} />
    </Styled.LayerEditorContainer>
  )
})
