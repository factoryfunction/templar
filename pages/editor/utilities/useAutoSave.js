import * as React from 'react'
import { useStore, useStoreActions } from 'easy-peasy'
import { base } from '../../../utilities/backend/Base'

const prepareLayersForSave = (layers) => {
  return layers.map((layer) => {
    const asset = layer.imageAsset || layer.fontAsset || {}

    return {
      ...layer,
      imageAsset: undefined,
      imageAssetId: asset.id,
    }
  })
}

export const useAutoSave = (interval = 10000) => {
  const project = useStore()

  React.useEffect(() => {
    const task = setInterval(() => {
      const p = project.getState()
      const layersToSave = prepareLayersForSave((p.layers = []))
      base.updateProjectData('root-and-roam-creative-studio_sell-sheet', (data) => {
        return {
          layers: layersToSave,
          projectId: 'root-and-roam-creative-studio_sell-sheet',
        }
      })
    }, interval)

    return () => clearInterval(task)
  }, [])
}
