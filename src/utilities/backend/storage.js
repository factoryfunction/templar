import { base } from './Base'
import { getImageData } from '../getImageMetadata'

const getStoragePath = (options) => {
  if (typeof options === 'string') {
    return options
  }

  const folderPath = `/${options.owner}/${options.project}`
  return options.file ? `${folderPath}/${options.file.name}` : folderPath
}

export const uploadFile = async (options) => {
  const storagePath = getStoragePath(options)
  const snapshot = await base.storage.child(storagePath).put(options.file)
  return snapshot
}

export const uploadFiles = async (options) => {
  return await Promise.all(
    options.files.map((file) => {
      return uploadFile({
        ...options,
        file,
      })
    }),
  )
}

export const getUploadsData = async (uploads) => {
  return await Promise.all(
    uploads.map(async (upload) => {
      const url = await upload.ref.getDownloadURL()

      return getImageData({
        filePath: upload.metadata.fullPath,
        fileName: upload.metadata.name,
        fileUrl: url,
      })
    }),
  )
}

export const getFiles = async (options) => {
  const storagePath = getStoragePath(options)
  const { items } = await base.storage.child(storagePath).listAll()

  const final = items.map(async (item) => {
    return {
      name: item.name,
      fullPath: item.fullPath,
      url: await item.getDownloadURL(),
      meta: await item.getMetadata(),
    }
  })

  return Promise.all(final)
}

export const deleteFile = async (options) => {
  const storagePath = getStoragePath(options)

  try {
    const deleteIt = await base.storage.child(storagePath).delete()
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
