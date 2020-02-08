export const createPropsDiffer = (oldProps, newProps) => (propNames, shouldLog) => {
  let isDifference = false

  for (const propName of propNames) {
    if (oldProps[propName] !== newProps[propName]) {
      isDifference = true

      shouldLog &&
        process.env.NODE_ENV === 'development' &&
        console.warn(`[differ] ${propName} changed:`, {
          propName,
          old: oldProps[propName],
          new: newProps[propName],
        })
    }
  }

  return isDifference
}
