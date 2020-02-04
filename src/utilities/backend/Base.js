import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'

import { FIREBASE_CONFIG, BLANK_USER_DATA } from './consts'

if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG)
}

class Base {
  auth = firebase.auth()
  storage = firebase.storage().ref()
  data = firebase.firestore()

  $users = this.data.collection('users')
  $projects = this.data.collection('projects')
  $organizations = this.data.collection('organizations')

  const

  async getReferencesData(array) {
    const final = []

    for (const item of array) {
      const snapShot = await item.get()
      const data = snapShot.data()
      final.push(data)
    }

    return final
  }

  getUserDocument(userId) {
    return this.$users.doc(userId)
  }

  async getUserData(userId) {
    const user = await base.$users.doc(userId).get()
    return user.data()
  }

  async updateUserData(userId, updater) {
    const userDocument = this.getUserDocument(userId)
    const userData = await this.getUserData(userId)
    userDocument.update(updater(userData))
  }

  async insertUserDocument(userId, data) {
    await this.data.$users.doc(userId).set(data)
    return this.getUserData(userId)
  }

  async insertBlankUserDocument(userId) {
    await this.data.$users.doc(userId).set(BLANK_USER_DATA)
    return this.getUserData(userId)
  }

  getProjectDocument(documentId) {
    return this.$projects.doc(documentId)
  }

  async getProjectData(documentId) {
    const project = await base.$projects.doc(documentId).get()
    return project.data()
  }

  async updateProjectData(projectId, updater) {
    const userDocument = this.getProjectDocument(projectId)
    const userData = await this.getProjectData(projectId)
    userDocument.update(updater(userData))
  }

  getOrganizationDocument(docId) {
    return this.$organizations.doc(docId)
  }

  async getOrganizationData(documentId) {
    const user = await base.$organizations.doc(documentId).get()
    return user.data()
  }
}

export const base = new Base()
