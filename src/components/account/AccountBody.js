import { Flex } from 'theme-ui'
import React from 'react'
import MyProjects from './myProjects'
import { isSSR } from '../../lib/helpers'

const MyAccount = React.lazy(() => import('../../components/account/myAccount'))
const MyDonations = React.lazy(() => import('../../components/account/myDonations'))

const SetView = props => {
  const { query, projectsList, userDonations } = props
  const { view, data } = query
  const SSR = isSSR()
  switch (view) {
    case 'projects':
      switch (data) {
        case 'all':
          return <MyProjects projects={projectsList} />
        default:
          return <MyProjects projects={projectsList} edit={data} />
      }
    case 'donations':
      return (
        !SSR && (
          <React.Suspense fallback={<div />}>
            <MyDonations donations={userDonations} />
          </React.Suspense>
        )
      )
    default:
      return (
        !SSR && (
          <React.Suspense fallback={<div />}>
            <MyAccount
              info={{
                myDonations: userDonations?.length,
                myProjects: projectsList?.length
              }}
            />
          </React.Suspense>
        )
      )
  }
}
const AccountBody = props => {
  const { query, projectsList, userDonations } = props

  return (
    <Flex
      sx={{
        flexDirection: 'column',
        width: ['100%', null, '70%'],
        mt: ['100px', '140px', '140px']
      }}
    >
      <SetView query={query} projectsList={projectsList} userDonations={userDonations} />
    </Flex>
  )
}
export default AccountBody
