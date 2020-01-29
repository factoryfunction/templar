import * as React from 'react'

export const useUndo = (state, setter) => {
  const history = React.useRef([])
  const future = React.useRef([])

  const undo = () => {
    // future.current.push(history.current.pop())
    setter(history.current[history.current.length - 1])
  }

  React.useEffect(() => {
    history.current.push(state)
  }, [state])

  return undo
}
