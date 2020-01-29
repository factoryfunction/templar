import { base } from './Base'
import { BackendUsers } from './Users'
import { BackendOrganizations } from './Organizations'

class Backend {
  base = base
  users = new BackendUsers()
  organizations = new BackendOrganizations()
}

const backend = new Backend()
export default backend
