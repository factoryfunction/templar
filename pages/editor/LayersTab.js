import * as React from 'react'
import * as Styled from './LayersTab.styled'

import Icon from '../../components/Icon'
import * as Salem from '../../components/Salem'
import { LeftPanelView } from './LeftPanelView'
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu'
import useLayersStore from '../../stores/layersStore'

import { LAYER_TYPE_ICON_NAME_MAP, LAYER_TYPE_ICON_SIZE_MAP } from '../../consts'

export const LayersTab = () => {
  const layersStore = useLayersStore()

  return (
    <LeftPanelView title='Layers' header={AddLayerActions}>
      <Choose>
        <When condition={layersStore.layers.length === 0}>
          <p style={{ marginTop: 24, color: 'var(--night-gray)' }}>
            Layers will appear here when you add some.
          </p>
        </When>
        <Otherwise>
          <For each='layer' of={[...layersStore.layers].reverse()}>
            <LayerRow key={layer.id} layer={layer} layersStore={layersStore} />
          </For>
        </Otherwise>
      </Choose>
    </LeftPanelView>
  )
}

const AddLayerActions = (props) => {
  const layersStore = useLayersStore()

  return (
    <Styled.AddLayerActions>
      <Icon name='text' size='16px' color='#fff' onClick={layersStore.addTextLayer} />
      <Icon name='scenery' size='16px' color='#fff' onClick={layersStore.addImageLayer} />
      <Icon name='square-full' size='16px' color='#fff' onClick={layersStore.addBlockLayer} />
    </Styled.AddLayerActions>
  )
}

const LayerRow = (props) => {
  const iconName = LAYER_TYPE_ICON_NAME_MAP[props.layer.type]
  const iconSize = LAYER_TYPE_ICON_SIZE_MAP[props.layer.type]

  const onClick = () => {
    props.layersStore.selectLayer(props.layer.id)
    props.layersStore.enableLayerEditing(props.layer.id)
  }

  return (
    <Styled.LayerRow onClick={onClick} isSelected={props.layer.isSelected}>
      <Styled.LayerIconContainer>
        <Icon name={iconName} size={iconSize} color='var(--subTextColor)' />
      </Styled.LayerIconContainer>
      <Styled.LayerNameText>{props.layer.name}</Styled.LayerNameText>
      <Styled.LayerRemoveIcon
        data-is-component-action
        name='trash-alt'
        size='18px'
        color='var(--subTextColor)'
        onClick={() => props.layersStore.removeLayer(props.layer.id)}
      />
    </Styled.LayerRow>
  )
}
