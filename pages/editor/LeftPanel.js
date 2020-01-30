import * as React from 'react'
import * as Styled from './LeftPanel.styled'
import { useTabsState } from './utilities/useTabsState'
import { useStoreState, useStoreActions } from 'easy-peasy'

const useStore = () => {
  const state = useStoreState((state) => ({
    isConfiguringSources: state.isConfiguringSources,
  }))

  const actions = useStoreActions((actions) => ({
    saveProject: actions.saveProject,
  }))

  return { state, actions }
}

export const LeftPanel = (props) => {
  const store = useStore()
  const tabs = useTabsState()

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
          <For each='tabName' of={tabs.tabNames}>
            <Styled.PanelTabLabel
              key={tabName}
              onClick={tabs.onTabLabelClick}
              isActive={tabs.current === tabName}
            >
              <Styled.PanelTabLabelText>{tabName}</Styled.PanelTabLabelText>
            </Styled.PanelTabLabel>
          </For>
        </Styled.PanelTabsContainer>
      </Styled.PanelHeaderContainer>

      <Styled.PanelBody>
        <tabs.ActiveTabView />
      </Styled.PanelBody>
    </Styled.PanelContainer>
  )
}
