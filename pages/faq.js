import { Box } from 'theme-ui'
import { fetchEntries } from '../src/utils/contentfulPosts'
import React from 'react'
import Seo from '../src/components/seo'

import Layout from '../src/components/layout'
import ContentFaq from '../src/components/content/ContentFaq'

const Faq = ({ faqs }) => {
  return (
    <Layout>
      <Seo title='FAQ' />
      <Box>
        <ContentFaq faqs={faqs} isopen />
      </Box>
    </Layout>
  )
}

export async function getServerSideProps() {
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
