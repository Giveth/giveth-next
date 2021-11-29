import { client } from '../apollo/client'
import { ACTIVATE_PROJECT, DEACTIVATE_PROJECT } from '../apollo/gql/projects'

export async function toggleProjectActivation(projectId, isActive) {
  return client
    .mutate({
      mutation: !isActive ? ACTIVATE_PROJECT : DEACTIVATE_PROJECT,
      variables: {
        projectId: parseFloat(projectId)
      }
    })
    .then(res => (!isActive ? res?.data?.activateProject : res?.data?.deactivateProject))
}
