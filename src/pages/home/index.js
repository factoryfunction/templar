import * as React from 'react'
import { useRouter } from 'next/router'

// import { useGoogleSheet } from '#services/sheets/useGoogleSheet'
// const sheet = useGoogleSheet('1SBePIhWIThoPoWzYt3aNkyqFDU365KqRhhLkypzu_NU')

const Home = () => {
  const router = useRouter()

  React.useEffect(() => {
    router.push('/root-and-roam-creative-studio/sell-sheet')
  }, [])

  return <h1>HOME</h1>
}

export default Home
