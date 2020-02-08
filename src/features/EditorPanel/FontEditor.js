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
  const currentFontColor = props.styleFontColor
  const currentFontLineHeight = props.styleFontLineHeight
  const currentFontLetterSpacing = props.styleFontLetterSpacing
  const currentFontWeight = props.styleFontWeight
  const currentFontStyle = props.styleFontStyle
  const currentOpacity = props.styleOpacity

  const fontFamilyOptions = fontsManager.fontNames
  const fontWeightOptions = fontsManager.getFontWeights(currentFontFamily)
  const fontStyleOptions = fontsManager.getFontWeightStyles(currentFontFamily, currentFontWeight)

  return (
    <Styled.LayerEditorContainer>
      <LayerEditors.LayerName value={props.name} onChange={props.setName} />
      <Spacer size='18px' />
      <LayerEditors.FontFamily
        options={fontFamilyOptions}
        current={currentFontFamily}
        onChange={props.setFontFamily}
      />
      <Spacer size='18px' />
      <div style={{ display: 'flex', justifyContent: 'stretch' }}>
        <LayerEditors.FontWeight
          options={fontWeightOptions}
          current={currentFontWeight}
          onChange={props.setFontWeight}
        />
        <Spacer size='18px' />
        <LayerEditors.LineHeight
          value={currentFontLineHeight}
          onChange={props.setFontLineHeight}
        />
        <Spacer size='18px' />
        <LayerEditors.FontSize value={currentFontSize} onChange={props.setFontSize} />
      </div>
      <Spacer size='18px' />
      <LayerEditors.FontStyle
        options={fontStyleOptions}
        current={currentFontStyle}
        onChange={props.setFontStyle}
      />
      <Spacer size='18px' />
      <LayerEditors.FontColor current={currentFontColor} onChange={props.setFontColor} />
      <Spacer size='18px' />
      <LayerEditors.Opacity value={currentOpacity} onChange={props.setOpacity} />
      <Spacer size='18px' />
      <LayerEditors.BottomActions onDeleteClick={() => props.removeLayer(props.id)} />
    </Styled.LayerEditorContainer>
  )
})
