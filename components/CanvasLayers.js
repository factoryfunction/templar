import styled from 'styled-components'
import { toJS } from 'mobx'
import layersStore from '../stores/layersStore'
import useLayer from '../utilities/useLayer'
import { observer } from 'mobx-react-lite'
import useImage from 'use-image'

const CanvasLayers = (props) => {
  return (
    <For each='id' of={layersStore.layerIds}>
      <CanvasLayer id={id} key={id} />
    </For>
  )
}

const CanvasLayer = observer((props) => {
  const { layer, layerActions, layerRef } = useLayer(props.id)
  const isSelected = layer.isSelected

  return (
    <Choose>
      <When condition={layer.type === 'text'}>
        <p
          ref={layerRef}
          className='CanvasLayer'
          data-is-selected={String(isSelected)}
          // onClick={layerActions.selectLayer}
          style={toJS(layer.style)}
        >
          {layer.text}
        </p>
      </When>
      <When condition={layer.type === 'image'}>
        <ImageCanvasLayer layer={layer} layerActions={layerActions} layerRef={layerRef} />
      </When>
      <When condition={layer.type === 'block'}>
        <div
          ref={layerRef}
          className='CanvasLayer'
          data-is-selected={String(isSelected)}
          // onClick={layerActions.selectLayer}
          style={toJS(layer.style)}
        />
      </When>
    </Choose>
  )
})

const DEFAULT_IMG = {
  height: 0,
  width: 0,
}

const ImageCanvasLayer = observer((props) => {
  const [img = DEFAULT_IMG, isLoaded] = useImage(props.layer.url)
  const { size, ...layerStyle } = toJS(props.layer.style)

  const style = {
    ...layerStyle,
    height: img.height * size,
    width: img.width * size,
  }

  return (
    <div
      ref={props.layerRef}
      className='CanvasLayer'
      data-is-selected={String(props.layer.isSelected)}
      // onClick={props.layerActions.selectLayer}
      style={style}
    />
  )
})

export default observer(CanvasLayers)
