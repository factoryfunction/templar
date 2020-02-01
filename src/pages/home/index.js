import * as React from 'react'
import { useGoogleSheet } from '#services/sheets/useGoogleSheet'

const Home = () => {
  const sheet = useGoogleSheet('1SBePIhWIThoPoWzYt3aNkyqFDU365KqRhhLkypzu_NU')

  return <h1>HOME (got data? {String(!!sheet)})</h1>
}

export default Home
