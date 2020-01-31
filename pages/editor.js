import Canvas from './editor/Canvas'
import styled from 'styled-components'

import { useEditorAccessCheck } from './editor/utilities/useEditorAccessCheck'

import { LeftPanel } from './editor/LeftPanel'
import { EditorStore } from './editor/utilities/editorStore'
import { windowLocation } from './editor/utilities/windowLocation'

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

const Editor = (props) => {
  const initializeProject = EditorStore.useStoreActions((actions) => actions.initializeProject)

  React.useEffect(() => {
    initializeProject(windowLocation.params)
  }, [])

  return (
    <StyledContainer>
      <Canvas />
      <LeftPanel />
    </StyledContainer>
  )
}

export default EditorContainer
