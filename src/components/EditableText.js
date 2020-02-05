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
  const spellCheck = props.isEnabled ? 'false' : undefined

  const onChange = (event) => {
    props.onChange(event.target.value)
  }

  const elementProps = {
    onChange,
    valueProp,
    onDoubleClick,
    Element,
    isDisabled,
    spellCheck,
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
  const pRef = React.useRef()
  const textareaRef = React.useRef()
  const { elementProps, otherProps } = useElementProps(props)

  React.useEffect(() => {
    if (!elementProps.isDisabled) {
      const length = elementProps.valueProp.value.length
      textareaRef.current.focus()
      textareaRef.current.setSelectionRange(length, length)
    }
  }, [elementProps.isDisabled])

  return (
    <elementProps.Element
      {...otherProps}
      {...elementProps.valueProp}
      onChange={elementProps.onChange}
      disabled={elementProps.isDisabled}
      spellCheck={elementProps.spellCheck}
      onDoubleClick={elementProps.onDoubleClick}
      ref={elementProps.isDisabled ? pRef : textareaRef}
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
