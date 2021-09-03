import React from 'react'
import * as matter from 'gray-matter'
import { client } from '../src/apollo/client'
import { useEffect, useState } from 'react'
import GivethContent from '../src/content/giveth.md'
import Layout from '../src/components/layout'
import Seo from '../src/components/seo'
import Hero from '../src/components/home/HeroSection'
import GR11 from '../src/components/GR11'
import InfoSection from '../src/components/home/InfoSection'
import UpdatesSection from '../src/components/home/UpdatesSection'
import HomeTopProjects from '../src/components/home/HomeTopProjects'
import { PopupContext } from '../src/contextProvider/popupProvider'

import { FETCH_ALL_PROJECTS } from '../src/apollo/gql/projects'

import { ThreeIdConnect, EthereumAuthProvider } from '@3id/connect'
import { Caip10Link } from '@ceramicnetwork/stream-caip10-link'
import Ceramic from '@ceramicnetwork/http-client'
import { IDX } from '@ceramicstudio/idx'
import KeyDidResolver from 'key-did-resolver'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'
import { DID } from 'dids'

// const aliases = {
//   alias1: "0x00d18ca9782bE1CaEF611017c2Fbc1a39779A57C:1",
// };

const ceramic = new Ceramic('https://gateway.ceramic.network')
const idx = new IDX({ ceramic })

const resolver = {
  ...KeyDidResolver.getResolver(),
  ...ThreeIdResolver.getResolver(ceramic)
}
const did = new DID({ resolver })

ceramic.did = did

const IndexContent = ({
  hideInfo,
  content,
  topProjects,
  categories,
  allProject,
  mediumPosts,
  isWelcome
}) => {
  const popup = React.useContext(PopupContext)
  // const [afterRenderProjects, setAfterRenderProjects] = useState(null)
  const [popupShown, setPopupShown] = useState(false)
  useEffect(() => {
    if (isWelcome) {
      popup.triggerPopup('WelcomeLoggedOut')
      setPopupShown(true)
    }
  }, [])

  return (
    <>
      <Hero content={content} />
      <GR11 />
      <HomeTopProjects
        fromHomePage
        projects={topProjects}
        categories={categories}
        totalCount={allProject?.totalCount}
      />
      {!hideInfo === true ? <InfoSection content={content} /> : null}
      <UpdatesSection mediumPosts={mediumPosts} />
    </>
  )
}

const IndexPage = props => {
  const { data, query, content, mediumPosts, topProjects } = props
  // const { markdownRemark, topProjects, allProject } = data;
  const hideInfo = process.env.HIDE_INFO_SECTION
    ? process.env.HIDE_INFO_SECTION
    : false

  const ceramicTest = async () => {
    try {
      if (!window) return null
      const addresses = await window?.ethereum.enable()
      console.log({ addresses })
      const authProvider = new EthereumAuthProvider(
        window.ethereum,
        addresses[0]
      )
      const threeIdConnect = new ThreeIdConnect()
      await threeIdConnect.connect(authProvider)
      const provider = await threeIdConnect.getDidProvider()
      console.log({ ceramic })
      ceramic.did.setProvider(provider)
      const id = await ceramic.did.authenticate()

      // const accountLink = await Caip10Link.fromAccount(
      //   ceramic,
      //   "0x00d18ca9782bE1CaEF611017c2Fbc1a39779A57C@eip155:1"
      // );
      // console.log({ id, accountLink });

      const basicProfile = await idx.get('basicProfile', id)
      console.log({ basicProfile })

      const alsoKnownAs = await idx.get('alsoKnownAs', id)
      console.log({ alsoKnownAs })
    } catch (error) {
      console.log({ error })
    }
  }

  return (
    <Layout isHomePage='true'>
      <Seo title='Home' />
      {/* <button onClick={() => ceramicTest()}> idx test </button> */}
      <IndexContent
        hideInfo={hideInfo}
        content={content}
        mediumPosts={mediumPosts}
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

export async function getServerSideProps (props) {
  const { loading, error = null, data: response } = await client.query({
    query: FETCH_ALL_PROJECTS,
    variables: { limit: 20 }
  })

  const mdContent = matter(GivethContent)

  const medium = await fetch(
    'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/giveth'
  )
  const mediumPosts = await medium.json()

  return {
    props: {
      topProjects: response?.projects
        ?.filter(i => !!i?.verified)
        ?.sort((a, b) => {
          console.log({ a, b })
          if (a?.totalHearts > b?.totalHearts) return -1
        })
        ?.slice(0, 3),
      content: mdContent?.data,
      mediumPosts: mediumPosts?.items?.slice(0, 2) || {},
      query: props.query
    }
  }
}

export default IndexPage
