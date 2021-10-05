import React from 'react'
import { useRouter } from 'next/router'
import { Flex } from 'theme-ui'
import { useQueryParams, StringParam } from 'use-query-params'
import { useQuery } from '@apollo/client'
import { useWallet } from '../../contextProvider/WalletProvider'
import LoadingModal from '../../components/loadingModal'
import { USERS_DONATIONS } from '../../apollo/gql/donations'
import { FETCH_MY_PROJECTS } from '../../apollo/gql/projects'
import AccountTop from '../../components/account/AccountTop'
import AccountNav from '../../components/account/AccountNav'
import AccountBody from '../../components/account/AccountBody'

const AccountPage = () => {
  const router = useRouter()
  const { isLoggedIn } = useWallet()
  const { data: donations, loading: dataLoading } = useQuery(USERS_DONATIONS, {
    fetchPolicy: 'network-only'
  })
  const userDonations = donations?.donationsByDonor

  const { data: userProjects, loading: projectsLoading } = useQuery(
    FETCH_MY_PROJECTS,
    {
      fetchPolicy: 'network-only'
    }
  )
  const projectsList = userProjects?.myProjects
  const [query, setQuery] = useQueryParams({
    view: StringParam,
    data: StringParam
  })
  const isSSR = typeof window === 'undefined'
  if (dataLoading || projectsLoading) {
    return (
      <>
        <AccountTop />
        <Flex sx={{ height: '80vh' }} />
        <LoadingModal isOpen />
      </>
    )
  }

  if (!isLoggedIn) {
    router.push('/', { state: { welcome: true } })
    return null
  }

  return (
    <>
      <AccountTop query={query} />
      <Flex
        sx={{
          ml: '5%',
          fontFamily: 'heading',
          flexDirection: ['column', 'row', 'row']
        }}
      >
        <AccountNav
          setQuery={setQuery}
          query={query}
          userDonations={userDonations}
          projectsList={projectsList}
        />
        <AccountBody
          setQuery={setQuery}
          query={query}
          isSSR={isSSR}
          userDonations={userDonations}
          projectsList={projectsList}
        />
      </Flex>
    </>
  )
}

export default AccountPage
