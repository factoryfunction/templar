import { getCdnFolder } from './getCdnFolder'
import { getFileKind } from '#utilities/file/getFileKind'

type UploadFileOptionsT = {
  projectId: string,
  files: UploadingFileT[],
}

export const uploadFiles = async (options: UploadFileOptionsT) => {
  const cdnFolder = getCdnFolder(options.projectId)

  const asyncUploads = options.files.map((file) => {
    const category = `${getFileKind(file)}s`
    return cdnFolder[category].child(file.name).put(file)
  })

  const uploads = await Promise.all(asyncUploads)
  console.log({ uploads })
  return uploads
}
