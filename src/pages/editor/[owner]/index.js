import { useRouter } from 'next/router'

export default (props) => {
  const router = useRouter()
  const { owner, project } = router.query

  return <h1>{owner + ' ... ' + project || 'project next'}</h1>
}
