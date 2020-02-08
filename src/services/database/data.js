import firebase from 'firebase'
import 'firebase/firestore'

export const db = firebase.firestore()

export const collections = {
  users: db.collection('users'),
  organizations: db.collection('organizations'),
  projects: db.collection('projects'),
}

const getDoc = (collection) => async (id) => {
  const doc = await collection.doc(id).get()
  return doc.exists ? doc.data() : undefined
}

const createDoc = (collection) => (data) => {
  return collection.add(data)
}

const updateDoc = (collection) => async (id, data) => {
  try {
    await collection.doc(id).set(data, MERGE_OPTION)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

const subscribeToAll = (collection) => (options) => {
  collection.where(...options.query).onSnapshot((snapshot) => {
    const updatedData = snapshot.map((doc) => {
      const _id = doc.id
      const data = doc.data()
      return { _id, ...data }
    })

    options.handler(updatedData)
  })
}

const subscribeToOne = (collection) => (id) => {
  collection.doc(id).onSnapshot((snapshot) => {
    options.handler(snapshot.data())
  })
}

export const createUser = createDoc(collections.users)
export const getUser = getDoc(collections.users)
export const updateUser = updateDoc(collections.users)
export const subscribeToUser = subscribeToOne(collections.users)
export const subscribeToUsers = subscribeToAll(collections.users)

export const createOrganization = createDoc(collections.organizations)
export const getOrganization = getDoc(collections.organizations)
export const updateOrganization = updateDoc(collections.organizations)
export const subscribeToOrganization = subscribeToOne(collections.organizations)
export const subscribeToorganizations = subscribeToAll(collections.organizations)

export const createProject = createDoc(collections.projects)
export const getProject = getDoc(collections.projects)
export const updateProject = updateDoc(collections.projects)
export const subscribeToProject = subscribeToOne(collections.projects)
export const subscribeToProjects = subscribeToAll(collections.projects)
