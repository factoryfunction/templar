import { useDropzone } from 'react-dropzone'

export const EditorCanvasImageDropzone = props => {
  const { getRootProps } = useDropzone({
    onDrop: actions.onCanvasImageDrop,
  })

  return (
// stuff
  )
}