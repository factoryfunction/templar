import * as React from 'react'
import { usePanZoom } from '#utilities/usePanZoom'

export const PanAndZoom = (props) => {
  const panZoom = usePanZoom()
  return (
    <div
      className='PanZoomContaienr'
      ref={panZoom.containerRef}
      onMouseDown={panZoom.onMouseDown}
      onMouseUp={panZoom.onMouseUp}
      onMouseMove={panZoom.isPanning ? panZoom.onMouseMove : undefined}
      onWheel={panZoom.onWheel}
    >
      <div ref={panZoom.canvasRef} style={panZoom.containerStyle}>
        {props.children}
      </div>
    </div>
  )
}
