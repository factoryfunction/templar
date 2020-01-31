import styled from 'styled-components'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { useHotkeys } from 'react-hotkeys-hook'
import { EditorStore } from './utilities/editorStore'
import CanvasLayers from './CanvasLayers'
import useClickHandler from '../utilities/useClickHandler'
import { ScaleProvider } from '../components/useScaleState'
import { useKeyPress } from '../utilities/useKeyPress'

const StyledCanvasContainer = styled.div`
  width: 100vw;
  height: 100vh;
  padding-left: 400px;
  display: flex;
  justify-content: center;
  overflow: visible;

  /* If panning is disabled we want to disable the grab cursor. */
  cursor: ${(props) => (props.isPanDisabled ? 'inherit' : 'grab')};

  /* When LeftPanel expands, we hide the canvas. When it contracts, we */
  /* want to reveal it in a pleasant way. -- This is that way. =P */
  transition: opacity 0.5s;
  transition-delay: 0.5s;
  opacity: ${(props) => (props.isCanvasInvisible ? 0 : 1)};

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
  overflow: visible;

  [data-is-selected='true'] {
    /* background: #ff89061c; */
    outline: 2px solid var(--highlight);
  }
`

const WRAPPER_PROPS = {
  style: { width: '100%', height: '100%' },
  zoomIn: {
    step: 20,
  },
  zoomOut: {
    step: 20,
  },
  options: {
    limitToBounds: false,
    transformEnabled: true,
    disabled: false,
    limitToWrapper: true,
    centerContent: true,
  },
  pinch: { disabled: true },
  doubleClick: { disabled: true },
  wheel: {
    wheelEnabled: true,
    touchPadEnabled: false,
    limitsOnWheel: false,
    step: 20,
  },
}

const useStore = () => {
  const state = EditorStore.useStoreState((state) => ({
    isCanvasInvisible: state.isConfiguringSources,
  }))

  const actions = EditorStore.useStoreActions((actions) => ({
    deselectAllLayers: actions.deselectAllLayers,
  }))

  return { state, actions }
}

// TODO: Wrap Canvas with an HOC that will unmount Canvas after
// it goes invisible and re-mount it after it becomes visible.
const Canvas = (props) => {
  const store = useStore()
  const isCanvasInvisible = store.state.isCanvasInvisible
  const [isPanDisabled, setIsPanDisabled] = React.useState(true)

  useKeyPress('h', (direction) => {
    !isCanvasInvisible && direction === 'down' ? setIsPanDisabled(false) : setIsPanDisabled(true)
  })

  useClickHandler('#CanvasContainer', (event) => {
    const { target, which } = event
    const isClick = which === 1
    const isDismissableClick = isCanvasInvisible || event.target.className === 'ResizeHandle'
    const isDeselectClick = !isCanvasInvisible && isClick && target.querySelector('.CanvasLayer')
    !isDismissableClick && isDeselectClick && store.actions.deselectAllLayers()
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
      isCanvasInvisible={isCanvasInvisible}
      isPanDisabled={isPanDisabled}
      id='CanvasContainer'
      onMouseUp={onMouseUp}
      onMouseDown={onMouseDown}
    >
      <TransformWrapper
        {...WRAPPER_PROPS}
        pan={{
          disabled: isPanDisabled,
          lockAxisX: false,
          lockAxisY: false,
          velocityEqualToMove: true,
          velocity: true,
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
