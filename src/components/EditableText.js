import * as React from 'react'

import './styles/EditableText.css'
import { useClicks } from '#utilities/useClicks'

const PROPS_TO_REMOVE = ['value', 'isEnabled', 'onChange', 'onClick', 'onDoubleClick']

const useElementProps = (props) => {
  // Do nothing on single click. Let parent do its thing.
  const [onSingleClick, onDoubleClick] = useClicks({
    onClick: () => {},
    onDoubleClick: (event) => {
      event.stopPropagation()
      props.onDoubleClick()
    },
  })

  const Element = props.isEnabled ? 'textarea' : 'p'
  const isDisabled = !props.isEnabled
  const valueProp = props.isEnabled ? { value: props.value } : { children: props.value }

  const onChange = (event) => {
    props.onChange(event.target.value)
  }

  const elementProps = {
    onChange,
    valueProp,
    onDoubleClick,
    Element,
    isDisabled,
  }

  const otherProps = Object.entries(props).reduce((final, [key, value]) => {
    final[key] = PROPS_TO_REMOVE.includes(key) ? undefined : value
    return final
  }, {})

  return {
    elementProps,
    otherProps,
  }
}

export const EditableText = (props) => {
  const { elementProps, otherProps } = useElementProps(props)

  return (
    <elementProps.Element
      {...otherProps}
      {...elementProps.valueProp}
      onChange={elementProps.onChange}
      onDoubleClick={elementProps.onDoubleClick}
      disabled={elementProps.isDisabled}
      styleName='EditableText'
    />
  )
}

EditableText.defaultProps = {
  onChange: () => {},
  isEnabled: false,
  style: {},
  value: '',
  onClick: (event) => {
    event.preventDefault()
  },
}
