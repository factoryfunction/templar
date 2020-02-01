import Canvas from '../../../components/editor/Canvas'
import styled from 'styled-components'

import { useEditorAccessCheck } from '../../../components/editor/utilities/useEditorAccessCheck'

import { LeftPanel } from '../../../components/editor/LeftPanel'
import { EditorStore } from '../../../components/editor/utilities/editorStore'
import { windowLocation } from '../../../components/editor/utilities/windowLocation'
import { LoaderTriangle } from './../../../components/LoaderTriangle'

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: var(--day-gray);
  width: 100vw;
  height: 100vh;

  .react-contextmenu--visible {
    border-radius: 3px;
    background: var(--night-white);
    color: var(--night-black);
    padding: 12px;
    padding-top: 0;

    .react-contextmenu-item {
      margin-top: 12px;
      font-size: 14px;
      letter-spacing: 0.5px;
      font-weight: 500;
    }

    .resizeHandle {
      width: 16px;
      height: 16px;
    }
  }
`

const EditorContainer = () => {
  useEditorAccessCheck()

  return (
    <EditorStore.Provider>
      <Editor />
    </EditorStore.Provider>
  )
}

const useEditorState = () => {
  const [loaderVisibility, setLoaderVisibility] = React.useState({ visible: true, opacity: 1 })
  const initializeProject = EditorStore.useStoreActions((actions) => actions.initializeProject)
  const isProjectReady = EditorStore.useStoreState((state) => state.isProjectReady)

  React.useEffect(() => {
    initializeProject(windowLocation.params)
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

const Editor = (props) => {
  const loaderVisibility = useEditorState()

  return (
    <StyledContainer>
      <Canvas />
      <LeftPanel />
      <LoaderTriangle.Overlay {...loaderVisibility} />
    </StyledContainer>
  )
}

export default EditorContainer
