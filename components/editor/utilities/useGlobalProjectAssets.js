import * as React from 'react'
import * as storage from '../../../utilities/backend/storage'
import { prepareAssets } from './prepareAssets'

const DEFAULT_STATE = { fonts: [], images: [] }

export const useGlobalProjectAssets = () => {
  const [globalProjectAssets, setGlobalProjectAssets] = React.useState(DEFAULT_STATE)

  const loadAssets = async () => {
    const assets = await storage.getFiles('/global-project-assets')
    const preparedAssets = await prepareAssets(assets)
    setGlobalProjectAssets(preparedAssets)
  }

  React.useEffect(() => {
    loadAssets()
  }, [])

  globalProjectAssets.reload = loadAssets
  return globalProjectAssets
}
