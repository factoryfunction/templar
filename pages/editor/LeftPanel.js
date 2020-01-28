import * as React from 'react'
import * as Styled from './LeftPanel.styled'
import { useActiveTab } from './hooks/useActiveTab'
import { AssetsTab } from './AssetsTab'

export const LeftPanel = (props) => {
  const activeTab = useActiveTab()

  return (
    <Styled.PanelContainer>
      <Styled.PanelHeaderContainer>
        <Styled.PanelTitleContainer>
          <Styled.PanelTitleText>Workbench</Styled.PanelTitleText>
          <Styled.PanelProjectNameText>sell-sheet-generator</Styled.PanelProjectNameText>
        </Styled.PanelTitleContainer>

        <Styled.PanelTabsContainer>
          <Styled.PanelTabLabel onClick={activeTab.onTabLabelClick}>
            <Styled.PanelTabLabelText isActive={activeTab.current === 'Assets'}>
              Assets
            </Styled.PanelTabLabelText>
          </Styled.PanelTabLabel>
          <Styled.PanelTabLabel onClick={activeTab.onTabLabelClick}>
            <Styled.PanelTabLabelText isActive={activeTab.current === 'Layers'}>
              Layers
            </Styled.PanelTabLabelText>
          </Styled.PanelTabLabel>
          <Styled.PanelTabLabel onClick={activeTab.onTabLabelClick}>
            <Styled.PanelTabLabelText isActive={activeTab.current === 'Tools'}>
              Tools
            </Styled.PanelTabLabelText>
          </Styled.PanelTabLabel>
          <Styled.PanelTabLabel onClick={activeTab.onTabLabelClick}>
            <Styled.PanelTabLabelText isActive={activeTab.current === 'Sources'}>
              Sources
            </Styled.PanelTabLabelText>
          </Styled.PanelTabLabel>
          <Styled.PanelTabLabel onClick={activeTab.onTabLabelClick}>
            <Styled.PanelTabLabelText isActive={activeTab.current === 'Help'}>
              Help
            </Styled.PanelTabLabelText>
          </Styled.PanelTabLabel>
        </Styled.PanelTabsContainer>
      </Styled.PanelHeaderContainer>

      <Styled.PanelBody>
        <Choose>
          <When condition={activeTab.current === 'Assets'}>
            <AssetsTab />
          </When>
          <When condition={activeTab.current === 'Layers'}>
            <p>Layers</p>
          </When>
          <When condition={activeTab.current === 'Tools'}>
            <p>Tools</p>
          </When>
          <When condition={activeTab.current === 'Sources'}>
            <p>Sources</p>
          </When>
          <When condition={activeTab.current === 'Help'}>
            <p>Help</p>
          </When>
        </Choose>
      </Styled.PanelBody>
    </Styled.PanelContainer>
  )
}
