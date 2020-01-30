import * as React from 'react'

import { AssetsTab } from '../AssetsTab'
import { LayersTab } from '../LayersTab'
import { SourcesTab } from '../SourcesTab'
import { HelpTab } from '../HelpTab'
import { useStoreState, useStoreActions } from 'easy-peasy'

const tabNames = ['Assets', 'Sources', 'Layers', 'Help']

const tabsMap = {
  Assets: AssetsTab,
  Sources: SourcesTab,
  Layers: LayersTab,
  Help: HelpTab,
}

const useStore = () => {
  const state = useStoreState((state) => ({
    isConfiguringSources: state.isConfiguringSources,
  }))

  const actions = useStoreActions((actions) => ({
    onNavigateAwayFromSourcesTab: () => actions.setIsConfiguringSources(false),
  }))

  return { state, actions }
}

export const useTabsState = () => {
  const store = useStore()
  const [current, setCurrent] = React.useState(tabNames[0])

  const onTabLabelClick = (event) => {
    if (store.state.isConfiguringSources && event.target.innerText !== 'Sources') {
      store.actions.onNavigateAwayFromSourcesTab()
    }

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
