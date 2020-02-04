import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'

import { FIREBASE_CONFIG, BLANK_USER_DATA } from './consts'

if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG)
}

const auth = firebase.auth()
const storage = firebase.storage().ref()
const db = firebase.firestore()

export const collections = {
  users: db.collection('users'),
  organizations: db.collection('organizations'),
  spaces: db.collection('spaces'),
  roles: db.collection('roles'),
}

export const getDoc = (collection) => async (id) => {
  const doc = await collection.doc(id).get()
  return doc.exists ? doc : undefined
}

export const createDoc = (collection) => (data) => {
  return collection.add(data)
}

export const updateDoc = (collection) => async (id, data) => {
  try {
    await collection.doc(id).set(data, MERGE_OPTION)
    return true
  } catch (error) {
    return false
  }
}

export const subscribeTo = (collection) => (options) => {
  collection.where(...options.query).onSnapshot((snapshot) => {
    const newData = []

    snapshot.forEach((doc) => {
      const _id = doc.id
      const data = doc.data()
      newData.push({ _id, ...data })
    })

    options.handler(newData)
  })
}

export const subscribeToOne = (collection) => (options) => {
  collection.doc(options.id).onSnapshot((snapshot) => {
    options.handler(snapshot.data())
  })
}
