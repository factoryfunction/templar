import styled from 'styled-components'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { useStoreActions } from 'easy-peasy'
import { useHotkeys } from 'react-hotkeys-hook'

import CanvasLayers from './CanvasLayers'
import useClickHandler from '../../utilities/useClickHandler'
import { ScaleProvider } from '../../components/useScaleState'
import { useKeyPress } from '../../utilities/useKeyPress'

const StyledCanvasContainer = styled.div`
  width: 100vw;
  height: 100vh;
  padding-left: 400px;
  display: flex;
  justify-content: center;
  overflow: visible;

  cursor: ${(props) => (props.isPanDisabled ? 'inherit' : 'grab')};

  .react-transform-component {
    width: 100% !important;
    height: 100% !important;
  }

  .SelectedCanvasLayer .ResizeHandle {
    opacity: 1 !important;
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
  options: {
    minScale: 1,
    maxScale: 2,
    limitToWrapper: false,
    limitToBounds: false,
    centerContent: true,
  },

  zoomIn: {
    step: 15,
  },

  zoomOut: {
    step: 15,
  },
}

const useStore = () => {
  const actions = useStoreActions((actions) => ({
    deselectAllLayers: actions.deselectAllLayers,
  }))

  return { actions }
}

const Canvas = (props) => {
  const store = useStore()
  const [isPanDisabled, setIsPanDisabled] = React.useState(true)

  useKeyPress('h', (direction) => {
    direction === 'down' ? setIsPanDisabled(false) : setIsPanDisabled(true)
  })

  useClickHandler('#CanvasContainer', (event) => {
    if (event.target.className === 'ResizeHandle') {
      return
    }

    if (event.which === 1 && event.target.querySelector('.CanvasLayer')) {
      store.actions.deselectAllLayers()
    }
  })

  const onMouseDown = (event) => {
    if (event.button === 1) {
      setIsPanDisabled(false)
    }
  }

  const onMouseUp = (event) => {
    if (event.button === 1) {
      setIsPanDisabled(true)
    }
  }

  return (
    <StyledCanvasContainer
      isPanDisabled={isPanDisabled}
      id='CanvasContainer'
      onMouseUp={onMouseUp}
      onMouseDown={onMouseDown}
    >
      <TransformWrapper
        style={{ width: '100%', height: '100%' }}
        zoomIn={{
          step: 20,
        }}
        zoomOut={{
          step: 20,
        }}
        options={{
          limitToBounds: false,
          transformEnabled: true,
          disabled: false,
          limitToWrapper: true,
          centerContent: true,
        }}
        pan={{
          disabled: isPanDisabled,
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
          step: 20,
        }}
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <ScaleProvider scale={rest.scale}>
            <TransformComponent>
              <StyledCanvas id='DocumentCanvas'>
                <CanvasLayers />
              </StyledCanvas>
            </TransformComponent>
          </ScaleProvider>
        )}
      </TransformWrapper>
    </StyledCanvasContainer>
  )
}

export default Canvas
