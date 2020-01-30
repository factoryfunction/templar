import GlobalStylesInjector from '../components/GlobalStylesInjector'

import { AuthStoreProvider } from '../stores/authStore'

import backend from '../utilities/backend'

import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import 'react-power-select/dist/react-power-select.css'

import '../public/styles/templar.css'
import '../public/styles/react-datasheet.css'

const MyApp = (props) => {
  return (
    <AuthStoreProvider>
      <GlobalStylesInjector />
      <props.Component {...props.pageProps} />
    </AuthStoreProvider>
  )
}

export default MyApp
