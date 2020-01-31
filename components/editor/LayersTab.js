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

const useLayers = () => {
  const layers = EditorStore.useStoreState((store) => {
    return {
      list: [...store.layers].reverse(),
      isLayersEmpty: store.layers.length === 0,
      selectedLayers: store.selectedLayers,
    }
  })

  const actions = EditorStore.useStoreActions((store) => {
    return {
      removeLayer: store.removeLayer,
      addTextLayer: store.addTextLayer,
      addImageLayer: store.addImageLayer,
      addBoxLayer: store.addBoxLayer,
      selectLayer: store.selectLayer,
      reorderLayer: store.reorderLayer,
      setLayerStyle: store.setLayerStyle,
      setLayerFontFamily: store.setLayerFontFamily,
    }
  })

  return { layers, actions }
}

export const LayersTab = () => {
  const layersState = useLayers()

  const onSortEnd = ({ oldIndex, newIndex }) => {
    layersState.actions.reorderLayer({ oldIndex, newIndex })
  }

  return (
    <LeftPanelView title='Layers' header={() => <AddLayerActions layersState={layersState} />}>
      <Choose>
        <When condition={layersState.layers.isLayersEmpty}>
          <p style={{ marginTop: 24, color: 'var(--night-gray)' }}>
            Layers will appear here when you add some.
          </p>
        </When>
        <Otherwise>
          <LayerList
            lockAxis='y'
            pressDelay={350}
            lockToContainerEdges
            hideSortableGhost
            onSortEnd={onSortEnd}
            layersState={layersState}
          />
        </Otherwise>
      </Choose>
    </LeftPanelView>
  )
}

const LayerList = SortableContainer((props) => {
  return (
    <Styled.LayerList>
      <For each='layer' of={props.layersState.layers.list} index='index'>
        <LayerRow key={layer.id} layer={layer} layersState={props.layersState} index={index} />
      </For>
    </Styled.LayerList>
  )
})

const AddLayerActions = (props) => {
  return (
    <Styled.AddLayerActions>
      <Icon
        name='text'
        size='16px'
        color='#fff'
        onClick={props.layersState.actions.addTextLayer}
      />
      <Icon
        name='scenery'
        size='16px'
        color='#fff'
        onClick={props.layersState.actions.addImageLayer}
      />
      <Icon
        name='square-full'
        size='16px'
        color='#fff'
        onClick={props.layersState.actions.addBoxLayer}
      />
    </Styled.AddLayerActions>
  )
}

const LayerRow = SortableElement((props) => {
  const [isEditing, setIsEditing] = React.useState(false)
  const isSelected = props.layersState.layers.selectedLayers.includes(props.layer.id)
  const iconName = LAYER_TYPE_ICON_NAME_MAP[props.layer.type]
  const iconSize = LAYER_TYPE_ICON_SIZE_MAP[props.layer.type]

  const onRowClick = () => {
    props.layersState.actions.selectLayer(props.layer.id)
  }

  const onDeleteClick = () => {
    props.layersState.actions.removeLayer(props.layer.id)
  }

  const onEllipsisClick = () => {
    setIsEditing(!isEditing)
  }

  return (
    <>
      <Styled.LayerRow onClick={onRowClick} isSelected={isSelected}>
        <Styled.LayerIconContainer>
          <Icon name={iconName} size={iconSize} color='var(--night-gray)' />
        </Styled.LayerIconContainer>
        <Styled.LayerNameText>{props.layer.name}</Styled.LayerNameText>
        <Styled.LayerEditIcon
          isEditing={isEditing}
          data-is-component-action
          name='angle-down'
          size='18px'
          color='var(--night-gray)'
          onClick={onEllipsisClick}
        />
      </Styled.LayerRow>
      <If condition={isEditing}>
        <TextLayerEditor layer={props.layer} />
      </If>
    </>
  )
})

const useLayerActions = (layer) => {
  const actions = EditorStore.useStoreActions((actions) => ({
    setFontColor: (value) => actions.setLayerStyle([layer.id, 'color', value]),
    setFontLineHeight: (value) => actions.setLayerStyle([layer.id, 'lineHeight', value]),
    setFontLetterSpacing: (value) => actions.setLayerStyle([layer.id, 'letterSpacing', value]),
    setFontWeight: (value) => actions.setLayerStyle([layer.id, 'fontWeight', value]),
    setFontColor: (value) => actions.setLayerStyle([layer.id, 'color', value]),
    setFontFamily: (value) => actions.setLayerFontFamily([layer.id, value]),
    setFontStyle: (value) => actions.setLayerStyle([layer.id, 'fontStyle', value]),
    setFontSize: (value) => actions.setLayerStyle([layer.id, 'fontSize', value]),
    setName: (value) => actions.setLayerName([layer.id, value]),
    setText: (value) => actions.setLayerText([layer.id, value]),
    removeLayer: () => actions.removeLayer(layer.id),
  }))

  return actions
}

const TextLayerEditor = (props) => {
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
      <Styled.LayerEditorIconsContainer>
        <Styled.LayerDeleteIcon
          data-is-component-action
          name='trash-alt'
          size='18px'
          color='var(--night-gray)'
          onClick={actions.removeLayer}
        />
        <Salem.Small style={{ marginLeft: 2, marginTop: 1 }}>Delete</Salem.Small>
      </Styled.LayerEditorIconsContainer>
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
          <ColorPicker width={324} current={props.current} onChange={onChange} />
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
