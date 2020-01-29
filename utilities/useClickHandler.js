import * as React from 'react'

const useClickHandler = (query, handler) => {
  const _handler = typeof query === 'string' ? handler : query

  React.useEffect(() => {
    const target = typeof query === 'string' ? document.querySelector(query) : document

    target.addEventListener('click', handler)

    return () => {
      target.removeEventListener('click', handler)
    }
  }, [query])
}

export default useClickHandler
