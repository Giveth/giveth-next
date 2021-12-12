import { client } from '../src/apollo/client'
import dynamic from 'next/dynamic'
import { GET_CATEGORIES } from '../src/apollo/gql/projects'
import Layout from '../src/components/layout'

const CreateProject = dynamic(() => import('../src/components/create-project-form/createProject'))

function CreateIndex({ categories }) {
  return (
    <Layout>
      <CreateProject categories={categories} />
    </Layout>
  )
}

export async function getServerSideProps() {
  const { data: response } = await client.query({
    query: GET_CATEGORIES
  })
  return {
    props: {
      categories: response?.categories
    }
  }
}

export default CreateIndex
