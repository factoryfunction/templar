import * as React from 'react'

export const useKeyPress = (key, handler) => {
  const downHandler = (event) => {
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
    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)
    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  }, [])
}
