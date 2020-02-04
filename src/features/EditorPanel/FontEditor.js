import { rgbaToHex } from 'hex-and-rgba'
import * as React from 'react'
import { ColorPicker } from '#components/ColorPicker'
import Select from '#components/Select'
import Spacer from '#components/Spacer'
import { TextField } from '#components/TextField'
import * as Styled from './LayersTab.styled'
import { EditorStore } from '#stores/editorStore'
import { fontsManager } from '#utilities/fontsManager'

import ReactSlider from 'react-slider'

import './styles/FontEditor.css'

const useLayerActions = (layer) => {
  const actions = EditorStore.useStoreActions((actions) => ({
    setFontLetterSpacing: (value) => actions.setLayerLetterSpacing([layer.id, value]),
    setFontLineHeight: (value) => actions.setLayerLineHeight([layer.id, value]),
    setFontWeight: (value) => actions.setLayerFontWeight([layer.id, value]),
    setFontStyle: (value) => actions.setLayerFontStyle([layer.id, value]),
    setFontSize: (value) => actions.setLayerFontSize([layer.id, value]),
    setFontColor: (value) => actions.setLayerFontColor([layer.id, value]),
    setFontFamily: (value) => actions.setLayerFontFamily([layer.id, value]),
    setName: (value) => actions.setLayerName([layer.id, value]),
    setText: (value) => actions.setLayerText([layer.id, value]),
    setBackgroundColor: (value) => actions.setLayerBackgroundColor([layer.id, value]),
    setOpacity: (value) => actions.setLayerOpacity([layer.id, value / 100]),
    removeLayer: () => actions.removeLayer(layer.id),
  }))

  return actions
}

// TODO: Add font assets to FontManager for selection in FontEditor.
export const FontEditor = (props) => {
  const actions = useLayerActions(props.layer)

  const layerStyles = props.layer.style
  const fontFamilyOptions = fontsManager.fontNames
  const fontWeightOptions = fontsManager.getFontWeights(layerStyles.fontFamily)

  const fontStyleOptions = fontsManager.getFontWeightStyles(
    layerStyles.fontFamily,
    layerStyles.fontWeight,
  )

  const variablesStyle = {
    '--sliderLabel': '"Opacity"',
  }

  return (
    <Styled.LayerEditorContainer style={variablesStyle}>
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
      <Opacity value={layerStyles.opacity} onChange={actions.setOpacity} />
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

const Opacity = (props) => {
  return (
    <ReactSlider
      styleName='Slider'
      thumbClassName='SliderThumb'
      trackClassName='SliderTrack'
      defaultValue={props.value}
      onAfterChange={props.onChange}
      renderThumb={(props, state) => <div {...props} />}
    />
  )
}