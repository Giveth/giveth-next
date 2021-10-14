import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

const ProjectsList = dynamic(() => import('../ProjectsList'))

const HomeTopProjects = props => {
  const router = useRouter()
  const { projects = [], categories, fromHomePage } = props
  const [showProjects, setShowProjects] = useState(projects)

  return (
    <ProjectsList
      fromHomePage={fromHomePage}
      projects={showProjects}
      categories={categories}
      totalCount={null}
      loadMore={() => router.push('/projects')}
      hasMore
      // selectOrderByField={orderByField => {
      //   setLimit(2)
      //   setOrderByField(orderByField)
      // }}
    />
  )
}

export default HomeTopProjects
