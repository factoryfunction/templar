import styled from 'styled-components'
import useLayersStore from '../stores/layersStore'
import useLayerClickHandlers from '../utilities/useLayerClickHandlers'
import useAssetsStore from '../stores/assetsStore'

const CanvasLayers = (props) => {
  const layersStore = useLayersStore()
  const assetsStore = useAssetsStore()

  return (
    <For each='layer' of={layersStore.layers}>
      <CanvasLayer
        layer={layer}
        key={layer.id}
        layersStore={layersStore}
        assetsStore={assetsStore}
      />
    </For>
  )
}

const CanvasLayer = (props) => {
  return (
    <Choose>
      <When condition={props.layer.type === 'text'}>
        <TextCanvasLayer layersStore={props.layersStore} layer={props.layer} />
      </When>
      <When condition={props.layer.type === 'image'}>
        <ImageCanvasLayer
          layersStore={props.layersStore}
          layer={props.layer}
          assetsStore={props.assetsStore}
        />
      </When>
      <When condition={props.layer.type === 'block'}>
        <BlockCanvasLayer layersStore={props.layersStore} layer={props.layer} />
      </When>
    </Choose>
  )
}

const TextCanvasLayer = (props) => {
  const width = props.layer.style.width > 0 ? props.layer.style.width + 'in' : 'auto'
  const height = props.layer.style.height > 0 ? props.layer.style.height + 'in' : 'auto'

  const onClick = (event) => {
    props.layersStore.selectLayer(props.layer.id)
    props.layersStore.enableLayerEditing(props.layer.id)
  }

  const style = {
    ...props.layer.style,
    width,
    height,
    top: props.layer.style.top + 'in',
    left: props.layer.style.left + 'in',
    fontFamily: `"${props.layer.fontAsset.name}"`,
    overflow: 'hidden',
  }

  return (
    <p
      onClick={onClick}
      className='CanvasLayer'
      data-is-selected={props.layer.isSelected}
      style={style}
    >
      <For each='line' of={props.layer.text.split('\n')}>
        <React.Fragment key={line}>
          {line}
          <br />
        </React.Fragment>
      </For>
    </p>
  )
}

const BlockCanvasLayer = (props) => {
  const { layerRef } = useLayerClickHandlers(props.layer.id)

  const style = {
    ...props.layer.style,
    top: props.layer.style.top + 'in',
    left: props.layer.style.left + 'in',
    width: props.layer.width + 'in',
    height: props.layer.height + 'in',
  }

  return (
    <div
      ref={layerRef}
      className='CanvasLayer'
      data-is-selected={props.layer.isSelected}
      style={style}
    />
  )
}

const ImageCanvasLayer = (props) => {
  const { layerRef } = useLayerClickHandlers(props.layer.id)
  const { width, height, ...layerStyle } = props.layer.style

  const style = {
    ...layerStyle,
    height: `${height}in`,
    width: `${width}in`,
    top: props.layer.style.top + 'in',
    left: props.layer.style.left + 'in',
    backgroundImage: `url("${props.layer.imageAsset.url}")`,
    backgroundSize: `${width}in ${height}in`,
  }

  return (
    <div
      ref={layerRef}
      className='CanvasLayer'
      data-is-selected={String(props.layer.isSelected)}
      style={style}
    />
  )
}

export default CanvasLayers
