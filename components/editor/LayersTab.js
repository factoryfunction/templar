import * as React from 'react'
import * as Styled from './LayersTab.styled'
import { SketchPicker } from 'react-color'
import { rgbaToHex } from 'hex-and-rgba'
import arrayMove from 'array-move'
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc'

import { LeftPanelView } from './LeftPanelView'
import { FontEditor } from './FontEditor'
import { BoxEditor } from './BoxEditor'
import Icon from '../Icon'
import Spacer from '../Spacer'
import { EditorStore } from './utilities/editorStore'
import { LAYER_TYPE_ICON_NAME_MAP, LAYER_TYPE_ICON_SIZE_MAP } from '../../consts'

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
      <Spacer size='36px' />
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
        <Choose>
          <When condition={props.layer.type === 'text'}>
            <FontEditor layer={props.layer} />
          </When>
          <When condition={props.layer.type === 'box'}>
            <BoxEditor layer={props.layer} />
          </When>
        </Choose>
      </If>
    </>
  )
})
