import { getFileExtension } from './getFileExtension'
import { FILE_EXTENSION_MIME_TYPE_MAP } from './consts'

export const getFileMimeType = (file) => {
  const extension = getFileExtension(file)
  return FILE_EXTENSION_MIME_TYPE_MAP[extension]
}
