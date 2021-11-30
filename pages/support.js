import dynamic from 'next/dynamic'
import { Flex, Grid } from 'theme-ui'
import { fetchEntries } from '../src/utils/contentfulPosts'

const Seo = dynamic(() => import('../src/components/seo'))
const Layout = dynamic(() => import('../src/components/layout'))
const Hero = dynamic(() => import('../src/components/content/SupportHero'))
const SupportCard = dynamic(() => import('../src/components/content/SupportCard'))

const SupportPage = ({ support }) => {
  return (
    <Layout>
      <Seo title='Support' />
      <Hero />
      <Flex sx={{ justifyContent: 'center' }}>
        <Grid mt='2rem' p={[1, 2, 2]} columns={[1, 1, 2]} sx={{ maxWidth: '80vw' }}>
          <SupportCard data={support} />
        </Grid>
      </Flex>
    </Layout>
  )
}

export async function getServerSideProps() {
  // contentful
  const supportReq = await fetchEntries({
    contentType: 'contentSupportProvider'
  })
  const support = supportReq?.map(s => s.fields)

  return {
    props: {
      support: support || {}
    }
  }
}

export default SupportPage
