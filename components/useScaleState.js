import * as React from 'react'

import createContextStore from '../utilities/createContextStore'

const useStoreCreator = (props) => {
  const scale = React.useRef(props.scale)

  React.useEffect(() => {
    scale.current = props.scale
  }, [props.scale])

  return scale.current
}

const [ScaleProvider, useScale, ScaleContext] = createContextStore(useStoreCreator)

export { ScaleProvider, ScaleContext }
export default useScale
