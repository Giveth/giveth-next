import React, { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { client } from '../src/apollo/client'
import GivethContent from '../src/content/giveth.json'
import { FETCH_ALL_PROJECTS } from '../src/apollo/gql/projects'
import { gqlEnums } from '../src/utils/constants'
import GIVEconBanner from '../src/components/GIVEconomyBanner'

const Hero = dynamic(() => import('../src/components/home/HeroSection'))
const Seo = dynamic(() => import('../src/components/seo'))
const Layout = dynamic(() => import('../src/components/layout'))
const InfoSection = dynamic(() => import('../src/components/home/InfoSection'))
const HomeTopProjects = dynamic(() => import('../src/components/home/HomeTopProjects'))
const UpdatesSection = dynamic(() => import('../src/components/home/UpdatesSection'))

const projectsNumToShowInHomePage = 3

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

const IndexContent = ({ hideInfo, content, topProjects }) => {
  const router = useRouter()
  const updatesRef = useRef(null)
  const [isSubscribe, setIsSubscribe] = useState(false)

  useEffect(() => {
    const split = router?.asPath.split('#')[1]
    setIsSubscribe(split === 'subscribe')
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    if (isSubscribe === true) {
      setTimeout(() => window.scrollTo(0, updatesRef.current.offsetTop), 1000)
    }
  }, [isSubscribe])

  return (
    <>
      <Hero content={content} />
      <GIVEconBanner />
      <HomeTopProjects projects={topProjects} />
      {!hideInfo === true && <InfoSection content={content} />}
      <div ref={updatesRef}>
        <UpdatesSection />
      </div>
    </>
  )
}

const IndexPage = props => {
  const { content, topProjects } = props
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
        // isWelcome={query?.welcome}
        topProjects={topProjects}
      />
    </Layout>
  )
}

export async function getServerSideProps(props) {
  const { data: response } = await client.query({
    query: FETCH_ALL_PROJECTS,
    variables: {
      limit: projectsNumToShowInHomePage,
      orderBy: { field: gqlEnums.QUALITYSCORE, direction: gqlEnums.DESC }
    }
  })

  return {
    props: {
      topProjects: response?.projects?.projects,
      content: GivethContent,
      query: props.query
    }
  }
}

export default IndexPage
