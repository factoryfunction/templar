import { rgbaToHex } from 'hex-and-rgba'
import * as React from 'react'
import { ColorPicker } from '#components/ColorPicker'
import Select from '#components/Select'
import Spacer from '#components/Spacer'
import { TextField } from '#components/TextField'
import * as Styled from './LayersTab.styled'

import ReactSlider from 'react-slider'

import './styles/FontEditor.css'

export const TextFontFamily = (props) => {
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

export const TextLineHeight = (props) => {
  const onChange = (event) => {
    props.onChange(event.target.value)
  }

  return (
    <TextField
      width='100%'
      unitMask='%'
      type='number'
      label='Line Height'
      value={props.value}
      placeholder='140% by default'
      onChange={onChange}
    />
  )
}

export const TextLetterSpacing = (props) => {
  const onChange = (event) => {
    props.onChange(event.target.value)
  }

  return (
    <TextField
      width='100%'
      unitMask='px'
      type='number'
      step='0.1'
      label='Letter Spacing'
      value={props.value}
      placeholder='0px by default'
      onChange={onChange}
    />
  )
}

export const LayerName = (props) => {
  const onChange = (event) => {
    props.onChange(event.target.value)
  }

  return <TextField label='Layer Name' value={props.value} onChange={onChange} />
}

export const TextFontSize = (props) => {
  const onChange = (event) => {
    props.onChange(event.target.value)
  }

  return (
    <TextField
      width='100%'
      unitMask='px'
      type='number'
      label='Font Size'
      value={props.value}
      placeholder=''
      onChange={onChange}
    />
  )
}

export const TextFontWeight = (props) => {
  const onChange = ({ option }) => {
    props.onChange(option)
  }

  return (
    <Select
      width='100%'
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

export const TextFontStyle = (props) => {
  const onChange = ({ option }) => {
    props.onChange(option)
  }

  return (
    <Select
      width='100%'
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

export const TextFontColor = (props) => {
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

export const Opacity = (props) => {
  const onChange = (value) => {
    props.onChange(value / 100)
  }

  return (
    <ReactSlider
      styleName='Slider'
      thumbClassName='SliderThumb'
      trackClassName='SliderTrack'
      defaultValue={props.value * 100}
      onAfterChange={onChange}
      renderThumb={(props, state) => <div {...props} />}
    />
  )
}

export const OpacityInput = (props) => {
  const onChange = (event) => {
    props.onChange(event.target.value / 100)
  }

  return (
    <TextField
      width='100%'
      unitMask='%'
      type='number'
      label='Layer Opacity'
      value={props.value}
      placeholder=''
      onChange={onChange}
    />
  )
}

export const Width = (props) => {
  const onChange = (event) => {
    props.onChange(event.target.value)
  }

  return (
    <TextField
      width='100%'
      unitMask='px'
      type='number'
      label='Layer Width'
      value={props.value}
      placeholder=''
      onChange={onChange}
    />
  )
}

export const Height = (props) => {
  const onChange = (event) => {
    props.onChange(event.target.value)
  }

  return (
    <TextField
      width='100%'
      unitMask='px'
      type='number'
      label='Layer Height'
      value={props.value}
      placeholder=''
      onChange={onChange}
    />
  )
}

export const BottomActions = (props) => {
  return (
    <Styled.LayerEditorIconsContainer>
      <Styled.LayerDeleteIcon
        data-is-component-action
        hoverColor='var(--danger)'
        name='trash-alt'
        size='18px'
        color='var(--night-gray)'
        onClick={props.onDeleteClick}
        text='Delete'
      />
    </Styled.LayerEditorIconsContainer>
  )
}

export const BackgroundColor = (props) => {
  const onChange = (color) => {
    const { r, g, b, a } = color.rgb
    const hexa = rgbaToHex(r, g, b, a)
    props.onChange(hexa)
  }

  return (
    <>
      <Select
        label='Background Color'
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
