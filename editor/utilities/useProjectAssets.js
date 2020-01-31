import * as React from 'react'
import { useRouter } from 'next/router'
import * as storage from '../../utilities/backend/storage'
import { prepareAssets } from './prepareAssets'
import { windowLocation } from './windowLocation'

const DEFAULT_STATE = { fonts: [], images: [] }

export const useProjectAssets = () => {
  const [projectAssets, setProjectAssets] = React.useState(DEFAULT_STATE)
  const [isLoading, setIsLoading] = React.useState(true)

  const loadAssets = async () => {
    setIsLoading(true)

    const assets = await storage.getFiles({
      owner: windowLocation.params.owner,
      project: windowLocation.params.project,
    })

    const preparedAssets = await prepareAssets(assets)
    setProjectAssets(preparedAssets)
    setIsLoading(false)
  }

  React.useEffect(() => {
    loadAssets()
  }, [])

  projectAssets.isLoading = isLoading
  projectAssets.loadAssets = loadAssets
  return projectAssets
}
