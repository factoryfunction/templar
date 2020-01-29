import Canvas from '../components/Canvas'
import styled from 'styled-components'

import { LayersStoreProvider } from '../stores/layersStore'
import { AssetsProvider } from './editor/utilities/useAssets'
import { useEditorAccessCheck } from './editor/utilities/useEditorAccessCheck'

import { LeftPanel } from './editor/LeftPanel'

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

const Editor = () => {
  useEditorAccessCheck()

  return (
    <AssetsProvider>
      <LayersStoreProvider>
        <StyledContainer>
          <Canvas />
          <LeftPanel />
        </StyledContainer>
      </LayersStoreProvider>
    </AssetsProvider>
  )
}

export default Editor
