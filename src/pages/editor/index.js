import { EditorStore } from '#stores/editorStore'
import { windowLocation } from '#utilities/windowLocation'
import { LoaderTriangle } from '#components/LoaderTriangle'

import './editor.css'
import dynamic from 'next/dynamic'

const EditorCanvas = dynamic(() => import('../../features/EditorCanvas'))
const EditorPanel = dynamic(() => import('../../features/EditorPanel'))

// This funky hook is used to ease the state changes from the project
// not being ready to being ready. It makes the loading indicator
// fade out and not be abrupt.
const useEditorState = () => {
  const [loaderVisibility, setLoaderVisibility] = React.useState({ visible: true, opacity: 1 })
  const initializeProject = EditorStore.useStoreActions((actions) => actions.initializeProject)
  const isProjectReady = EditorStore.useStoreState((state) => state.isProjectReady)

  React.useEffect(() => {
    initializeProject([windowLocation.params.projectId])
  }, [])

  React.useEffect(() => {
    if (isProjectReady) {
      setTimeout(() => {
        setLoaderVisibility({ visible: true, opacity: 0 })
        setTimeout(() => {
          setLoaderVisibility({ visible: false, opacity: 0 })
        }, 500)
      }, 500)
    }
  }, [isProjectReady])

  return loaderVisibility
}

const EditorContainer = () => {
  return (
    <EditorStore.Provider>
      <Editor />
    </EditorStore.Provider>
  )
}

const Editor = (props) => {
  const loaderVisibility = useEditorState()

  return (
    <div className='yolo' styleName='Editor'>
      <EditorCanvas />
      <EditorPanel />
      <LoaderTriangle.Overlay {...loaderVisibility} />
    </div>
  )
}

export default EditorContainer
