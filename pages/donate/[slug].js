import { client } from '../../src/apollo/client'
import dynamic from 'next/dynamic'
import { FETCH_PROJECT_BY_SLUG } from '../../src/apollo/gql/projects'
import NotFoundPage from '../404'

const Seo = dynamic(() => import('../../src/components/seo'))
const Layout = dynamic(() => import('../../src/components/layout'))
const DonationView = dynamic(() => import('../../src/components/donate'))

const Donate = props => {
  return props.error ? (
    <NotFoundPage />
  ) : (
    <Layout asDialog>
      <Seo
        title={
          props?.project?.title ? `Donate to ${props?.project?.title}` : 'Donate to this project!'
        }
        image={props?.project?.image}
      />
      <DonationView {...props} />
    </Layout>
  )
}

export async function getServerSideProps(props) {
  const { query } = props
  const slug = decodeURI(query?.slug).replace(/\s/g, '')

  let project,
    errors = null
  try {
    // Fetch Project
    const { error, data: fetchProject } = await client.query({
      query: FETCH_PROJECT_BY_SLUG,
      variables: { slug: slug },
      fetchPolicy: 'network-only'
    })
    project = fetchProject?.projectBySlug

    if (error) errors = JSON.stringify(error)
  } catch (e) {
    console.log({ e })
    errors = JSON.stringify(e)
  }

  return {
    props: {
      project: project || null,
      error: errors
    }
  }
}

export default Donate
