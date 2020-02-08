import * as React from 'react'
import './styles/Button.css'

const getCssVariables = (props) => {
  return {
    '--ButtonBackgroundColor': `var(--${props.convey})`,
  }
}

export const Button = (props) => {
  const cssVariables = getCssVariables(props)

  return <button styleName='Button' {...props} style={cssVariables} />
}

Button.defaultProps = {
  convey: 'highlight',
}
