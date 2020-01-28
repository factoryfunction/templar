import * as React from 'react'

export const useActiveTab = () => {
  const [current, setCurrent] = React.useState('Layers')

  const onTabLabelClick = (event) => {
    setCurrent(event.target.innerText)
  }

  return {
    current,
    onTabLabelClick,
  }
}
