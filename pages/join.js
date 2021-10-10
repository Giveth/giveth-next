import { Grid, Text } from 'theme-ui'
import { fetchEntries } from '../src/utils/contentfulPosts'
import dynamic from 'next/dynamic'
const Seo = dynamic(() => import('../src/components/seo'))
const Layout = dynamic(() => import('../src/components/layout'))
const Hero = dynamic(() => import('../src/components/content/JoinPageHero'))
const JoinChatCard = dynamic(() =>
  import('../src/components/content/JoinPageCard')
)

const JoinPage = ({ joinChat, joinConsume }) => {
  return (
    <Layout>
      <Seo title='Join our community' />
      <Hero />
      <Grid
        rows={2}
        sx={{ justifyContent: 'center', backgroundColor: 'lightestBlue' }}
      >
        <Text
          sx={{
            variant: 'headings.h4',
            textAlign: 'center',
            paddingTop: '2rem',
            color: 'primary'
          }}
        >
          Engage
        </Text>
        <Grid
          p={[1, 2, 2]}
          columns={[1, 1, 2]}
          sx={{ paddingLeft: '10vw', paddingRight: '10vw' }}
        >
          <JoinChatCard data={joinChat} />
        </Grid>
      </Grid>
      <div style={{ height: '10vh' }} />
      <Grid
        rows={2}
        sx={{ justifyContent: 'center', backgroundColor: 'lightestBlue' }}
      >
        <Text
          sx={{
            variant: 'headings.h4',
            textAlign: 'center',
            paddingTop: '2rem',
            color: 'primary'
          }}
        >
          Consume
        </Text>
        <Grid
          p={[1, 2, 2]}
          columns={[1, 1, 2]}
          sx={{ paddingLeft: '10vw', paddingRight: '10vw' }}
        >
          <JoinChatCard data={joinConsume} />
        </Grid>
      </Grid>
    </Layout>
  )
}

export async function getServerSideProps () {
  // contentful
  const joinReq = await fetchEntries({
    contentType: 'contentJoinChatprovider'
  })
  const joinConsumeReq = await fetchEntries({
    contentType: 'contentJoinConsumeProvider'
  })
  const joinChat = joinReq.map(j => j.fields)
  const joinConsume = joinConsumeReq.map(j => j.fields)

  return {
    props: {
      joinChat: joinChat || {},
      joinConsume: joinConsume || {}
    }
  }
}

export default JoinPage
