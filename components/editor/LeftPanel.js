import * as React from 'react'
import * as Styled from './LeftPanel.styled'
import { EditorStore } from './utilities/editorStore'
import { AssetsTab } from './AssetsTab'
import { SourcesTab } from './SourcesTab'
import { LayersTab } from './LayersTab'
import { HelpTab } from './HelpTab'

const tabNames = ['Assets', 'Sources', 'Layers', 'Help']

const tabsMap = {
  Assets: AssetsTab,
  Sources: SourcesTab,
  Layers: LayersTab,
  Help: HelpTab,
}

const useStore = () => {
  const state = EditorStore.useStoreState((state) => ({
    isConfiguringSources: state.isConfiguringSources,
    isWorkbenchExpaneded: state.isWorkbenchExpanded,
    workbenchActiveTab: state.workbenchActiveTab,
  }))

  const actions = EditorStore.useStoreActions((actions) => ({
    saveProject: actions.saveProject,

    onTabLabelClick: (event) => {
      const isSourcesTab = event.target.innerText == 'Sources'
      !isSourcesTab && actions.setIsConfiguringSources(false)
      actions.setWorkbenchActiveTab(event.target.innerText)
    },
  }))

  return { state, actions }
}

export const LeftPanel = (props) => {
  const store = useStore()
  const ActiveTabView = tabsMap[store.state.workbenchActiveTab]

  return (
    <Styled.PanelContainer isConfiguringSources={store.state.isConfiguringSources}>
      <Styled.PanelHeaderContainer>
        <Styled.PanelTitleContainer>
          <Styled.PanelTitleText>
            Workbench{' '}
            <small
              style={{ fontSize: 14, fontWeight: 400, marginLeft: 24 }}
              onClick={() => store.actions.saveProject()}
            >
              save
            </small>
          </Styled.PanelTitleText>
          <Styled.PanelProjectNameText>sell-sheet</Styled.PanelProjectNameText>
        </Styled.PanelTitleContainer>

        <Styled.PanelTabsContainer>
          <For each='tabName' of={tabNames}>
            <Styled.PanelTabLabel
              key={tabName}
              onClick={store.actions.onTabLabelClick}
              isActive={store.state.workbenchActiveTab === tabName}
            >
              <Styled.PanelTabLabelText>{tabName}</Styled.PanelTabLabelText>
            </Styled.PanelTabLabel>
          </For>
        </Styled.PanelTabsContainer>
      </Styled.PanelHeaderContainer>

      <Styled.PanelBody>
        <ActiveTabView />
      </Styled.PanelBody>
    </Styled.PanelContainer>
  )
}