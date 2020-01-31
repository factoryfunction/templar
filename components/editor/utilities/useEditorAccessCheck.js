import useAuthStore from '../../../stores/authStore'
import { useRouter } from 'next/router'
import { windowLocation } from './windowLocation'

export const useEditorAccessCheck = () => {
  const { user } = useAuthStore()
  const router = useRouter()

  if (user) {
    const hasAccessToOrganization = user.organizations.find((organization) => {
      return organization.id === windowLocation.params.organization
    })
  }
}
