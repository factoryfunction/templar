import * as React from 'react'
import * as Styled from './AssetsTab.styled'

import { Details } from '../../components/Details'
import Icon from '../../components/Icon'
import Spacer from '../../components/Spacer'
import { useSortedAssets } from './hooks/useSortedAssets'
import { AssetFolder } from './AssetFolder'

export const AssetsTab = (props) => {
  const { sortedAssets, assetsStore } = useSortedAssets()

  return (
    <Styled.AssetsTabContainer>
      <Styled.AssetsTabHeaderContainer>
        <Styled.AssetsTabHeaderText>Assets</Styled.AssetsTabHeaderText>
      </Styled.AssetsTabHeaderContainer>
      <Styled.AssetsTabListContainer>
        <For each='keyAndList' of={sortedAssets}>
          <AssetFolder key={keyAndList[0]} assetType={keyAndList[0]} assets={keyAndList[1]} />
        </For>
      </Styled.AssetsTabListContainer>
    </Styled.AssetsTabContainer>
  )
}
