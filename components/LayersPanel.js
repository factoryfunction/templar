import styled from 'styled-components'
import { observer } from 'mobx-react-lite'

import Spacer from './Spacer'
import Icon from './Icon'
import layersStore from '../stores/layersStore'

import { LAYER_TYPE_ICON_NAME_MAP, LAYER_TYPE_ICON_SIZE_MAP } from '../consts'
import useLayer from '../utilities/useLayer'

const StyledLayersPanelContainer = styled.div`
  width: 320px;
  max-height: calc(100vh - 40px);
  height: calc(100vh - 40px);
  background: var(--white);
  border-left: 1px solid var(--whiteBorderColor);
  position: fixed;
  top: 48px;
  right: 0px;
`

const StyledPanelTitleContainer = styled.div`
  width: 100%;
  height: 40px;
  min-height: 40px;
  padding-left: 16px;
  display: flex;
  align-items: center;
`

const StyledPanelTitle = styled.p`
  font-family: var(--monoFont);
  color: var(--text0);
  font-size: 14px;
`

const StyledLayersList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: calc(100vh - 128px);
  overflow: auto;

  ::-webkit-scrollbar {
    width: 0px;
    background: rgba(0, 0, 0, 0);
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }
`

const LayersPanel = (props) => {
  return (
    <StyledLayersPanelContainer>
      <PanelTitle />
      <StyledLayersList>
        <For each='layer' of={layersStore.layers.reverse()}>
          <Layer key={layer.id} id={layer.id} />
        </For>
      </StyledLayersList>
      <StyledBottomContainer>
        <AddTextLayerIcon />
        <AddImageLayerIcon />
        <AddBlockLayerIcon />
      </StyledBottomContainer>
    </StyledLayersPanelContainer>
  )
}

const AddTextLayerIcon = (props) => {
  const onClick = React.useCallback(() => {
    layersStore.insertTextLayer()
  }, [])

  return <Icon name='text' size='24px' color='#fff' onClick={onClick} />
}

const AddImageLayerIcon = (props) => {
  const onClick = React.useCallback(() => {
    layersStore.insertImageLayer()
  }, [])

  return <Icon name='scenery' size='24px' color='#fff' onClick={onClick} />
}

const AddBlockLayerIcon = (props) => {
  const onClick = React.useCallback(() => {
    layersStore.insertBlockLayer()
  }, [])

  return <Icon name='square-full' size='24px' color='#fff' onClick={onClick} />
}

const PanelTitle = (props) => {
  return (
    <StyledPanelTitleContainer>
      <StyledPanelTitle>Layers</StyledPanelTitle>
    </StyledPanelTitleContainer>
  )
}

const StyledLayer = styled.div`
  width: 100%;
  height: 40px;
  min-height: 40px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  border-radius: 2px;

  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;

  :hover {
    border-top: 1px solid var(--whiteBorderColor);
    border-bottom: 1px solid var(--whiteBorderColor);
  }

  &[data-is-selected='true'] {
    background: #d5a0f836;
  }
`

const StyledLayerName = styled.p`
  font-family: var(--mainFont);
  color: var(--subTextColor);
  font-size: 14px;
  margin-left: 8px;
  margin-bottom: 2px;
`

const StyledLayerIconContainer = styled.div`
  width: 24px;
  display: flex;
  justify-content: center;
`

const StyledRemoveIcon = styled(Icon)`
  margin-left: auto;
