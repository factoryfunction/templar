export const getFileExtension = (file) => {
  return file.name.substr(file.name.lastIndexOf('.') + 1)
}
