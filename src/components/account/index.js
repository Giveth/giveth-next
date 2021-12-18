import React, { useContext, useEffect } from 'react'
import { Flex } from 'theme-ui'
import { useQueryParams, StringParam } from 'use-query-params'
import { useQuery } from '@apollo/client'

import LoadingModal from '../../components/loadingModal'
import { USERS_DONATIONS } from '../../apollo/gql/donations'
import { FETCH_MY_PROJECTS } from '../../apollo/gql/projects'
import AccountNav from '../../components/account/AccountNav'
import AccountBody from '../../components/account/AccountBody'
import { Context as Web3Context } from '../../contextProvider/Web3Provider'

const Main = () => {
  const {
    state: { isSignedIn },
    actions: { loginModal, closeLoginModal }
  } = useContext(Web3Context)

  useEffect(() => {
    if (!isSignedIn) loginModal()
    else closeLoginModal()
  }, [isSignedIn])

  return isSignedIn ? <AccountPage /> : null
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

  if (dataLoading || projectsLoading) {
    return (
      <>
        <Flex sx={{ height: '80vh' }} />
        <LoadingModal isOpen />
      </>
    )
  }

  return (
    <>
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
          userDonations={userDonations}
          projectsList={projectsList}
        />
      </Flex>
    </>
  )
}

export default Main
