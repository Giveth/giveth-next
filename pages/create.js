import { client } from '../src/apollo/client'
import dynamic from 'next/dynamic'
import { GET_CATEGORIES } from '../src/apollo/gql/projects'

const CreateProject = dynamic(() =>
  import('../src/components/create-project-form/createProject')
)

function CreateIndex({ categories }) {
  return <CreateProject categories={categories} />
}

export async function getServerSideProps() {
  const { data: response } = await client.query({
    query: GET_CATEGORIES,
  })
  return {
    props: {
      categories: response?.categories,
    },
  }
}

export default CreateIndex
