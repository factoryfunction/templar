import { useDropzone } from 'react-dropzone'
import useAssets from './useAssets'
import { windowLocation } from './windowLocation'
import * as storage from '../../../utilities/backend/storage'

export const useProjectAssetsDropzone = () => {
  const assets = useAssets()

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (acceptedFiles) => {
      for (const file of acceptedFiles) {
        await storage.uploadFile({
          ...windowLocation.params,
          file,
        })
      }

      assets.reloadProjectAssets()
    },
  })

  return {
    getRootProps,
    getInputProps,
  }
}
