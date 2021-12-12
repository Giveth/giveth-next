import React from 'react'
import dynamic from 'next/dynamic'

const Seo = dynamic(() => import('../src/components/seo'))
const Layout = dynamic(() => import('../src/components/layout'))
const AccountIndex = dynamic(() => import('../src/components/account'))

const AccountPage = () => {
  return (
    <Layout>
      <Seo title='account' />
      <AccountIndex />
    </Layout>
  )
}

export default AccountPage
