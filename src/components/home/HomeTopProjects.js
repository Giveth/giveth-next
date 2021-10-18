import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

const ProjectsList = dynamic(() => import('../ProjectsList'))

const HomeTopProjects = props => {
  const router = useRouter()
  const { projects = [], categories, fromHomePage } = props

  return (
    <ProjectsList
      fromHomePage={fromHomePage}
      projects={projects}
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
