import * as React from 'react'
import styled from 'styled-components'

export const ColorSwatch = styled.span`
  width: 60px;
  height: 22px;
  background: ${(props) => props.color};
  position: relative;
`
