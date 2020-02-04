import { AuthStore } from '#stores/authStore'

import './templar.css'

const App = ({ Component, pageProps }) => {
  return (
    <AuthStore.Provider>
      <Component {...pageProps} />
    </AuthStore.Provider>
  )
}

export default App
