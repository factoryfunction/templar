import * as React from 'react'

import { AssetsTab } from '../AssetsTab'
import { LayersTab } from '../LayersTab'
import { SourcesTab } from '../SourcesTab'
import { HelpTab } from '../HelpTab'

const tabNames = ['Assets', 'Layers', 'Sources', 'Help']

const tabsMap = {
  Assets: AssetsTab,
  Layers: LayersTab,
  Sources: SourcesTab,
  Help: HelpTab,
}

export const useTabsState = () => {
  const [current, setCurrent] = React.useState(tabNames[0])

  const onTabLabelClick = (event) => {
    setCurrent(event.target.innerText)
  }

  const ActiveTabView = React.useMemo(() => {
    return tabsMap[current]
  }, [current])

  return {
    current,
    onTabLabelClick,
    ActiveTabView,
    tabNames,
  }
}
