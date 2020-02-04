import * as React from 'react'

import './styles/ResizeHandle.css'

export const ResizeHandle = () => <div styleName='ResizeHandle' className='RndResizeHandle' />

const RESIZE_HANDLE_SELECTED_STYLE = {
  display: 'inherit',
}

const RESIZE_HANDLE_NOT_SELECTED_STYLE = {
  display: 'none',
}

ResizeHandle.selectedComponents = {
  topLeft: ResizeHandle(),
  topRight: ResizeHandle(),
  bottomRight: ResizeHandle(),
  bottomLeft: ResizeHandle(),
}

ResizeHandle.notSelectedComponents = {
  topLeft: null,
  topRight: null,
  bottomRight: null,
  bottomLeft: null,
}

ResizeHandle.getStyle = (isSelected) => {
  return isSelected ? RESIZE_HANDLE_SELECTED_STYLE : RESIZE_HANDLE_NOT_SELECTED_STYLE
}

ResizeHandle.getRndClassName = (isSelected) => {
  return isSelected ? `RndResizeHandle SelectedCanvasLayer` : 'RndResizeHandle'
}
