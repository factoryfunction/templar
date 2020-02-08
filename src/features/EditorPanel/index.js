import * as React from 'react'
import { EditorStore } from '#stores/editorStore'
import * as Styled from './LeftPanel.styled'
import { AssetsTab } from './AssetsTab'
import { SourcesTab } from './SourcesTab'
import { LayersTab } from './LayersTab'
import { HelpTab } from './HelpTab'
import { Button } from '#components/Button'
import { Spacer } from '#components/Spacer'

const tabsMap = {
  Assets: AssetsTab,
  Sources: SourcesTab,
  Layers: LayersTab,
  Help: HelpTab,
}

const useStore = () => {
  const state = EditorStore.useStoreState((state) => ({
    wasProjectRecentlySaved: state.wasProjectRecentlySaved,
    isConfiguringSources: state.isConfiguringSources,
    isWorkbenchExpaneded: state.isWorkbenchExpanded,
    workbenchActiveTab: state.workbenchActiveTab,
    workbenchTabNames: state.workbenchTabNames,
  }))

  const actions = EditorStore.useStoreActions((actions) => ({
    saveProject: actions.saveProject,

    onTabLabelClick: (event) => {
      actions.setWorkbenchActiveTab(event.target.innerText)
    },
  }))

  return { state, actions }
}

export const EditorPanel = (props) => {
  const store = useStore()
  const ActiveTabView = tabsMap[store.state.workbenchActiveTab]

  return (
    <Styled.PanelContainer isConfiguringSources={store.state.isConfiguringSources}>
      <Styled.PanelHeaderContainer>
        <Styled.PanelTitleContainer>
          <Styled.PanelTitleText>
            Workbench <Spacer size='24px' />
            <Choose>
              <When condition={store.state.wasProjectRecentlySaved}>
                <Button convey='success'>Saved!</Button>
              </When>
              <Otherwise>
                <Button onClick={() => store.actions.saveProject()}>Save</Button>
              </Otherwise>
            </Choose>
          </Styled.PanelTitleText>
          <Styled.PanelProjectNameText>sell-sheet</Styled.PanelProjectNameText>
        </Styled.PanelTitleContainer>

        <Styled.PanelTabsContainer>
          <For each='tabName' of={store.state.workbenchTabNames}>
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
