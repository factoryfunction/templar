import * as React from 'react'

import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc'

import * as Styled from './LayersTab.styled'
import { LeftPanelView } from './LeftPanelView'
import { FontEditor } from './FontEditor'
import { BoxEditor } from './BoxEditor'

import { EditorStore } from '#stores/editorStore'
import Icon from '#components/Icon'
import Spacer from '#components/Spacer'
import { ImageEditor } from './ImageEditor'

import './styles/LayersTab.css'

import { LAYER_TYPE_ICON_NAME_MAP, LAYER_TYPE_ICON_SIZE_MAP } from '#consts'

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
      addTextLayer: () => store.addTextLayer(),
      addImageLayer: store.addImageLayer,
      addBoxLayer: () => store.addBoxLayer(),
      selectLayer: store.selectLayer,
      reorderLayer: ({ oldIndex, newIndex }) => store.reorderLayer([oldIndex, newIndex]),
    }
  })

  return { layers, actions }
}

export const LayersTab = () => {
  const layersState = useLayers()
  const PanelHeader = () => <LayerListActions layersState={layersState} />

  return (
    <LeftPanelView title='Layers' header={PanelHeader}>
      <Choose>
        <When condition={layersState.layers.isLayersEmpty}>
          <p styleName='noLayersMessage'>Layers will appear here when you add some.</p>
        </When>
        <Otherwise>
          <LayerList
            lockAxis='y'
            pressDelay={300}
            hideSortableGhost
            lockToContainerEdges
            layersState={layersState}
            onSortEnd={layersState.actions.reorderLayer}
          />
        </Otherwise>
      </Choose>
      {/* Spacer is for bottom padding. */}
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

const LayerListActions = (props) => {
  return (
    <Styled.AddLayerActions>
      <Icon
        name='text'
        size='16px'
        color='#fff'
        onClick={() => props.layersState.actions.addTextLayer()}
      />
      <Icon
        name='scenery'
        size='16px'
        color='#fff'
        onClick={() => props.layersState.actions.addImageLayer()}
      />
      <Icon
        name='square-full'
        size='16px'
        color='#fff'
        onClick={() => props.layersState.actions.addBoxLayer()}
      />
    </Styled.AddLayerActions>
  )
}

const LayerRow = SortableElement((props) => {
  const isSelected = props.layersState.layers.selectedLayers.includes(props.layer.id)
  const iconName = LAYER_TYPE_ICON_NAME_MAP[props.layer.type]
  const iconSize = LAYER_TYPE_ICON_SIZE_MAP[props.layer.type]

  const onRowClick = () => {
    props.layersState.actions.selectLayer(props.layer.id)
  }

  return (
    <>
      <Styled.LayerRow onClick={onRowClick} isSelected={isSelected}>
        <Styled.LayerIconContainer>
          <Icon name={iconName} size={iconSize} color='var(--night-gray)' />
        </Styled.LayerIconContainer>
        <Styled.LayerNameText>{props.layer.name}</Styled.LayerNameText>
      </Styled.LayerRow>
      <If condition={isSelected}>
        <Choose>
          <When condition={props.layer.type === 'text'}>
            <FontEditor layerId={props.layer.id} />
          </When>
          <When condition={props.layer.type === 'box'}>
            <BoxEditor layerId={props.layer.id} />
          </When>
          <When condition={props.layer.type === 'image'}>
            <ImageEditor layerId={props.layer.id} />
          </When>
        </Choose>
      </If>
    </>
  )
})
