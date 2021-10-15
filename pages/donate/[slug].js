import { client } from '../../src/apollo/client'
import DonationView from '../../src/components/donate'
import Layout from '../../src/components/layout'
import Seo from '../../src/components/seo'
import { FETCH_PROJECT_BY_SLUG } from '../../src/apollo/gql/projects'
import NotFoundPage from '../404'

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

  // Try to fetch from TRACE
  const traceProject = await fetch(
    `${process.env.NEXT_PUBLIC_FEATHERS}/campaigns?slug=${slug}`
  ).then(async function (response) {
    if (response.status >= 400) {
      errors = new Error('Bad response from server')
    }
    const res = await response.json()
    const traceProj = res?.data[0]
    if (!traceProj) return null
    if (project) {
      // It was initially IO project
      return { ...traceProj, ...project, IOTraceable: true }
    } else {
      // Only Traceable
      return { ...traceProj, status: { id: '5' }, fromTrace: true }
    }
  })

  if (traceProject) {
    errors = null
  }

  return {
    props: {
      project: traceProject || project || null,
      error: errors
    }
  }
}

export default Donate
