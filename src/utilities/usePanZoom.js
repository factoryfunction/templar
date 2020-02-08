import React from 'react'
import { createContextStore, action } from 'easy-peasy'
import { useCanvas } from '#stores/editorStore/useCanvas'

export const usePanZoom = (props) => {
  const canvas = useCanvas()

  const [isPanning, setPanning] = React.useState(false)
  const oldX = React.useRef(0)
  const oldY = React.useRef(0)

  const [position, setPosition] = React.useState({
    x: 150,
    y: -745,
    z: 0.5,
  })

  const containerRef = React.useRef()
  const canvasRef = React.useRef()

  React.useEffect(() => {
    canvas.setScale(position.z)
  }, [position.z])

  const onMouseDown = (event) => {
    event.preventDefault()
    console.log(event.button)
    if (event.button === 1) {
      oldX.current = event.clientX
      oldY.current = event.clientY
      setPanning(true)
    }
  }

  const onMouseUp = () => {
    if (event.button === 1) {
      setPanning(false)
    }
  }

  const onWheel = (e) => {
    if (e.deltaY) {
      const sign = Math.sign(e.deltaY) / 10
      const scale = 1 - sign
      const rect = containerRef.current.getBoundingClientRect()

      setPosition({
        ...position,
        x: position.x * scale - (rect.width / 2 - e.clientX + rect.x) * sign,
        y:
          position.y * scale -
          ((canvasRef.current.offsetHeight * rect.width) / canvasRef.current.offsetWidth / 2 -
            e.clientY +
            rect.y) *
            sign,
        z: position.z * scale,
      })
    }
  }

  const onMouseMove = (event) => {
    if (isPanning) {
      const _oldX = oldX.current
      const _oldY = oldY.current

      setPosition({
        ...position,
        x: position.x + event.clientX - _oldX,
        y: position.y + event.clientY - _oldY,
      })

      oldX.current = event.clientX
      oldY.current = event.clientY
    }
  }

  const containerStyle = {
    transform: `translate(${position.x}px, ${position.y}px) scale(${position.z})`,
  }

  return {
    containerRef,
    canvasRef,
    isPanning,
    onMouseDown,
    onMouseUp,
    onMouseMove,
    onWheel,
    containerStyle,
  }
}
