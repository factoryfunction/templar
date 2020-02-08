import firebase from 'firebase'

import * as data from './data'
import * as auth from './auth'
import * as cdn from './cdn'

import { FIREBASE_CONFIG } from './consts'

if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG)
}

export { data, auth, cdn }
