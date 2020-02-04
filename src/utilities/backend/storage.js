import { base } from './Base'

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
