import React from 'react'
import AccountIndex from '../src/components/account'
import Seo from '../src/components/seo'
import Layout from '../src/components/layout'

const AccountPage = () => {
  return (
    <Layout noHeader>
      <Seo title='account' />
      <AccountIndex />
    </Layout>
  )
}

export default AccountPage
