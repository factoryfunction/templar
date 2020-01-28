import LayersPanel from '../components/LayersPanel'
import Canvas from '../components/Canvas'
import styled from 'styled-components'
import Spacer from '../components/Spacer'
import { AssetsPanel } from '../components/AssetsPanel'

import { LeftPanel } from './editor/LeftPanel'

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: var(--day-gray);
  width: 100vw;
  height: 100vh;

  .react-contextmenu--visible {
    border-radius: 4px;
    background: var(--night-white);
    color: var(--night-black);
    padding: 12px;
    padding-top: 0;

    .react-contextmenu-item {
      margin-top: 12px;
    }
  }
`

const StyledPanelContainer = styled.div`
  width: 320px;
  max-height: calc(90vh - 80px);
  height: calc(90vh - 80px);
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
  /* padding: 0 16px; */
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  user-select: none;
  background: #12011d24;
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
      <Canvas />
      <Panels />
      <LeftPanel />
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
        <When condition={panelState.open === 'options'}>
          {/* <AssetsPanel /> */}
          {/* <AssetsPanel /> */}
        </When>
      </Choose>
    </StyledPanelContainer>
  )
}

const PanelTitles = (props) => {
  return (
    <StyledPanelTitlesContainer>
      <StyledPanelTitle
        isOpen={props.openPanel === 'layers'}
        onClick={() => props.setOpenPanel('layers')}
      >
        Layers
      </StyledPanelTitle>
      <StyledPanelTitle
        isOpen={props.openPanel === 'assets'}
        onClick={() => props.setOpenPanel('assets')}
      >
        Assets
      </StyledPanelTitle>
      <StyledPanelTitle
        isOpen={props.openPanel === 'options'}
        onClick={() => props.setOpenPanel('options')}
      >
        Options
      </StyledPanelTitle>
    </StyledPanelTitlesContainer>
  )
}

export default Editor
