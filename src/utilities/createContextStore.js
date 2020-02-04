import * as React from 'react'

export const createContextStore = (useCreator) => {
  const Context = React.createContext()

  const Provider = (props) => {
    const store = useCreator(props)

    return <Context.Provider value={store}>{props.children}</Context.Provider>
  }

  const useStore = () => {
    return React.useContext(Context)
  }

  return [Provider, useStore, Context]
}
