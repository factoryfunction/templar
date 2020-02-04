import * as React from 'react'
import { useRouter } from 'next/router'

import { AuthStore } from '#stores/authStore'

const useStore = () => {
  const router = useRouter()

  const authStore = AuthStore.useStoreState((state) => ({
    isAuthenticated: state.isAuthenticated,
  }))

  const authActions = AuthStore.useStoreActions((actions) => ({
    signIn: () => actions.signIn('colshacol@gmail.com', 'Mellow122093'),
  }))

  React.useEffect(() => {
    if (authStore.isAuthenticated) {
      router.push('/')
    }
  }, [authStore.isAuthenticated])

  return {
    authActions,
  }
}

const LogIn = () => {
  const store = useStore()

  return <button onClick={store.authActions.signIn}>SIGN IN</button>
}

export default LogIn
