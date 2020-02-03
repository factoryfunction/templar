import * as React from 'react'
import { AuthStore } from '#stores/authStore'

export const useIsAuthenticated = () => {
  return AuthStore.useStoreState((state) => state.isAuthenticated)
}
