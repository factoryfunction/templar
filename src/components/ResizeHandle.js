import * as React from 'react'

import './styles/ResizeHandle.css'

export const ResizeHandle = () => <div styleName='ResizeHandle' className='RndResizeHandle' />

const RESIZE_HANDLE_SELECTED_STYLE = {
  display: 'flex',
  zIndex: 9999,
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

ResizeHandle.selectedHandleStyles = {
  top: RESIZE_HANDLE_SELECTED_STYLE,
  right: RESIZE_HANDLE_SELECTED_STYLE,
  bottom: RESIZE_HANDLE_SELECTED_STYLE,
  left: RESIZE_HANDLE_SELECTED_STYLE,
  topLeft: RESIZE_HANDLE_SELECTED_STYLE,
  topRight: RESIZE_HANDLE_SELECTED_STYLE,
  bottomRight: RESIZE_HANDLE_SELECTED_STYLE,
  bottomLeft: RESIZE_HANDLE_SELECTED_STYLE,
}

ResizeHandle.notSelectedHandleStyles = {
  top: RESIZE_HANDLE_SELECTED_STYLE,
  right: RESIZE_HANDLE_SELECTED_STYLE,
  bottom: RESIZE_HANDLE_SELECTED_STYLE,
  left: RESIZE_HANDLE_SELECTED_STYLE,
  topLeft: RESIZE_HANDLE_SELECTED_STYLE,
  topRight: RESIZE_HANDLE_SELECTED_STYLE,
  bottomRight: RESIZE_HANDLE_SELECTED_STYLE,
  bottomLeft: RESIZE_HANDLE_SELECTED_STYLE,
}

ResizeHandle.getStyle = (isSelected) => {
  return isSelected ? RESIZE_HANDLE_SELECTED_STYLE : RESIZE_HANDLE_NOT_SELECTED_STYLE
}

ResizeHandle.getRndClassName = (props) => {
  return [
    'RndResizeHandle',
    props.isSelected && 'SelectedCanvasLayer',
    props.isEditingText && 'EditingLayerText',
  ].filter(Boolean)
}
