import * as React from 'react'

import { useIsAuthenticated } from '#utilities/useIsAuthenticated'
import Home from '#pages/home'
import LogIn from '#pages/logIn'

const Index = () => {
  const isAuthenticated = useIsAuthenticated()

  return (
    <Choose>
      <When condition={isAuthenticated}>
        <Home />
      </When>
      <Otherwise>
        <LogIn />
      </Otherwise>
    </Choose>
  )
}

export default Index
