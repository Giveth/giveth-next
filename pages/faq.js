import { Box } from "theme-ui"
import React from "react"
import dynamic from 'next/dynamic'
import { fetchEntries } from "../src/utils/contentfulPosts"

const ContentFaq = dynamic(() => import('../src/components/content/ContentFaq'))
const Layout = dynamic(() => import('../src/components/layout'))
const Seo = dynamic(() => import('../src/components/seo'))

const Faq = ({ faqs }) => {
  return (
    <Layout>
      <Seo title="FAQ" />
      <Box>
        <ContentFaq faqs={faqs} isopen />
      </Box>
    </Layout>
  )
}

export async function getServerSideProps () {
  // contentful
  const faqReq = await fetchEntries({
    contentType: "faqEntry",
  })

  const faqs = faqReq?.map((f) => f.fields)

  return {
    props: {
      faqs: faqs || {},
    },
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
