export const getFileType = (asset) => {
  if (asset.meta.contentType.includes('image')) {
    return 'image'
  }

  if (asset.meta.contentType.includes('octet-stream')) {
    return 'font'
  }
}
