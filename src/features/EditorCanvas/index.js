import styled from 'styled-components'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { useDropzone } from 'react-dropzone'

import { EditorCanvasLayers } from './EditorCanvasLayers'
import { EditorStore } from '#stores/editorStore'
import { windowLocation } from '#utilities/windowLocation'
import { ScaleProvider } from '#utilities/useScale'
import { useKeyPress } from '#utilities/useKeyPress'
import * as storage from '#utilities/backend/storage'

const StyledCanvasContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  overflow: visible;

  /* If panning is disabled we want to disable the grab cursor. */
  cursor: ${(props) => (props.isPanDisabled ? 'inherit' : 'grab')};

  /* When LeftPanel expands, we hide the canvas. When it contracts, we */
  /* want to reveal it in a pleasant way. -- This is that way. =P */
  transition: opacity 0.5s;
  transition-delay: 0.5s;

  /* .react-transform-component {
    width: 100% !important;
    height: 100% !important;
  } */

  .SelectedCanvasLayer .ResizeHandle {
    opacity: 1 !important;
  }
`

const StyledCanvas = styled.div`
  width: 2550px;
  height: 3300px;
  background: #fff;
  box-shadow: 0px 2px 16px -4px rgba(0, 0, 0, 0.05);
  outline: 1px solid var(--whiteBorderColor);
  position: relative;
  overflow: visible;
`

const WRAPPER_PROPS = {
  style: { width: '100%', height: '100%' },
  zoomIn: {
    step: 100,
  },
  zoomOut: {
    step: 100,
  },
  options: {
    minScale: 0.3,
    limitToBounds: true,
    transformEnabled: true,
    disabled: false,
    limitToWrapper: true,
    centerContent: false,
  },
  scalePadding: { size: 222 },
  pinch: { disabled: true },
  doubleClick: { disabled: true },
  wheel: {
    wheelEnabled: true,
    touchPadEnabled: false,
    limitsOnWheel: false,
    step: 100,
  },
}

const useStore = () => {
  const actions = EditorStore.useStoreActions((actions) => ({
    deselectAllLayers: actions.deselectAllLayers,
    handleFileUpload: actions.handleFileUpload,
  }))

  return { actions }
}

const getCanvasLayer = (target) => {
  return target.querySelector('[data-is-canvaslayer]')
}

// TODO: Wrap Canvas with an HOC that will unmount Canvas after
// it goes invisible and re-mount it after it becomes visible.
export const EditorCanvas = (props) => {
  const store = useStore()
  const [isPanDisabled, setIsPanDisabled] = React.useState(true)

  useKeyPress('h', (direction) => {
    direction === 'down' ? setIsPanDisabled(false) : setIsPanDisabled(true)
  })

  const { getRootProps } = useDropzone({
    onDrop: store.actions.handleFileUpload,
  })

  // Don't deselect if the click is on a resize handle,
  // a SelectedCanvasLayer,
  const onDeselectClick = (event) => {
    const { target, which } = event.nativeEvent
    const isClick = which === 1

    const isResizeHandle = event.target.className.includes('ResizeHandle')
    const isSelectedLayer = event.target.className.includes('SelectedCanvasLayer')

    const isDeselectClick = isClick && getCanvasLayer(target)
    !isSelectedLayer && !isResizeHandle && isDeselectClick && store.actions.deselectAllLayers()
  }

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
      {...getRootProps({
        isPanDisabled: isPanDisabled,
        id: 'CanvasContainer',
        onClick: onDeselectClick,
        onMouseUp: onMouseUp,
        onMouseDown: onMouseDown,
      })}
    >
      <TransformWrapper
        defaultScale={0.5}
        scale={0.5}
        defaultPositionX={565}
        defaultPositionY={80}
        {...WRAPPER_PROPS}
        pan={{
          disabled: isPanDisabled,
          lockAxisX: false,
          lockAxisY: false,
          velocityEqualToMove: true,
          velocity: true,
          paddingSize: 200,
        }}
      >
        {(zoomProps) => (
          <ScaleProvider {...zoomProps}>
            <TransformComponent>
              <StyledCanvas id='DocumentCanvas'>
                <EditorCanvasLayers onDeselectClick={onDeselectClick} />
              </StyledCanvas>
            </TransformComponent>
          </ScaleProvider>
        )}
      </TransformWrapper>
    </StyledCanvasContainer>
  )
}
