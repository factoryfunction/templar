import styled from 'styled-components'
import { toJS } from 'mobx'
import useLayersStore from '../stores/layersStore'
import useLayer from '../utilities/useLayer'
import { observer } from 'mobx-react-lite'
import useImage from 'use-image'
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

const DEFAULT_IMG = {
  height: 0,
  width: 0,
}

const TextCanvasLayer = (props) => {
  const { layerRef } = useLayerClickHandlers(props.layer.id)

  console.log(props.layer)
  const style = {
    ...props.layer.style,
    top: props.layer.style.top + 'in',
    left: props.layer.style.left + 'in',
    width: props.layer.style.width + 'in',
    height: props.layer.style.height + 'in',
    fontFamily: `"${props.layer.fontAsset.name}"`,
  }

  return (
    <p ref={layerRef} className='CanvasLayer' data-is-selected={props.layer.isSelected} style={style}>
      {props.layer.text}
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
  // const width = imageAsset.width * size
  // const height = width * imageAsset.heightRatio

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
