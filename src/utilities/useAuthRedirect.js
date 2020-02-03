import * as React from 'react'
import { useRouter } from 'next/router'
import { AuthStore } from '#stores/authStore'

export const useAuthRedirect = () => {
  const router = useRouter()

  const authState = AuthStore.useStoreState((state) => ({
    isAuthenticated: state.isAuthenticated,
  }))

  React.useEffect(() => {
    !authState.isAuthenticated ? router.push(`/logIn`) : router.push('/home')
  }, [authState.isAuthenticated])
}
