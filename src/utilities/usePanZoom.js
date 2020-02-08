import React from 'react'
import { createContextStore, action } from 'easy-peasy'
import { useCanvas } from '#stores/editorStore/useCanvas'

export const usePanZoom = (props) => {
  const canvas = useCanvas()
  const oldX = React.useRef(0)
  const oldY = React.useRef(0)

  const containerRef = React.useRef()
  const canvasRef = React.useRef()

  const onMouseDown = (event) => {
    event.preventDefault()
    if (event.button === 1) {
      oldX.current = event.clientX
      oldY.current = event.clientY
      canvas.setIsPanningEnabled(true)
    }
  }

  const onMouseUp = () => {
    if (event.button === 1) {
      canvas.setIsPanningEnabled(false)
    }
  }

  const onWheel = (e) => {
    if (e.deltaY) {
      const sign = Math.sign(e.deltaY) / 10
      const scale = 1 - sign
      const rect = containerRef.current.getBoundingClientRect()

      canvas.setScale(canvas.scale * scale)
      canvas.setPanX(canvas.panX * scale - (rect.width / 2 - e.clientX + rect.x) * sign)
      canvas.setPanY(
        canvas.panY * scale -
          ((canvasRef.current.offsetHeight * rect.width) / canvasRef.current.offsetWidth / 2 -
            e.clientY +
            rect.y) *
            sign,
      )
    }
  }

  const onMouseMove = (event) => {
    if (canvas.isPanningEnabled) {
      const _oldX = oldX.current
      const _oldY = oldY.current

      canvas.setPanX(canvas.panX + event.clientX - _oldX)
      canvas.setPanY(canvas.panY + event.clientY - _oldY)

      oldX.current = event.clientX
      oldY.current = event.clientY
    }
  }

  const containerStyle = {
    transform: `translate(${canvas.panX}px, ${canvas.panY}px) scale(${canvas.scale})`,
  }

  return {
    isPanning: canvas.isPanningEnabled,
    containerRef,
    canvasRef,
    onMouseDown,
    onMouseUp,
    onMouseMove,
    onWheel,
    containerStyle,
  }
}
