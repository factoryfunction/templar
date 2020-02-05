import * as React from 'react'
import * as Styled from './LayersTab.styled'
import { rgbaToHex } from 'hex-and-rgba'

import Select from '#components/Select'
import Spacer from '#components/Spacer'
import { ColorPicker } from '#components/ColorPicker'
import { EditorStore } from '#stores/editorStore'

const useLayerActions = (layer) => {
  const actions = EditorStore.useStoreActions((actions) => ({
    setLayerBackgroundColor: (value) => actions.setLayerBackgroundColor([layer.id, value]),
    setName: (value) => actions.setLayerName([layer.id, value]),
    removeLayer: () => actions.removeLayer(layer.id),
  }))

  return actions
}

export const BoxEditor = (props) => {
  const actions = useLayerActions(props.layer)
  const layerStyles = props.layer.style

  return (
    <Styled.LayerEditorContainer>
      <BackgroundColor
        current={layerStyles.background}
        onChange={actions.setLayerBackgroundColor}
      />
      <Spacer size='18px' />
      <Styled.LayerEditorIconsContainer>
        <Styled.LayerDeleteIcon
          hoverColor='var(--danger)'
          data-is-component-action
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

const BackgroundColor = (props) => {
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
