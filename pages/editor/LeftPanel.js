import * as React from 'react'
import * as Styled from './LeftPanel.styled'
import { useTabsState } from './utilities/useTabsState'

export const LeftPanel = (props) => {
  const tabs = useTabsState()

  return (
    <Styled.PanelContainer>
      <Styled.PanelHeaderContainer>
        <Styled.PanelTitleContainer>
          <Styled.PanelTitleText>Workbench</Styled.PanelTitleText>
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
