import * as React from 'react'
import { createContextStore } from '#utilities/createContextStore'

const useStoreCreator = (props) => {
  // React.useEffect(() => {
  //   scale.current = props.scale
  // }, [props.scale])

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     props.resetTransform()
  //   }, 250)
  // }, [])

  return props
}

const [ScaleProvider, useScale, ScaleContext] = createContextStore(useStoreCreator)
export { ScaleProvider, ScaleContext, useScale }
