import EditorTopBar from '../components/EditorTopBar'
import LayersPanel from '../components/LayersPanel'
import Canvas from '../components/Canvas'
import styled from 'styled-components'
import Spacer from '../components/Spacer'
import { AssetsPanel } from '../components/AssetsPanel'

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: var(--editorBackgroundColor);
  width: 100vw;
  height: 100vh;
`

const StyledPanelContainer = styled.div`
  width: 320px;
  max-height: calc(100vh - 40px);
  height: calc(100vh - 40px);
  background: var(--white);
  border-left: 1px solid var(--whiteBorderColor);
  position: fixed;
  top: 48px;
  right: 0px;
`

const StyledPanelTitlesContainer = styled.div`
  width: 100%;
  height: 40px;
  min-height: 40px;
  padding-left: 16px;
  display: flex;
  align-items: center;
  user-select: none;
`

const StyledPanelTitle = styled.p`
  font-family: var(--monoFont);
  color: var(${(props) => (props.isOpen ? '--mainTextColor' : '--subTextColor')});
  font-size: 14px;
  cursor: pointer;
`

const Editor = () => {
  return (
    <StyledContainer>
      <EditorTopBar />
      <Canvas />
      <Panels />
    </StyledContainer>
  )
}

const Panels = (props) => {
  const [panelState, setPanelState] = React.useState({
    open: 'layers',
  })

  const setOpenPanel = React.useCallback(
    (which) => {
      if (which !== panelState.open) {
        setPanelState((oldState) => {
          return {
            ...oldState,
            open: which,
          }
        })
      }
    },
    [panelState.open],
  )

  return (
    <StyledPanelContainer>
      <PanelTitles openPanel={panelState.open} setOpenPanel={setOpenPanel} />
      <Choose>
        <When condition={panelState.open === 'layers'}>
          <LayersPanel />
        </When>
        <When condition={panelState.open === 'assets'}>
          <AssetsPanel />
        </When>
      </Choose>
    </StyledPanelContainer>
  )
}

const PanelTitles = (props) => {
  return (
    <StyledPanelTitlesContainer>
      <StyledPanelTitle isOpen={props.openPanel === 'layers'} onClick={() => props.setOpenPanel('layers')}>
        Layers
      </StyledPanelTitle>
      <Spacer size='24px' />
      <StyledPanelTitle isOpen={props.openPanel === 'assets'} onClick={() => props.setOpenPanel('assets')}>
        Assets
      </StyledPanelTitle>
    </StyledPanelTitlesContainer>
  )
}

export default Editor
