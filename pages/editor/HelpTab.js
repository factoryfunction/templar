import * as React from 'react'
import * as Styled from './AssetsTab.styled'

import Icon from '../../components/Icon'
import Spacer from '../../components/Spacer'
import { LeftPanelView } from './LeftPanelView'
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu'
import useAssets from './utilities/useAssets'

export const HelpTab = () => {
  const assets = useAssets()

  return (
    <LeftPanelView title='Help'>
      {/*  */}
      {/*  */}
    </LeftPanelView>
  )
}
