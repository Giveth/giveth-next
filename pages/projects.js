import React, { useState } from 'react'
import Seo from '../src/components/seo'
import ErrorPage from '../src/components/errorPage'
import { client } from '../src/apollo/client'
import Layout from '../src/components/layout'

import ProjectsList, {
  OrderByDirection,
  OrderByField
} from '../src/components/ProjectsList'

import { FETCH_ALL_PROJECTS, GET_CATEGORIES } from '../src/apollo/gql/projects'

const Project = props => {
  const { projects, categories, totalCount, errors, categoryChoice } = props
  const [limit, setLimit] = useState(12)
  const [orderByField, setOrderByField] = useState(OrderByField.Balance)
  console.log('lolo0', categoryChoice)
  return (
    <Layout>
      <Seo title='Projects' />
      {projects && !errors ? (
        <ProjectsList
          categoryChoice={categoryChoice || 0}
          projects={projects}
          categories={categories}
          totalCount={totalCount}
          maxLimit={limit}
          selectOrderByField={orderByField => {
            setLimit(2)
            setOrderByField(orderByField)
          }}
        />
      ) : (
        <ErrorPage json={errors} />
      )}
    </Layout>
  )
}

export async function getServerSideProps (props) {
  console.log('lolo01', props)
  // Fetch Project
  let projects,
    categories = null
  let errors = null
  try {
    const { loading, error, data: fetchProject } = await client.query({
      query: FETCH_ALL_PROJECTS,
      fetchPolicy: 'network-only'
    })
    projects = Array.from(fetchProject?.projects).filter(
      i => i?.status?.id === '5'
    )

    const { data: categoriesData } = await client.query({
      query: GET_CATEGORIES,
      fetchPolicy: 'network-only'
    })
    categories = categoriesData?.categories
    errors = error
  } catch (error) {
    errors = error
  }

  return {
    props: {
      projects,
      categories: categories || null,
      totalCount: projects?.length || null,
      errors: JSON.stringify(errors) || null
    }
  }
}

export default Project
