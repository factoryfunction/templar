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

  const cleanItems = []

  for (const item of items) {
    cleanItems.push({
      name: item.name,
      fullPath: item.fullPath,
      url: await item.getDownloadURL(),
      meta: await item.getMetadata(),
    })
  }

  return cleanItems
}
