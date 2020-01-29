import * as React from 'react'
import { FilePond, registerPlugin } from 'react-filepond'

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

export const Uploader = (props) => {
  const [files, setFiles] = React.useState([])
  const filepondRef = React.useRef()

  const onFilepondInit = () => {
    console.log('FilePond instance has initialised', filepondRef.current)
  }

  return (
    <FilePond
      ref={filepondRef}
      files={files}
      allowMultiple={true}
      maxFiles={20}
      server='/api'
      oninit={onFilepondInit}
      onupdatefiles={(fileItems) => {
        this.setState({
          files: fileItems.map((fileItem) => fileItem.file),
        })
      }}
    />
  )
}