`

const Layer = observer((props) => {
  const { layer, layerActions, layerRef } = useLayer(props.id)
  const iconName = LAYER_TYPE_ICON_NAME_MAP[layer.type]
  const iconSize = LAYER_TYPE_ICON_SIZE_MAP[layer.type]

  return (
    <>
      <StyledLayer ref={layerRef} draggable data-is-selected={String(layer.isSelected)}>
        <StyledLayerIconContainer>
          <Icon name={iconName} size={iconSize} color='var(--subTextColor)' />
        </StyledLayerIconContainer>
        <StyledLayerName>{layer.name}</StyledLayerName>
        <StyledRemoveIcon
          name='trash-alt'
          size='16px'
          color='var(--subTextColor)'
          onClick={layerActions.removeLayer}
        />
      </StyledLayer>
      <If condition={layer.isBeingEdited}>
        <Choose>
          <When condition={layer.type === 'text'}>
            <TextLayerEditor layer={layer} layerActions={layerActions}></TextLayerEditor>
          </When>

          <When condition={layer.type === 'image'}>
            <ImageLayerEditor layer={layer} layerActions={layerActions}></ImageLayerEditor>
          </When>

          <When condition={layer.type === 'block'}>
            <BlockLayerEditor layer={layer} layerActions={layerActions}></BlockLayerEditor>
          </When>
        </Choose>
      </If>
    </>
  )
})

const StyledLayerEditor = styled.div`
  width: 100%;
  height: fit-content;
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
`

const SmallInput = styled.input`
  border: 1px solid var(--whiteBorderColor);
  border-radius: 3px;
  outline: none;
  padding: 8px 12px;
  font-size: 14px;
  letter-spacing: 0.5px;
  font-family: var(--mainFont);
`

const Small = styled.small`
  font-size: 12px;
  letter-spacing: 0.5px;
  font-family: var(--mainFont);
`

const TextLayerEditor = observer((props) => {
  return (
    <StyledLayerEditor>
      <Small>Layer Name:</Small>
      <Spacer size='8px' />
      <SmallInput value={props.layer.name} onChange={props.layerActions.setLayerName} />
      <Spacer size='16px' />
      <Small>Horizontal Position Percentage:</Small>
      <Spacer size='8px' />
      <SmallInput
        value={props.layer.style.left.replace('%', '')}
        type='number'
        onChange={props.layerActions.setLayerStyleLeft}
      />
      <Spacer size='16px' />
      <Small>Vertical Position Percentage:</Small>
      <Spacer size='8px' />
      <SmallInput
        value={props.layer.style.top.replace('%', '')}
        type='number'
        onChange={props.layerActions.setLayerStyleTop}
      />
      <Spacer size='16px' />
    </StyledLayerEditor>
  )
})

const ImageLayerEditor = observer((props) => {
  return (
    <StyledLayerEditor>
      <Small>Layer Name:</Small>
      <Spacer size='8px' />
      <SmallInput value={props.layer.name} onChange={props.layerActions.setLayerName} />
      <Spacer size='16px' />
      <Small>Horizontal Position Percentage:</Small>
      <Spacer size='8px' />
      <SmallInput
        value={props.layer.style.left.replace('%', '')}
        type='number'
        onChange={props.layerActions.setLayerStyleLeft}
      />
      <Spacer size='16px' />
      <Small>Vertical Position Percentage:</Small>
      <Spacer size='8px' />
      <SmallInput
        value={props.layer.style.top.replace('%', '')}
        type='number'
        onChange={props.layerActions.setLayerStyleTop}
      />
      <Spacer size='16px' />

      <Small>Placeholder Image Url:</Small>
      <Spacer size='8px' />
      <SmallInput
        value={props.layer.style.backgroundImage.replace('url(', '').replace(')', '')}
        type='text'
        onChange={props.layerActions.setLayerStylePlaceholderImageUrl}
      />
      <Spacer size='16px' />
    </StyledLayerEditor>
  )
})

const BlockLayerEditor = observer((props) => {
  return (
    <StyledLayerEditor>
      <Small>Layer Name:</Small>
      <Spacer size='8px' />
      <SmallInput value={props.layer.name} onChange={props.layerActions.setLayerName} />
      <Spacer size='16px' />
      <Small>Horizontal Position Percentage:</Small>
      <Spacer size='8px' />
      <SmallInput
        value={props.layer.style.left.replace('%', '')}
        type='number'
        onChange={props.layerActions.setLayerStyleLeft}
      />
      <Spacer size='16px' />
      <Small>Vertical Position Percentage:</Small>
      <Spacer size='8px' />
      <SmallInput
        value={props.layer.style.top.replace('%', '')}
        type='number'
        onChange={props.layerActions.setLayerStyleTop}
      />
      <Spacer size='16px' />
    </StyledLayerEditor>
  )
})

const StyledBottomContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background: var(--dark0);
  position: absolute;
  bottom: 8px;
  right: 0;
`

export default observer(LayersPanel)
