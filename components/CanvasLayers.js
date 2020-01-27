import styled from 'styled-components'
import useLayersStore from '../stores/layersStore'
import useLayerClickHandlers from '../utilities/useLayerClickHandlers'
import useAssetsStore from '../stores/assetsStore'

const CanvasLayers = (props) => {
  const layersStore = useLayersStore()
  const assetsStore = useAssetsStore()

  return (
    <For each='layer' of={layersStore.layers}>
      <CanvasLayer layer={layer} key={layer.id} assetsStore={assetsStore} />
    </For>
  )
}

const CanvasLayer = (props) => {
  return (
    <Choose>
      <When condition={props.layer.type === 'text'}>
        <TextCanvasLayer layer={props.layer} />
      </When>
      <When condition={props.layer.type === 'image'}>
        <ImageCanvasLayer layer={props.layer} assetsStore={props.assetsStore} />
      </When>
      <When condition={props.layer.type === 'block'}>
        <BlockCanvasLayer layer={props.layer} />
      </When>
    </Choose>
  )
}

const TextCanvasLayer = (props) => {
  const { layerRef } = useLayerClickHandlers(props.layer.id)
  const width = props.layer.style.width > 0 ? props.layer.style.width + 'in' : 'auto'

  const height = props.layer.style.height > 0 ? props.layer.style.height + 'in' : 'auto'

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
    <p ref={layerRef} className='CanvasLayer' data-is-selected={props.layer.isSelected} style={style}>
      <For each='line' of={props.layer.text.split('\n')}>
        <>
          {line}
          <br />
        </>
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
    <div ref={layerRef} className='CanvasLayer' data-is-selected={props.layer.isSelected} style={style} />
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
