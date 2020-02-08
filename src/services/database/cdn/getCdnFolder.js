import firebase from 'firebase'
import { getCdn } from './getCdn'

export const getCdnFolder = (projectId: string) => {
  const cdn = getCdn()

  const cdnFolder = cdn.child(projectId)
  const images = cdnFolder.child('images')
  const fonts = cdnFolder.child('fonts')

  return {
    images,
    fonts,
  }
}
