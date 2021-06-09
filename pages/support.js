import { jsx, Flex, Grid } from 'theme-ui'
import { fetchEntries } from '../src/utils/contentfulPosts'
import Layout from '../src/components/layout'
import Seo from '../src/components/seo'
import Hero from '../src/components/content/SupportHero'
import SupportCard from '../src/components/content/SupportCard'

const SupportPage = ({ support }) => {
  return (
    <Layout>
      <Seo title='Support' />
      <Hero />
      <Flex sx={{ justifyContent: 'center' }}>
        <Grid
          mt='2rem'
          p={[1, 2, 2]}
          columns={[1, 1, 2]}
          sx={{ maxWidth: '80vw' }}
        >
          <SupportCard data={support} />
        </Grid>
      </Flex>
    </Layout>
  )
}

export async function getServerSideProps () {
  // contentful
  const supportReq = await fetchEntries({
    contentType: 'contentSupportProvider'
  })
  const support = await supportReq.map(s => {
    return s.fields
  })

  return {
    props: {
      support: support || {}
    }
  }
}

export default SupportPage
