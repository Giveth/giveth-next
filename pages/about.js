import React from 'react'
import dynamic from 'next/dynamic'
import { Box } from 'theme-ui'
import styled from '@emotion/styled'
import { fetchEntries } from '../src/utils/contentfulPosts'
const AboutPage = dynamic(() => import('../src/components/content/AboutPage'))
const Seo = dynamic(() => import('../src/components/seo'))

const Main = styled(Box)``

const About = props => {
  // const isMobile = useMediaQuery({ query: '(max-width: 825px)' })
  return (
    <>
      <Seo title='FAQ' />
      <Main>
        <AboutPage {...props} />
      </Main>
    </>
  )
}

export async function getServerSideProps () {
  // contentful
  const teamReq = await fetchEntries({
    contentType: 'contentTeam'
  })
  const aboutReq = await fetchEntries({
    contentType: 'contentAbout'
  })

  const team = teamReq?.map(f => f.fields)
  const about = aboutReq?.map(f => f.fields)
  console.log({ team: JSON.stringify(team) })
  return {
    props: {
      team: team || {},
      about: about || {}
    }
  }
}

export default About

// export const query = graphql`
//   query AboutQuery {
//     contentTeam: allContentfulContentTeam {
//       edges {
//         node {
//           portrait {
//             id
//             file {
//               url
//               fileName
//               contentType
//             }
//           }
//           headline1
//           headline2
//           shortBio
//           socialMedium
//           socialTwitter
//         }
//       }
//     }
//     contentAboutUs: allContentfulContentAbout {
//       edges {
//         node {
//           title
//           subtitle
//           missionandvision {
//             json
//           }
//           history {
//             json
//           }
//         }
//       }
//     }
//   }
