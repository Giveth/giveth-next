import { Box } from 'theme-ui'
import { fetchEntries } from '../src/utils/contentfulPosts'
import React from 'react'
import styled from '@emotion/styled'

import dynamic from 'next/dynamic'
const ContentFaq = dynamic(() => import('../src/components/content/ContentFaq'))
const Layout = dynamic(() => import('../src/components/layout'))
const Seo = dynamic(() => import('../src/components/seo'))

const Main = styled(Box)``

const Faq = ({ faqs }) => {
  // const isMobile = useMediaQuery({ query: '(max-width: 825px)' })
  return (
    <Layout>
      <Seo title='FAQ' />
      <Main>
        <ContentFaq faqs={faqs} isopen />
      </Main>
    </Layout>
  )
}

export async function getServerSideProps () {
  // contentful
  const faqReq = await fetchEntries({
    contentType: 'faqEntry'
  })

  const faqs = faqReq?.map(f => f.fields)

  return {
    props: {
      faqs: faqs || {}
    }
  }
}

export default Faq

// export const query = graphql`
//   query Faq {
//     faqA: allContentfulFaqEntry(
//       sort: { fields: [createdAt], order: ASC }
//       filter: { category: { category: { eq: "General" } } }
//     ) {
//       edges {
//         node {
//           id
//           linkId
//           createdAt
//           question
//           answer {
//             json
//           }
//           category {
//             id
//             category
//           }
//         }
//       }
//     }
//   }
// `
