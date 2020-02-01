import { AuthStore } from '../stores/authStore'
import { useRouter } from 'next/router'

const App = ({ Component, pageProps }) => {
  return (
    <AuthStore.Provider>
      <AuthRouter>
        <Component {...pageProps} />
      </AuthRouter>
    </AuthStore.Provider>
  )
}

// Get the route that the user requested. If they are not
// logged in, send them to logIn and once they do log in,
// forward them to the route that they originally requested.
const AuthRouter = (props) => {
  const router = useRouter()
  const landingRoute = React.useRef(router.asPath)

  const authState = AuthStore.useStoreState((state) => ({
    isAuthenticated: state.isAuthenticated,
  }))

  React.useEffect(() => {
    !authState.isAuthenticated ? router.push(`/logIn`) : router.replace(landingRoute.current)
  }, [authState.isAuthenticated])

  return props.children
}

export default App
