import * as React from 'react'
import Spacer from '#components/Spacer'
import * as Styled from './LayersTab.styled'
import { EditorStore } from '#stores/editorStore'
import { fontsManager } from '#utilities/fontsManager'
import { useLayerActions } from '#stores/editorStore/useLayerActions'
import * as LayerEditors from './LayerEditors'
import './styles/FontEditor.css'

// TODO: Add font assets to FontManager for selection in FontEditor.
export const FontEditor = (props) => {
  const actions = useLayerActions(props.layer.id)

  const layerStyles = props.layer.style
  const fontFamilyOptions = fontsManager.fontNames
  const fontWeightOptions = fontsManager.getFontWeights(layerStyles.fontFamily)

  const fontStyleOptions = fontsManager.getFontWeightStyles(
    layerStyles.fontFamily,
    layerStyles.fontWeight,
  )

  return (
    <Styled.LayerEditorContainer>
      <LayerEditors.LayerName value={props.layer.name} onChange={actions.setName} />
      <Spacer size='18px' />
      <LayerEditors.FontFamily
        options={fontFamilyOptions}
        current={layerStyles.fontFamily}
        onChange={actions.setFontFamily}
      />
      <Spacer size='18px' />
      <div style={{ display: 'flex', justifyContent: 'stretch' }}>
        <LayerEditors.FontWeight
          options={fontWeightOptions}
          current={layerStyles.fontWeight}
          onChange={actions.setFontWeight}
        />
        <Spacer size='18px' />
        <LayerEditors.LineHeight
          value={layerStyles.lineHeight}
          onChange={actions.setFontLineHeight}
        />
        <Spacer size='18px' />
        <LayerEditors.FontSize value={layerStyles.fontSize} onChange={actions.setFontSize} />
      </div>
      <Spacer size='18px' />
      <LayerEditors.FontStyle
        options={fontStyleOptions}
        current={layerStyles.fontStyle}
        onChange={actions.setFontStyle}
      />
      <Spacer size='18px' />
      <LayerEditors.FontColor current={layerStyles.color} onChange={actions.setFontColor} />
      <Spacer size='18px' />
      <LayerEditors.Opacity value={layerStyles.opacity} onChange={actions.setOpacity} />
      <Spacer size='18px' />
      <LayerEditors.BottomActions onDeleteClick={actions.removeLayer} />
    </Styled.LayerEditorContainer>
  )
}
