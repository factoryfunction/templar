import { useCancellablePromises } from '#utilities/useCancellablePromises'

export const useClicks = ({ onClick, onDoubleClick }) => {
  const api = useCancellablePromises()

  const handleClick = (event) => {
    api.clearPendingPromises()
    const waitForClick = cancellablePromise(delay(275))
    api.appendPendingPromise(waitForClick)

    return waitForClick.promise
      .then(() => {
        api.removePendingPromise(waitForClick)
        onClick(event)
      })
      .catch((errorInfo) => {
        api.removePendingPromise(waitForClick)
        if (!errorInfo.isCanceled) {
          throw errorInfo.error
        }
      })
  }

  const handleDoubleClick = (event) => {
    api.clearPendingPromises()
    onDoubleClick(event)
  }

  return [handleClick, handleDoubleClick]
}
