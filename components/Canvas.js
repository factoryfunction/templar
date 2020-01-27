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
  overflow: visible;

  .react-transform-component {
    width: 100% !important;
    height: 100% !important;
  }
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
  defaultScale: 1,
  // defaultPositionX: 96,
  // defaultPositionY: 48,
  options: {
    minScale: 1,
    maxScale: 2,
    limitToWrapper: false,
    limitToBounds: false,
    centerContent: true,
  },

  // scalePadding: {
  //   size: 2.5,
  // },
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
    <StyledCanvasContainer id='CanvasContainer'>
      <TransformWrapper
        style={{ width: '100%', height: '100%' }}
        options={{
          limitToBounds: false,
          transformEnabled: true,
          disabled: false,
          limitToWrapper: true,
          centerContent: true,
        }}
        pan={{
          disabled: false,
          lockAxisX: false,
          lockAxisY: false,
          velocityEqualToMove: true,
          velocity: true,
        }}
        pinch={{ disabled: true }}
        doubleClick={{ disabled: true }}
        wheel={{
          wheelEnabled: true,
          touchPadEnabled: false,
          limitsOnWheel: false,
        }}
      >
        <TransformComponent>
          <StyledCanvas>
            <CanvasLayers />
          </StyledCanvas>
        </TransformComponent>
      </TransformWrapper>
    </StyledCanvasContainer>
  )
}

export default Canvas
