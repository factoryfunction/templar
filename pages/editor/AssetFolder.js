import * as React from 'react'
import * as Styled from './AssetFolder.styled'

import { Details } from '../../components/Details'
import Icon from '../../components/Icon'
import Spacer from '../../components/Spacer'

import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu'

export const AssetFolder = (props) => {
  return (
    <Details>
      <Details.Summary>
        <Icon name='folder' size='22px' color='var(--night-gray)' />
        <Spacer size='12px' />
        {props.assetType}s
      </Details.Summary>
      <Details.Contents>
        <AssetList assets={props.assets} />
      </Details.Contents>
    </Details>
  )
}

const AssetList = (props) => {
  return (
    <For each='asset' of={props.assets}>
      <ContextMenuTrigger id={asset.id} posX={-2} posY={64}>
        <Styled.AssetInFolder>{asset.name}</Styled.AssetInFolder>
      </ContextMenuTrigger>
      <ContextMenu id={asset.id}>
        <MenuItem data={{ foo: 'bar' }}>ContextMenu Item 1</MenuItem>
        <MenuItem data={{ foo: 'bar' }}>ContextMenu Item 2</MenuItem>
        <MenuItem divider />
        <MenuItem data={{ foo: 'bar' }}>ContextMenu Item 3</MenuItem>
      </ContextMenu>
    </For>
  )
}
