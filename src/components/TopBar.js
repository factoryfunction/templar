import * as React from 'react'
import './styles/TopBar.css'

export const TopBar = (props) => {
  const { children, className, ...otherProps } = props
  return (
    <div styleName='TopBar' {...otherProps} className={className}>
      {children}
    </div>
  )
}
