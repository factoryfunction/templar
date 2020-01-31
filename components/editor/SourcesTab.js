import * as React from 'react'
import * as Styled from './SourcesTab.styled'

import { SpreadSheet } from '../SpreadSheet'
import Icon from '../Icon'
import Spacer from '../Spacer'
import { LeftPanelView } from './LeftPanelView'
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu'
import { EditorStore } from './utilities/editorStore'

const useStore = () => {
  const state = EditorStore.useStoreState((state) => ({
    isConfiguringSources: state.isConfiguringSources,
    isSourcesConfigured: state.isSourcesConfigured,
    sources: state.sources,
  }))

  const actions = EditorStore.useStoreActions((actions) => ({
    setIsConfiguringSources: actions.setIsConfiguringSources,
  }))

  return { state, actions }
}

export const SourcesTab = () => {
  const store = useStore()

  return (
    <LeftPanelView title='Sources'>
      <Styled.SourcesTabContainer>
        <Choose>
          <When condition={store.state.isConfiguringSources}>
            <SourcesConfiguration />
          </When>
          <When condition={!store.state.isSourcesConfigured}>
            <p
              style={{ marginTop: 24, color: 'var(--night-gray)' }}
              onClick={() => store.actions.setIsConfiguringSources(true)}
            >
              Click here to configure your project's sources.
            </p>
          </When>
        </Choose>
      </Styled.SourcesTabContainer>
    </LeftPanelView>
  )
}

const EMPTY_CELL = { value: ' ' }

const data = [
  [
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
  ],
  [
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
  ],
  [
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
  ],
  [
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
  ],
  [
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
  ],
  [
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
  ],
  [
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
  ],
  [
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
  ],
  [
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
  ],
  [
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
    EMPTY_CELL,
  ],
]

const useReadyDelay = (delay = 1000) => {
  const [isReady, setIsReady] = React.useState(false)

  React.useEffect(() => {
    setTimeout(() => {
      setIsReady(true)
    }, delay)
  }, [])

  return isReady
}

const SourcesConfiguration = (props) => {
  const isReady = useReadyDelay(1000)

  return (
    <Styled.SourcesConfigurationContainer isReady={isReady}>
      <SpreadSheet
        data={data}
        valueRenderer={(cell) => cell.value}
        onCellsChanged={(changes) => {
          console.log({ changes })
        }}
      />
    </Styled.SourcesConfigurationContainer>
  )
}
