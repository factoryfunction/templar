import { base } from './Base'

export class BackendOrganizations {
  getOrganizationAssets = async (organizationName, projectName) => {
    return await base.storage.child(`/${organizationName}/${projectName}`).listAll()
  }

  uploadOrganizationAssets = async () => {
    //
  }

  deleteOrganizationAssets = async () => {
    //
  }
}
