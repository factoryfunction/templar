import * as React from 'react'
import { useRouter } from 'next/router'

import backend from '../utilities/backend'
import createContextStore from '../utilities/createContextStore'

const useAuthStoreCreator = () => {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [user, setUser] = React.useState(null)

  const signIn = (options) => {
    return backend.users.signIn(options)
  }

  const signOut = () => {
    return backend.users.signOut()
  }

  React.useEffect(() => {
    backend.users.onUserAuthenticated((user) => {
      setIsLoggedIn(true)
      setUser(user)
    })

    backend.users.onUserNotAuthenticated((user) => {
      setIsLoggedIn(!!user)
      setUser(undefined)
    })
  }, [])

  React.useEffect(() => {
    isLoggedIn && router.push('/editor?owner=root-and-roam-creative-studio&project=sell-sheet')
  }, [isLoggedIn])

  return {
    backend,
    signIn,
    signOut,
    user,
  }
}

const [AuthStoreProvider, useAuthStore, AuthStoreContext] = createContextStore(
  useAuthStoreCreator,
)
export { AuthStoreProvider, AuthStoreContext }
export default useAuthStore
