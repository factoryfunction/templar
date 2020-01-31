import createContextStore from '../../utilities/createContextStore'
import { useProjectAssets } from './useProjectAssets'
import { useGlobalProjectAssets } from './useGlobalProjectAssets'

const useStoreCreator = () => {
  const globalProjectAssets = useGlobalProjectAssets()
  const projectAssets = useProjectAssets()

  const reloadProjectAssets = () => {
    projectAssets.loadAssets()
  }

  return {
    globalProjectAssets,
    projectAssets,
    reloadProjectAssets,
  }
}

const [AssetsProvider, useAssets, AssetsContext] = createContextStore(useStoreCreator)

export { AssetsProvider, AssetsContext }
export default useAssets
