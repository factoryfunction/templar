import * as React from 'react'
import * as Styled from './AssetsTab.styled'

import Icon from '../Icon'
import Spacer from '../Spacer'
import { LeftPanelView } from './LeftPanelView'
import styled from 'styled-components'

const SectionTitle = styled.h5`
  font-family: var(--monoFont);
  font-size: 18px;
  letter-spacing: 0.5px;
`

const SectionContainer = styled.div`
  width: 100%;
  padding: 0 36px 36px;
  display: flex;
  flex-direction: column;
`

const HelpParagraph = styled.p`
  padding: 12px 12px;
  color: var(--night-gray);
`

export const HelpTab = () => {
  return (
    <LeftPanelView title='Help'>
      <SectionContainer>
        <SectionTitle>Navigating your document.</SectionTitle>
        <HelpParagraph>
          You can click and hold your mouse wheel to pan (reposition) the document on the canvas,
          or, if you don't have a mouse wheel, pressing the 'h' key will allow you to click and
          drag the document to the position that you like on the canvas, as well.
        </HelpParagraph>

        <HelpParagraph>
          Using your mouse wheel (or, on some laptops, scrolling by using two fingers on the
          touchpad) you can zoom in and out of your document to get a better look at the section
          you are working on.
        </HelpParagraph>
      </SectionContainer>
    </LeftPanelView>
  )
}
