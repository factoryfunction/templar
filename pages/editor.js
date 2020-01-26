import { observer } from 'mobx-react-lite'

import EditorTopBar from '../components/EditorTopBar'
import LayersPanel from '../components/LayersPanel'
import Canvas from '../components/Canvas'
import layersStore from '../stores/layersStore'
import styled from 'styled-components'

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: var(--editorBackgroundColor);
  width: 100vw;
  height: 100vh;
`

const Editor = () => {
  const layersLength = layersStore.layers.length

  return (
    <StyledContainer>
      <EditorTopBar />
      <Canvas />
      <LayersPanel
        layers={layersStore.layers}
        insertTextLayer={layersStore.insertTextLayer}
        insertImageLayer={layersStore.insertImageLayer}
        insertBlockLayer={layersStore.insertBlockLayer}
        removeLayer={layersStore.removeLayer}
      />
    </StyledContainer>
  )
}

export default observer(Editor)
