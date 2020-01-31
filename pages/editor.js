import Canvas from '../components/editor/Canvas'
import styled from 'styled-components'

import { useEditorAccessCheck } from '../components/editor/utilities/useEditorAccessCheck'

import { LeftPanel } from '../components/editor/LeftPanel'
import { EditorStore } from '../components/editor/utilities/editorStore'
import { windowLocation } from '../components/editor/utilities/windowLocation'
import Loader from 'react-loader-spinner'

import { SyncLoader } from 'react-spinners'

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

const StyledLoader = styled(SyncLoader)`
  transition: all 1s;
  opacity: 1;
`

const Editor = (props) => {
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

  isProjectReady && console.log('redy!')

  return (
    <StyledContainer>
      <Canvas />
      <LeftPanel />
      <LoaderTriangle {...loaderVisibility} />
    </StyledContainer>
  )
}

const LoaderTriangle = React.memo((props) => {
  return (
    <If condition={props.visible}>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#ececed',
          zIndex: 99999,
          position: 'absolute',
          transition: 'opacity 0.5s',
          opacity: props.opacity,
          top: 0,
          right: 0,
        }}
      >
        <Loader
          type='Triangle'
          color='#000'
          height={100}
          width={100}
          timeout={5000} //3 secs
        />
      </div>
    </If>
  )
})

export default EditorContainer
