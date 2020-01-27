import GlobalStylesInjector from '../components/GlobalStylesInjector'
import { AssetsStoreProvider } from '../stores/assetsStore'
import { LayersStoreProvider } from '../stores/layersStore'
import 'react-power-select/dist/react-power-select.css'

const MyApp = (props) => {
  return (
    <AssetsStoreProvider>
      <LayersStoreProvider>
        <GlobalStylesInjector />
        <props.Component {...props.pageProps} />
      </LayersStoreProvider>
    </AssetsStoreProvider>
  )
}

export default MyApp
