import * as React from 'react'
import { getGoogleSheet } from '#services/sheets/getGoogleSheet'

export const useGoogleSheet = (sheetId) => {
  const [data, setData] = React.useState()

  React.useEffect(() => {
    getGoogleSheet(sheetId).then(setData)
  }, [sheetId])

  return data
}
