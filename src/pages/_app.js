import React from 'react'
import App from 'next/app'
import { Provider as StyletronProvider } from 'styletron-react'
import { styletron, debug } from '../../styletron'
import { AuthStore } from '../stores/authStore'

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <AuthStore.Provider>
        <StyletronProvider value={styletron} debug={debug} debugAfterHydration>
          <Component {...pageProps} />
        </StyletronProvider>
      </AuthStore.Provider>
    )
  }
}
