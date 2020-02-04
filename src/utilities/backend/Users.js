import { base } from './Base'

export class BackendUsers {
  onAuthStateChange = (handler) => {
    return base.auth.onAuthStateChanged(handler)
  }

  async getUserOrganizations(userId) {}

  async getAuthenticatedUserData(user) {
    const userData = await base.getUserData(user.uid)
    const organizations = await base.getReferencesData(userData.organizations)
    const projects = await base.getReferencesData(userData.projects)

    return {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      refreshToken: user.refreshToken,
      settings: userData.settings,
      organizations,
      projects,
    }
  }

  onUserAuthenticated = (handler) => {
    return base.auth.onAuthStateChanged((user) => {
      user && this.getAuthenticatedUserData(user).then(handler)
    })
  }

  onUserNotAuthenticated = (handler) => {
    return base.auth.onAuthStateChanged((user) => {
      !user && handler(user)
    })
  }

  async registerUser(options) {
    const result = await base.auth.createUserWithEmailAndPassword(options.email, options.password)
    // register.then(doc => {
    //   base.$users.doc(doc.id).set({
    //     projects: [],
    //     organizations: [],
    //     settings: [],
    //   })
    // })
  }

  signIn(options) {
    return base.auth.signInWithEmailAndPassword(options.email, options.password)
  }

  signOut() {
    return base.auth.signOut()
  }

  async assignToOrganization(userId, organizationId) {
    base.updateUserData(userId, (user) => {
      return {
        organizations: [...user.organizations, organizationId],
      }
    })
  }

  get currentUser() {
    return base.auth.currentUser
  }
}
