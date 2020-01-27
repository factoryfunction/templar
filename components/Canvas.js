import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import styled from 'styled-components'
import CanvasLayers from './CanvasLayers'
import useClickHandler from '../utilities/useClickHandler'
import useLayersStore from '../stores/layersStore'

const StyledCanvasContainer = styled.div`
  width: calc(100vw - 320px);
  height: calc(100vh - 48px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 180px;
  padding-bottom: 180px;
`

const StyledCanvas = styled.div`
  width: 8.5in;
  height: 11in;
  background: #fff;
  box-shadow: 0px 2px 16px -4px rgba(0, 0, 0, 0.05);
  outline: 1px solid var(--whiteBorderColor);
  position: relative;
  overflow: hidden;

  [data-is-selected='true'] {
    background: #d5a0f836;
    outline: 1px solid #60189099;
  }
`

const WRAPPER_PROPS = {
  minScale: 0.75,
  maxScale: 1.75,
  limitToWrapper: true,
  doubleClick: {
    disabled: true,
  },
}

const Canvas = (props) => {
  const layersStore = useLayersStore()

  useClickHandler('#CanvasContainer', (event) => {
    const containsLayer = event.target.querySelector('.CanvasLayer')

    if (containsLayer) {
      layersStore.deselectAllLayers()
    }
  })

  return (
    <TransformWrapper scale={0.75} options={WRAPPER_PROPS}>
      <TransformComponent>
        <StyledCanvasContainer id='CanvasContainer'>
          <StyledCanvas>
            <CanvasLayers />
          </StyledCanvas>
        </StyledCanvasContainer>
      </TransformComponent>
    </TransformWrapper>
  )
}

export default Canvas
