import React from 'react'
import * as matter from 'gray-matter'
import dynamic from 'next/dynamic'
import { client } from '../src/apollo/client'
import GivethContent from '../src/content/giveth.md'

import { FETCH_ALL_PROJECTS } from '../src/apollo/gql/projects'

const Hero = dynamic(() => import('../src/components/home/HeroSection'))
const Seo = dynamic(() => import('../src/components/seo'))
const Layout = dynamic(() => import('../src/components/layout'))
const InfoSection = dynamic(() => import('../src/components/home/InfoSection'))
const HomeTopProjects = dynamic(() => import('../src/components/home/HomeTopProjects'))
const UpdatesSection = dynamic(() => import('../src/components/home/UpdatesSection'))

// import { ThreeIdConnect, EthereumAuthProvider } from '@3id/connect'
// import { Caip10Link } from '@ceramicnetwork/stream-caip10-link'
// import Ceramic from '@ceramicnetwork/http-client'
// import { IDX } from '@ceramicstudio/idx'
// import KeyDidResolver from 'key-did-resolver'
// import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'
// import { DID } from 'dids'

// const aliases = {
//   alias1: "0x00d18ca9782bE1CaEF611017c2Fbc1a39779A57C:1",
// };

// const ceramic = new Ceramic('https://gateway.ceramic.network')
// const idx = new IDX({ ceramic })

// const resolver = {
//   ...KeyDidResolver.getResolver(),
//   ...ThreeIdResolver.getResolver(ceramic)
// }
// const did = new DID({ resolver })

// ceramic.did = did

const IndexContent = ({ hideInfo, content, topProjects, categories, allProject }) => {
  return (
    <>
      <Hero content={content} />
      <HomeTopProjects
        fromHomePage
        projects={topProjects}
        categories={categories}
        totalCount={allProject?.totalCount}
      />
      {!hideInfo === true ? <InfoSection content={content} /> : null}
      <UpdatesSection />
    </>
  )
}

const IndexPage = props => {
  const { query, content, topProjects } = props
  // const { markdownRemark, topProjects, allProject } = data;
  const hideInfo = process.env.HIDE_INFO_SECTION ? process.env.HIDE_INFO_SECTION : false

  // const ceramicTest = async () => {
  //   try {
  //     if (!window) return null
  //     const addresses = await window?.ethereum.enable()
  //     console.log({ addresses })
  //     const authProvider = new EthereumAuthProvider(
  //       window.ethereum,
  //       addresses[0]
  //     )
  //     const threeIdConnect = new ThreeIdConnect()
  //     await threeIdConnect.connect(authProvider)
  //     const provider = await threeIdConnect.getDidProvider()
  //     console.log({ ceramic })
  //     ceramic.did.setProvider(provider)
  //     const id = await ceramic.did.authenticate()

  //     // const accountLink = await Caip10Link.fromAccount(
  //     //   ceramic,
  //     //   "0x00d18ca9782bE1CaEF611017c2Fbc1a39779A57C@eip155:1"
  //     // );
  //     // console.log({ id, accountLink });

  //     const basicProfile = await idx.get('basicProfile', id)
  //     console.log({ basicProfile })

  //     const alsoKnownAs = await idx.get('alsoKnownAs', id)
  //     console.log({ alsoKnownAs })
  //   } catch (error) {
  //     console.log({ error })
  //   }
  // }

  return (
    <Layout isHomePage='true'>
      <Seo title='Home' />
      {/* <button onClick={() => ceramicTest()}> idx test </button> */}
      <IndexContent
        hideInfo={hideInfo}
        content={content}
        // html={null}
        // location={location}
        isWelcome={query?.welcome}
        topProjects={topProjects}
        categories={topProjects?.categories}
        allProject={null}
      />
    </Layout>
  )
}

export async function getServerSideProps(props) {
  const { data: response } = await client.query({
    query: FETCH_ALL_PROJECTS,
    variables: { limit: 20 }
  })

  const mdContent = matter(GivethContent)

  return {
    props: {
      topProjects: response?.projects
        ?.filter(i => !i?.verified)
        ?.sort((a, b) => {
          if (a?.qualityScore > b?.qualityScore) return -1
        })
        ?.slice(0, 3),
      content: mdContent?.data,
      query: props.query
    }
  }
}

export default IndexPage
