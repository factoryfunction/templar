import * as React from 'react'
import { SketchPicker } from 'react-color'
import styled from 'styled-components'

export const ColorPicker = (props) => {
  return <SketchPicker width={props.width} color={props.current} onChange={props.onChange} />
}
