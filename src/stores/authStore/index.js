import { persist, action, createContextStore } from 'easy-peasy'

const logIn = action((state, data) => {
  state.user = data.profileObj
  state.token = data.tokenObj
  state.isAuthenticated = true
})

const store = {
  user: null,
  token: null,
  isAuthenticated: false,
  logIn,
}

export const AuthStore = createContextStore(persist(store))
