import { Box } from 'theme-ui'
import React from 'react'
import dynamic from 'next/dynamic'
import { fetchEntries } from '../src/utils/contentfulPosts'

const ContentFaq = dynamic(() => import('../src/components/content/ContentFaq'))
const Layout = dynamic(() => import('../src/components/layout'))
const Seo = dynamic(() => import('../src/components/seo'))

const Faq = ({ faqs, givethFaqs, giveconomyFaqs }) => {
  return (
    <Layout>
      <Seo title='FAQ' />
      <Box>
        <ContentFaq faqs={faqs} isopen />
      </Box>
      <Box>
        <ContentFaq faqs={givethFaqs} isopen />
      </Box>
      <Box>
        <ContentFaq faqs={giveconomyFaqs} isopen />
      </Box>
    </Layout>
  )
}

export async function getServerSideProps() {
  // contentful

  const faqReq = await fetchEntries({
    contentType: 'faqEntry'
  })
  // const givethFaqReq = await fetchEntries({
  //   contentType: 'givethFaqEntry'
  // })
  // const giveconomyFaqReq = await fetchEntries({
  //   contentType: 'giveconomyFaqEntry'
  // })

  const sortFAQs = (a, b) => {
    const orderA = a.linkId.split(/[[\]]{1,2}/)[1]
    const orderB = b.linkId.split(/[[\]]{1,2}/)[1]
    return orderA - orderB
  }

  const filterFAQs = (f, name) => {
    return f?.category?.fields?.category === name
  }

  const faqs = faqReq?.map(f => f.fields)
  const generalFaqs = faqs?.filter(f => filterFAQs(f, 'General')).sort((a, b) => sortFAQs(a, b))
  const givethFaqs = faqs?.filter(f => filterFAQs(f, 'Giveth')).sort((a, b) => sortFAQs(a, b))
  const giveconomyFaqs = faqs
    ?.filter(f => filterFAQs(f, 'GIVeconomy'))
    .sort((a, b) => sortFAQs(a, b))

  return {
    props: {
      faqs: generalFaqs || {},
      givethFaqs: givethFaqs || {},
      giveconomyFaqs: giveconomyFaqs || {}
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
