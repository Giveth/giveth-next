import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { gqlEnums } from '../src/utils/constants'
import ErrorPage from '../src/components/errorPage'
import { client } from '../src/apollo/client'
import ProjectsList from '../src/components/ProjectsList'
import { FETCH_ALL_PROJECTS } from '../src/apollo/gql/projects'

const Seo = dynamic(() => import('../src/components/seo'))
const Layout = dynamic(() => import('../src/components/layout'))

const Project = props => {
  const { projects, traceProjects, categories, totalCount, errors } = props
  const [limit, setLimit] = useState(12)

  return (
    <Layout>
      <Seo title='Projects' />
      {projects && !errors ? (
        <ProjectsList
          query={props?.query}
          projects={[...projects, ...traceProjects]}
          // projects={[...traceProjects]}
          categories={categories}
          totalCount={totalCount}
          maxLimit={limit}
          selectOrderByField={() => {
            setLimit(2)
          }}
        />
      ) : (
        <ErrorPage json={errors} />
      )}
    </Layout>
  )
}

export async function getServerSideProps(props) {
  // Fetch Project
  let projects,
    traceProjects,
    totalCount,
    categories = null
  let errors = null
  try {
    const { error, data: fetchProject } = await client.query({
      query: FETCH_ALL_PROJECTS,
      variables: {
        orderBy: { field: gqlEnums.QUALITYSCORE, direction: gqlEnums.DESC }
      },
      fetchPolicy: 'no-cache'
    })
    projects = fetchProject?.projects?.projects
    categories = fetchProject?.projects?.categories
    totalCount = fetchProject?.projects?.totalCount

    // This will be removed when trace projects are saved on impact graph
    if (process.env.NEXT_PUBLIC_FEATHERS) {
      // only fetch if there's a route
      // https://feathers.beta.giveth.io/campaigns?verified=true
      traceProjects = await fetch(
        `${process.env.NEXT_PUBLIC_FEATHERS}/campaigns?verified=true`
      ).then(function (response) {
        if (response.status >= 400) {
          errors = new Error('Bad response from server')
        }
        return response.json()
      })
    }
    //Check io2trace projects
    traceProjects = traceProjects?.data?.filter(i => {
      if (i?.givethIoProjectId) {
        const foundIndex = projects?.findIndex(x => x.id == i?.givethIoProjectId)
        if (foundIndex) {
          projects[foundIndex] = { ...projects[foundIndex], IOTraceable: true }
        }
        return false
      } else {
        return true
      }
    })
    errors = error
  } catch (error) {
    errors = error
  }
  return {
    props: {
      projects: projects || [],
      traceProjects: traceProjects?.map(i => ({ ...i, fromTrace: true })) || [],
      categories: categories || null,
      totalCount: totalCount || null,
      errors: JSON.stringify(errors) || null,
      query: props.query
    }
  }
}

export default Project
