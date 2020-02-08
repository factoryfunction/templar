import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { useDropzone } from 'react-dropzone'

import { EditorStore } from '#stores/editorStore'
import { ScaleProvider } from '#utilities/useScale'
import { useKeyPress } from '#utilities/useKeyPress'
import { EditorCanvasLayers } from './EditorCanvasLayers'
import { PAN_SCALE_WRAPPER_PROPS } from './consts'

import './styles/index.css'
import { PanAndZoom } from '#components/PanAndZoom'

const useStore = () => {
  const [isPanDisabled, setIsPanDisabled] = React.useState(true)

  // To enable panning, the user must hold down the
  // 'h' key when they click and drag to move the canvas.
  useKeyPress('h', (direction) => {
    direction === 'down' ? setIsPanDisabled(false) : setIsPanDisabled(true)
  })

  const actions = EditorStore.useStoreActions((actions) => ({
    deselectAllLayers: actions.deselectAllLayers,
    onCanvasImageDrop: actions.onCanvasImageDrop,
  }))

  // Don't deselect if the click is on a resize handle,
  // a SelectedCanvasLayer,
  const onDeselectClick = (event) => {
    const { target, which } = event.nativeEvent
    const isClick = which === 1
    const isResizeHandle = event.target.className.includes('RndResizeHandle')
    const isSelectedLayer = event.target.className.includes('SelectedCanvasLayer')

    const isDeselectClick = isClick && getCanvasLayer(target)
    !isSelectedLayer && !isResizeHandle && isDeselectClick && actions.deselectAllLayers()
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

  const style = {
    '--EditorCanvasContainerCursor': isPanDisabled ? 'inherit' : 'grab',
  }

  const { getRootProps } = useDropzone({
    onDrop: actions.onCanvasImageDrop,
  })

  const containerProps = getRootProps({
    isPanDisabled,
    id: 'CanvasContainer',
    onClick: onDeselectClick,
    onMouseUp: onMouseUp,
    onMouseDown: onMouseDown,
    style,
  })

  const panProps = {
    disabled: isPanDisabled,
    lockAxisX: false,
    lockAxisY: false,
    velocityEqualToMove: true,
    velocity: true,
    paddingSize: 200,
  }

  return { actions, isPanDisabled, containerProps, panProps }
}

const getCanvasLayer = (target) => {
  return target.querySelector('[data-is-canvaslayer]')
}

export const EditorCanvas = (props) => {
  const store = useStore()

  return (
    <div styleName='EditorCanvasOuterContainer' {...store.containerProps}>
      <PanAndZoom>
        <div styleName='EditorCanvasContainer' id='DocumentCanvas'>
          <EditorCanvasLayers />
        </div>
      </PanAndZoom>
    </div>
  )
}

export default EditorCanvas
