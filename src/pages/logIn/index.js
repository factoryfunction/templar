import * as React from 'react'
import { GoogleLogin } from 'react-google-login'
import { useRouter } from 'next/router'

import { AuthStore } from '../../stores/authStore'

const useStore = () => {
  const router = useRouter()

  const authActions = AuthStore.useStoreActions((actions) => ({
    logIn: actions.logIn,
  }))

  const onLogInSuccess = (data) => {
    authActions.logIn(data)
  }

  const onLogInFailure = (data) => {
    throw new Error('FAILED TO LOG IN', data)
  }

  return {
    onLogInSuccess,
    onLogInFailure,
  }
}

const LogIn = (props) => {
  const store = useStore()

  return (
    <GoogleLogin
      clientId={process.env.GOOGLE_AUTH_CLIENT_ID}
      buttonText='Login'
      onSuccess={store.onLogInSuccess}
      onFailure={store.onLogInFailure}
      cookiePolicy={'single_host_origin'}
    />
  )
}

export default LogIn
