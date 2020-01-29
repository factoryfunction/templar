import * as React from 'react'
import * as Styled from './LeftPanelView.styled'

export const LeftPanelView = (props) => {
  return (
    <Styled.LeftPanelViewContainer>
      <Styled.LeftPanelViewHeaderContainer>
        <Styled.LeftPanelViewHeaderText>{props.title}</Styled.LeftPanelViewHeaderText>
        <If condition={props.header && typeof props.header === 'function'}>{props.header()}</If>
      </Styled.LeftPanelViewHeaderContainer>
      <Styled.LeftPanelViewBody>{props.children}</Styled.LeftPanelViewBody>
    </Styled.LeftPanelViewContainer>
  )
}
