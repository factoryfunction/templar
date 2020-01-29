import * as React from 'react'
import * as Styled from './LayersTab.styled'
import { useStoreState, useStoreActions } from 'easy-peasy'

import Icon from '../../components/Icon'
import * as Salem from '../../components/Salem'
import { LeftPanelView } from './LeftPanelView'
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu'
import useLayersStore from '../../stores/layersStore'

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
    }
  })

  return { layers, actions }
}

export const LayersTab = () => {
  const layersState = useLayers()

  return (
    <LeftPanelView title='Layers' header={() => <AddLayerActions layersState={layersState} />}>
      <Choose>
        <When condition={layersState.layers.isLayersEmpty}>
          <p style={{ marginTop: 24, color: 'var(--night-gray)' }}>
            Layers will appear here when you add some.
          </p>
        </When>
        <Otherwise>
          <For each='layer' of={layersState.layers.list}>
            <LayerRow key={layer.id} layer={layer} layersState={layersState} />
          </For>
        </Otherwise>
      </Choose>
    </LeftPanelView>
  )
}

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

const LayerRow = (props) => {
  const isSelected = props.layersState.layers.selectedLayers.includes(props.layer.id)
  const iconName = LAYER_TYPE_ICON_NAME_MAP[props.layer.type]
  const iconSize = LAYER_TYPE_ICON_SIZE_MAP[props.layer.type]

  const onClick = () => {
    props.layersState.actions.selectLayer(props.layer.id)
  }

  return (
    <>
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
          onClick={() => props.layersState.actions.removeLayer(props.layer.id)}
        />
      </Styled.LayerRow>
      <If condition={isSelected}>
        <div></div>
      </If>
    </>
  )
}
