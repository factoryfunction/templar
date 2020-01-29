import * as React from 'react'
import nanoid from 'nanoid'
import arrayMove from 'array-move'
import { useFiler } from 'crooks'

const idMatches = (id) => (object) => {
  return object.id === id
}

const idDoesNotMatch = (id) => (object) => {
  return object.id !== id
}

const getFilerData = (filer) => {
  return Object.values(filer).map((file) => {
    return file.data
  })
}

const useFamiliarObjectArray = (defaultArray = [], filerKey) => {
  const [filer, filerActions] = useFiler(filerKey)
  const [list, setArray] = React.useState([...defaultArray, ...getFilerData(filer)])

  const getOneById = (id) => {
    const object = list.find(idMatches(id))
    return object
  }

  const addOne = React.useCallback((object) => {
    const newObject = { ...object, id: object.id || nanoid() }
    newObject.canFile && filerActions.add(newObject, newObject.id)

    setArray((oldArray) => {
      return [...oldArray, newObject]
    })

    return newObject
  }, [])

  const removeOne = React.useCallback((id) => {
    filerActions.remove(id)
    setArray((oldArray) => {
      return oldArray.filter(idDoesNotMatch(id))
    })
  }, [])

  const updateOne = React.useCallback((id, handler) => {
    setArray((oldArray) => {
      return oldArray.map((object) => {
        return object.id === id ? handler(object) : object
      })
    })
  }, [])

  const updateAll = React.useCallback((handler) => {
    setArray((oldArray) => {
      return oldArray.map((object) => {
        return handler(object)
      })
    })
  }, [])

  const repositionOne = React.useCallback((id, newIndex) => {
    setArray((oldArray) => {
      const oldIndex = oldArray.findIndex(idMatches(id))
      return arrayMove(oldArray, oldIndex, newIndex)
    })
  }, [])

  React.useEffect(() => {
    list.map((object) => {
      object.canFile && filerActions.update(object.id, object)
    })
  }, [list])

  const replaceState = (state) => {
    setArray(state)
  }

  return {
    list,
    addOne,
    removeOne,
    updateOne,
    updateAll,
    getOneById,
    repositionOne,
    replaceState,
  }
}

export default useFamiliarObjectArray
