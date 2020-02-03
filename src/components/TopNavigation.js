import * as React from 'react'
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem,
} from 'baseui/header-navigation'
import { Button } from 'baseui/button'
import { StatefulMenu } from 'baseui/menu'
import { StatefulPopover, PLACEMENT } from 'baseui/popover'
import { Paragraph3 } from 'baseui/typography'

import { Link } from '#components/Link'

export const TopNavigation = () => {
  return (
    <HeaderNavigation>
      <StyledNavigationList $align={ALIGN.left}>
        <StyledNavigationItem>Templar</StyledNavigationItem>
      </StyledNavigationList>
      <StyledNavigationList $align={ALIGN.center}>
        <StyledNavigationList $align={ALIGN.center}>
          <StyledNavigationItem>
            <Link href='/projects'>Projects</Link>
          </StyledNavigationItem>
          <StyledNavigationItem>
            <Link href='/organizations'>Organizations</Link>
          </StyledNavigationItem>
        </StyledNavigationList>
      </StyledNavigationList>
    </HeaderNavigation>
  )
}
