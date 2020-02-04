import { useEffect, useRef } from 'react'

const getPropsDifference = (oldProps, newProps) => {
  const allKeys = Object.keys({ ...oldProps, ...newProps })

  return allKeys.reduce((final, key) => {
    const oldValue = oldProps[key]
    const newValue = newProps[key]
    const valuesAreDifferent = oldValue !== newValue
    valuesAreDifferent && final.push([key, { oldValue, newValue }])
    return final
  }, [])
}

const handleDiffsAndNotifications = (componentName, oldProps, newProps) => {
  const diffs = getPropsDifference(oldProps, newProps)

  if (diffs.length) {
    console.groupCollapsed(`${componentName} updated because...`)
    console.log(diffs)
    console.log(`renderId: ${getRenderId()}`)
  }
}

const setUpRenderDiffLog = () => {
  let currentRenderId = 0
  const diffs = new Map()

  const addRenderDiff = (diff) => {
    diffs.add([currentRenderId++, diff])
  }

  global._renderDiffLog = {
    addRenderDiff,
    diffs,
  }
}

export const useWhyDidYouUpdate = (componentName, newProps) => {
  const propsRef = useRef()

  useEffect(() => {
    !global._renderDiffLog && setUpRenderDiffLog()
    const oldProps = propsRef.current
    handleDiffsAndNotifications(componentName, oldProps, newProps)
    propsRef.current = newProps
  })
}
