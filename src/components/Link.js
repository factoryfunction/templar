import * as React from 'react'
import NextLink from 'next/link'
import { StyledLink } from 'baseui/link'

import './styles/Link.css'

const getClassNames = (props) => {}

export const Link = (props) => {
  return (
    <NextLink href={props.href}>
      <StyledLink className='TemplarLink'>{props.children}</StyledLink>
    </NextLink>
  )
}
