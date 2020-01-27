// import * as React from 'react'
// import { AuthpackProvider } from '@authpack/react'
// import createContextStore from '../utilities/createContextStore'

// const useAuthPack = async (initOptions) => {
//   const { AuthPack } = require('@authpack/sdk')
//   const [authPack, setAuthPack] = React.useState()

//   React.useEffect(() => {
//     setAuthPack(window.authPack)
//   }, [])

//   return {
//     AuthPack,
//     authPack,
//   }
// }

// const useStoreCreator = () => {
//   const [user, setUser] = React.useState()
//   const { AuthPack, authPack } = useAuthPack()

//   return {
//     user,
//     authPack,
//     AuthPack,
//   }
// }

// const [_UserStoreProvider, useUserStore, UserStoreContext] = createContextStore(useStoreCreator)
// export { UserStoreContext }
// export default useUserStore

// export const UserStoreProvider = (props) => {
//   return (
//     <_UserStoreProvider>
//       <AuthProvider>{props.children}</AuthProvider>
//     </_UserStoreProvider>
//   )
// }

// const AuthProvider = (props) => {
//   const userStore = useUserStore()

//   if (userStore.authPack) {
//     console.log('got authpack', userStore)
//     return <AuthpackProvider value={userStore.authPack}>{props.children}</AuthpackProvider>
//   }

//   return null
// }
