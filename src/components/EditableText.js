import * as React from 'react'

import { useClicks } from '#utilities/useClicks'

import './styles/EditableText.css'

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
  const spellCheck = props.isEnabled ? 'false' : undefined
  const valueProp = props.isEnabled ? { value: props.value } : { children: props.value }

  // This is specifically for ease of comprehension
  // in `disabled={elementProps.isDisabled}`
  const isDisabled = !props.isEnabled

  const onChange = (event) => {
    props.onChange(event.target.value, event.target.scrollHeight)
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
  const { elementProps, otherProps } = useElementProps(props)
  const textareaRef = React.useRef()
  const pRef = React.useRef()

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
  className: '',
  style: {},
  value: '',

  onClick: (event) => {
    event.preventDefault()
  },
}
