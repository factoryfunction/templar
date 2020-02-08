import * as React from 'react'

import './styles/TextField.css'

const getCssVariables = (props) => {
  return {
    '--TextFieldLabel': `"${props.label}"`,
    '--TextFieldWidth': props.width,
    '--TextFieldUnitMask': `"${props.unitMask}"`,
  }
}

const getInputProps = (props) => {
  const { label, width, ...inputProps } = props
  return inputProps
}

export const TextField = (props) => {
  const cssVariables = getCssVariables(props)
  const inputProps = getInputProps(props)

  return (
    <div styleName='TextField' style={cssVariables}>
      <input styleName='input' {...inputProps} />
    </div>
  )
}

TextField.defaultProps = {
  label: '',
  width: '100%',
  unitMask: '',
}
