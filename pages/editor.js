import Canvas from './editor/Canvas'
import styled from 'styled-components'
import { StoreProvider, useStoreActions } from 'easy-peasy'

import { LayersStoreProvider } from '../stores/layersStore'
import { AssetsProvider } from './editor/utilities/useAssets'
import { useEditorAccessCheck } from './editor/utilities/useEditorAccessCheck'

import { LeftPanel } from './editor/LeftPanel'
import { layersStore } from './editor/utilities/editorStore'
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
    <StoreProvider store={layersStore}>
      <AssetsProvider>
        <LayersStoreProvider>
          <Editor />
        </LayersStoreProvider>
      </AssetsProvider>
    </StoreProvider>
  )
}

const Editor = (props) => {
  const initializeAssets = useStoreActions((actions) => actions.initializeAssets)

  React.useEffect(() => {
    initializeAssets(windowLocation.params)
  }, [])

  return (
    <StyledContainer>
      <Canvas />
      <LeftPanel />
    </StyledContainer>
  )
}

export default EditorContainer
