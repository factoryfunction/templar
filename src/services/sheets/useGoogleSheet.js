import * as React from 'react'
import { getGoogleSheet } from '#services/sheets/getGoogleSheet'
// const sheet = useGoogleSheet('1SBePIhWIThoPoWzYt3aNkyqFDU365KqRhhLkypzu_NU')
export const useGoogleSheet = (sheetId) => {
  const [data, setData] = React.useState()

  React.useEffect(() => {
    getGoogleSheet(sheetId).then(setData)
  }, [sheetId])

  return data
}
