import { getFileExtension } from './getFileExtension'
import { FILE_EXTENSION_FILE_KIND_MAP } from './consts'

export const getFileKind = (file) => {
  const extension = getFileExtension(file)
  return FILE_EXTENSION_FILE_KIND_MAP[extension]
}
