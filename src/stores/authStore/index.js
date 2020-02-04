import { persist, action, createContextStore, thunk } from 'easy-peasy'

import backend from '#utilities/backend'

const setUser = action((state, user) => {
  state.user = user
})

const setToken = action((state, token) => {
  state.token = token
})

const setIsAuthenticated = action((state, isAuthenticated) => {
  state.isAuthenticated = isAuthenticated
})

const signIn = thunk((options) => {
  return backend.users.signIn(options)
})

const signOut = thunk(() => {
  return backend.users.signOut()
})

const initializeAuth = thunk(async (actions, options) => {
  backend.users.onUserAuthenticated((user) => {
    setUser(user)
    setToken({ token: '' })
    setIsAuthenticated(true)
  })

  backend.users.onUserNotAuthenticated((user) => {
    setUser(undefined)
    setToken(undefined)
    setIsAuthenticated(false)
  })
})

const store = {
  user: null,
  token: null,
  isAuthenticated: false,
  initializeAuth,
  setIsAuthenticated,
  signIn,
  signOut,
  setUser,
  setToken,
}

export const AuthStore = createContextStore(persist(store), {
  name: 'AuthStore',
})
