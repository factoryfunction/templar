import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { useKeyPress } from '#utilities/useKeyPress'
import { useCanvas } from '#stores/editorStore/useCanvas'
import { createContextStore } from 'easy-peasy'

import { usePanZoom } from '#utilities/usePanZoom'
import './styles/PanZoom.css'

export const PanZoom = (props) => {
  const containerRef = React.useRef()
  const oldX = React.useRef(0)
  const oldY = React.useRef(0)
  const canvas = useCanvas()

  const onMouseDown = (event) => {
    console.log(event.button, event.which)
    if (event.button === 1) {
      canvas.setIsPanningEnabled(true)
      oldX.current = event.clientX
      oldY.current = event.clientY
    }
  }

  const onMouseUp = (event) => {
    if (event.button === 1) {
      canvas.setIsPanningEnabled(false)
    }
  }

  const onWheel = (event) => {
    const scrollDirection = getScrollDirection(event)
    const scale = getNewScale(scrollDirection, canvas.scale)
    canvas.setScale(scale)
  }

  const onMouseMove = (event) => {
    if (canvas.isPanningEnabled) {
      canvas.setPanX(canvas.panX + event.clientX - oldX.current)
      canvas.setPanY(canvas.panY + event.clientY - oldY.current)
      oldX.current = event.clientX
      oldY.current = event.clientY
    }
  }

  const canvasStyles = { transform: getCanvasTransform(canvas.panX, canvas.panY, canvas.scale) }

  return (
    <div
      styleName='PanZoom'
      ref={containerRef}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      onMouseDown={onMouseDown}
      onWheel={onWheel}
    >
      <div styleName='Canvas' style={canvasStyles}>
        {props.children}
      </div>
    </div>
  )
}

const getScrollDirection = (event) => {
  return event.deltaY > 0 ? 'out' : 'in'
}

const getNewScale = (scrollDirection, currentScale) => {
  return scrollDirection === 'in' ? currentScale + 0.1 : currentScale - 0.1
}

const getCanvasTransform = (x, y, z) => {
  return `translate(${x}px, ${y}px) scale(${z})`
}
