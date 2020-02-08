import * as React from 'react'

export const useKeyPress = (key, handler) => {
  const downHandler = (event) => {
    console.log(event.key, event.which)
    if (event.key === key) {
      handler('down', event)
    }
  }

  const upHandler = (event) => {
    if (event.key === key) {
      handler('up', event)
    }
  }

  React.useEffect(() => {
    window.addEventListener('keypress', downHandler)
    window.addEventListener('keyup', upHandler)
    return () => {
      window.removeEventListener('keypress', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  }, [])
}
