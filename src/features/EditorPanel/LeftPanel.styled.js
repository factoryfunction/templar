import styled, { css } from 'styled-components'

export const PanelContainer = styled.div`
  background: var(--night-black);
  transform: var(--paneTransform);
  height: 100%;
  display: flex;
  flex-direction: column;
  z-index: 20;
  position: absolute;
  border-radius: 0 3px 3px 0;
  box-shadow: var(--boxShadow0);
  transition: all 0.35s;
  left: 0px;
  bottom: 0px;
  color: var(--night-white);
  width: ${(props) => (props.isConfiguringSources ? '100%' : '520px')};
  max-height: ${(props) => (props.isConfiguringSources ? '100%' : 'calc(100vh - 144px)')};
  top: ${(props) => (props.isConfiguringSources ? '0px' : '80px')};
  border-radius: ${(props) => (props.isConfiguringSources ? '0px' : '0 3px 3px 0')};
`

export const PanelHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 157px;
  width: 100%;
`

export const PanelTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 36px 32px 0px;
`

export const PanelTitleText = styled.h3`
  font-family: var(--mainFont);
  display: flex;
  height: 36px;
  line-height: 30px;
  font-weight: 600;
  font-size: 28px;
`

export const PanelProjectNameText = styled.p`
  margin-bottom: 16px;
  margin-left: 4px;
  font-family: var(--monoFont);
  font-size: 12px;
  color: var(--night-gray);
  font-weight: 400;

  &:before {
    content: 'project: ';
  }
`

export const PanelTabLabelText = styled.p`
  font-family: var(--mainFont);
  letter-spacing: 0.5px;
  font-weight: 600;
  font-size: inherit;

  &:hover {
    color: var(--secondary);

    &:after {
      color: var(--secondary);
    }
  }
`

export const PanelTabLabel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 0px;
  padding-right: 40px;
  cursor: pointer;
  position: relative;

  ${(props) => (props.isActive ? activeTabStyles : inactiveTabStyles)};

  &:hover {
    color: var(--secondary);

    &:after {
      color: var(--secondary);
    }
  }
`

export const PanelTabsContainer = styled.div`
  display: flex;
  height: 32px;
  padding: 0 32px;
  border-bottom: 1px solid #201e2d;
`

const activeTabStyles = css`
  font-size: 12px;
  color: var(--night-white);

  &::after {
    color: var(--secondary);
    display: ${(props) => (props.isActive ? 'inline' : 'none')};
    font-size: 20px;
    position: absolute;
    content: ' \\25CF';
    bottom: -11px;
    left: 18%;
  }
`

const inactiveTabStyles = css`
  font-size: 12px;
  color: var(--night-gray);
`

export const PanelBody = styled.div`
  width: 100%;
  height: calc(100% - 40px);
  max-height: calc(100% - 40px);
  overflow: auto;
  overflow-y: scroll;
  padding-bottom: 36px;
`
