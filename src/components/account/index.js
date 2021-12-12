import React, { useContext, useEffect } from 'react'
import { Flex } from 'theme-ui'
import { useQueryParams, StringParam } from 'use-query-params'
import { useQuery } from '@apollo/client'

import LoadingModal from '../../components/loadingModal'
import { USERS_DONATIONS } from '../../apollo/gql/donations'
import { FETCH_MY_PROJECTS } from '../../apollo/gql/projects'
import AccountTop from '../../components/account/AccountTop'
import AccountNav from '../../components/account/AccountNav'
import AccountBody from '../../components/account/AccountBody'
import { Context as Web3Context } from '../../contextProvider/Web3Provider'

const Main = () => {
  const {
    state: { user },
    actions: { signModalContent, signIn }
  } = useContext(Web3Context)

  useEffect(() => {
    if (user && !user.token) signIn()
  }, [user])

  return !user ? (
    <></>
  ) : user && user.token ? (
    <AccountPage />
  ) : (
    <div style={{ margin: '150px 0', textAlign: 'center' }}>{signModalContent()}</div>
  )
}

const AccountPage = () => {
  const { data: donations, loading: dataLoading } = useQuery(USERS_DONATIONS, {
    fetchPolicy: 'network-only'
  })
  const userDonations = donations?.donationsByDonor

  const { data: userProjects, loading: projectsLoading } = useQuery(FETCH_MY_PROJECTS, {
    fetchPolicy: 'network-only'
  })
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

export default Main
