import * as React from 'react'
import * as Styled from './LayersTab.styled'
import { SketchPicker } from 'react-color'
import { rgbaToHex } from 'hex-and-rgba'
import arrayMove from 'array-move'
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc'

import { LeftPanelView } from './LeftPanelView'

import Icon from '../Icon'
import { TextField } from '../TextField'
import Select from '../Select'
import Spacer from '../Spacer'
import { ColorPicker } from '../ColorPicker'
import { ColorSwatch } from '../ColorSwatch'
import * as Salem from '../Salem'

import { EditorStore } from './utilities/editorStore'
import { fontsManager } from './utilities/fontsManager'

import { LAYER_TYPE_ICON_NAME_MAP, LAYER_TYPE_ICON_SIZE_MAP } from '../../consts'
import { GOOGLE_FONTS_MAP, GOOGLE_FONTS_LIST, GOOGLE_FONT_NAMES } from '../../consts/googleFonts'

const useLayerActions = (layer) => {
  const actions = EditorStore.useStoreActions((actions) => ({
    setFontLetterSpacing: (value) => actions.setLayerStyle([layer.id, 'letterSpacing', value]),
    setFontLineHeight: (value) => actions.setLayerStyle([layer.id, 'lineHeight', value]),
    setFontWeight: (value) => actions.setLayerStyle([layer.id, 'fontWeight', value]),
    setFontStyle: (value) => actions.setLayerStyle([layer.id, 'fontStyle', value]),
    setFontSize: (value) => actions.setLayerStyle([layer.id, 'fontSize', value]),
    setFontColor: (value) => actions.setLayerStyle([layer.id, 'color', value]),
    setFontFamily: (value) => actions.setLayerFontFamily([layer.id, value]),
    setLayerName: (value) => actions.setLayerName([layer.id, value]),
    setLayerText: (value) => actions.setLayerText([layer.id, value]),
    removeLayer: () => actions.removeLayer(layer.id),
  }))

  return actions
}

export const FontEditor = (props) => {
  const actions = useLayerActions(props.layer)

  const layerStyles = props.layer.style
  const fontFamilyOptions = fontsManager.fontNames
  const fontWeightOptions = fontsManager.getFontWeights(layerStyles.fontFamily)

  const fontStyleOptions = fontsManager.getFontWeightStyles(
    layerStyles.fontFamily,
    layerStyles.fontWeight,
  )

  return (
    <Styled.LayerEditorContainer>
      <LayerName value={props.layer.name} onChange={actions.setLayerName} />
      <Spacer size='18px' />
      <FontFamily
        options={fontFamilyOptions}
        current={layerStyles.fontFamily}
        onChange={actions.setFontFamily}
      />
      <Spacer size='18px' />
      <div style={{ display: 'flex', justifyContent: 'stretch' }}>
        <FontWeight
          options={fontWeightOptions}
          current={layerStyles.fontWeight}
          onChange={actions.setFontWeight}
        />
        <Spacer size='18px' />
        <LineHeight value={layerStyles.lineHeight} onChange={actions.setFontLineHeight} />
        <Spacer size='18px' />
        <FontSize value={layerStyles.fontSize} onChange={actions.setFontSize} />
      </div>
      <Spacer size='18px' />
      <FontStyle
        options={fontStyleOptions}
        current={layerStyles.fontStyle}
        onChange={actions.setFontStyle}
      />
      <Spacer size='18px' />
      <FontColor current={layerStyles.color} onChange={actions.setFontColor} />
      <Spacer size='18px' />
      <Styled.LayerEditorIconsContainer>
        <Styled.LayerDeleteIcon
          data-is-component-action
          hoverColor='var(--danger)'
          name='trash-alt'
          size='18px'
          color='var(--night-gray)'
          onClick={actions.removeLayer}
          text='Delete'
        />
      </Styled.LayerEditorIconsContainer>
    </Styled.LayerEditorContainer>
  )
}

const FontFamily = (props) => {
  const onChange = ({ option }) => {
    props.onChange(option)
  }

  return (
    <Select
      label='Font'
      showClear={false}
      searchEnabled={false}
      searchInputAutoFocus={false}
      options={props.options}
      selected={props.current}
      onChange={onChange}
    />
  )
}

const LineHeight = (props) => {
  const onChange = (event) => {
    props.onChange(event.target.value)
  }

  return (
    <TextField
      width='120px'
      label='Line Height (%)'
      value={props.value}
      placeholder='140% by default'
      onChange={onChange}
    />
  )
}

const LayerName = (props) => {
  const onChange = (event) => {
    props.onChange(event.target.value)
  }

  return <TextField label='Layer Name' value={props.value} onChange={onChange} />
}

const FontSize = (props) => {
  const onChange = (event) => {
    props.onChange(event.target.value)
  }

  return (
    <TextField
      width='117px'
      label='Font Size'
      value={props.value}
      placeholder=''
      onChange={onChange}
    />
  )
}

const FontWeight = (props) => {
  const onChange = ({ option }) => {
    props.onChange(option)
  }

  return (
    <Select
      label='Font Weight'
      showClear={false}
      searchEnabled={false}
      searchInputAutoFocus={false}
      options={props.options}
      selected={props.current}
      onChange={onChange}
    />
  )
}

const FontStyle = (props) => {
  const onChange = ({ option }) => {
    props.onChange(option)
  }

  return (
    <Select
      label='Font Style'
      showClear={false}
      searchEnabled={false}
      searchInputAutoFocus={false}
      options={props.options}
      selected={props.current}
      onChange={onChange}
    />
  )
}

const FontColor = (props) => {
  const onChange = (color) => {
    const { r, g, b, a } = color.rgb
    const hexa = rgbaToHex(r, g, b, a)
    console.log({ color, hexa })
    props.onChange(hexa)
  }

  return (
    <>
      <Select
        label='Font Color'
        showClear={false}
        searchEnabled={false}
        searchInputAutoFocus={false}
        options={[]}
        onChange={() => {}}
        selected={props.current}
        optionComponent={Select.HiddenOption}
        beforeOptionsComponent={() => (
          <ColorPicker width={376} current={props.current} onChange={onChange} />
        )}
        selectedOptionComponent={({ option }) => {
          return (
            <div style={{ display: 'flex' }}>
              <Styled.DisplayColorSwatch color={option} />
              <Styled.DisplayColorValue>{option}</Styled.DisplayColorValue>
            </div>
          )
        }}
      />
    </>
  )
}
