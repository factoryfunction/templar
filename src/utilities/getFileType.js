export const getFileKind = (file) => {
  if (file.meta.contentType.includes('image')) {
    return 'image'
  }

  if (file.meta.contentType.includes('octet-stream')) {
    return 'font'
  }
}
