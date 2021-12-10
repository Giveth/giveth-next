import React from 'react'
import dynamic from 'next/dynamic'
import { gqlEnums } from '../src/utils/constants'
import ErrorPage from '../src/components/errorPage'
import { client } from '../src/apollo/client'
import ProjectsList from '../src/components/ProjectsList'
import { FETCH_ALL_PROJECTS } from '../src/apollo/gql/projects'
import GR12 from '../src/components/GR12'

const Seo = dynamic(() => import('../src/components/seo'))
const Layout = dynamic(() => import('../src/components/layout'))

const itemsPerPage = 15

const Projects = props => {
  const { projects, categories, totalCount, errors, query } = props

  return (
    <Layout>
      <Seo title='Projects' />
      <GR12 />
      {projects && !errors ? (
        <ProjectsList
          query={query}
          projects={projects}
          categories={categories}
          totalCount={totalCount}
        />
      ) : (
        <ErrorPage json={errors} />
      )}
    </Layout>
  )
}

export async function getServerSideProps(props) {
  let projects,
    totalCount,
    errors,
    categories = null

  try {
    const { error, data: fetchProject } = await client.query({
      query: FETCH_ALL_PROJECTS,
      variables: {
        orderBy: { field: gqlEnums.QUALITYSCORE, direction: gqlEnums.DESC },
        limit: itemsPerPage
      },
      fetchPolicy: 'no-cache'
    })
    projects = fetchProject?.projects?.projects
    categories = fetchProject?.projects?.categories
    totalCount = fetchProject?.projects?.totalCount

    errors = error
  } catch (error) {
    errors = error
  }

  return {
    props: {
      projects: projects || [],
      categories: categories || null,
      totalCount: totalCount || null,
      errors: JSON.stringify(errors) || null,
      query: props.query
    }
  }
}

export default Projects
