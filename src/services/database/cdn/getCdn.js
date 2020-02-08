import firebase from 'firebase'

export const getCdn = () => {
  return firebase.storage().ref()
}
