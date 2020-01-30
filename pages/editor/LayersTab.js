import * as React from 'react'
import * as Styled from './LayersTab.styled'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import arrayMove from 'array-move'

import Icon from '../../components/Icon'
import { LeftPanelView } from './LeftPanelView'

import { LAYER_TYPE_ICON_NAME_MAP, LAYER_TYPE_ICON_SIZE_MAP } from '../../consts'

const useLayers = () => {
  const layers = useStoreState((store) => {
    return {
      list: [...store.layers].reverse(),
      isLayersEmpty: store.layers.length === 0,
      selectedLayers: store.selectedLayers,
    }
  })

  const actions = useStoreActions((store) => {
    return {
      removeLayer: store.removeLayer,
      addTextLayer: store.addTextLayer,
      addImageLayer: store.addImageLayer,
      addBoxLayer: store.addBoxLayer,
      selectLayer: store.selectLayer,
      reorderLayer: store.reorderLayer,
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
          <LayerList hideSortableGhost={true} onSortEnd={onSortEnd} layersState={layersState} />
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
  const isSelected = props.layersState.layers.selectedLayers.includes(props.layer.id)
  const iconName = LAYER_TYPE_ICON_NAME_MAP[props.layer.type]
  const iconSize = LAYER_TYPE_ICON_SIZE_MAP[props.layer.type]

  const onClick = () => {
    props.layersState.actions.selectLayer(props.layer.id)
  }

  return (
    <Styled.LayerRow onClick={onClick} isSelected={isSelected}>
      <Styled.LayerIconContainer>
        <Icon name={iconName} size={iconSize} color='var(--subTextColor)' />
      </Styled.LayerIconContainer>
      <Styled.LayerNameText>{props.layer.name}</Styled.LayerNameText>
      <Styled.LayerRemoveIcon
        data-is-component-action
        name='trash-alt'
        size='18px'
        color='var(--subTextColor)'
        onClick={(event) => {
          event.preventDefault()
          event.stopPropagation()
          props.layersState.actions.removeLayer(props.layer.id)
        }}
      />
    </Styled.LayerRow>
  )
})
