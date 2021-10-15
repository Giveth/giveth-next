import { Grid, Text } from 'theme-ui'
import { fetchEntries } from '../src/utils/contentfulPosts'
import Layout from '../src/components/layout'
import Seo from '../src/components/seo'
import Hero from '../src/components/content/JoinPageHero'
import JoinChatCard from '../src/components/content/JoinPageCard'

const JoinPage = ({ joinChat, joinConsume }) => {
  return (
    <Layout>
      <Seo title='Join our community' />
      <Hero />
      <Grid rows={2} sx={{ justifyContent: 'center', backgroundColor: 'lightestBlue' }}>
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
        <Grid p={[1, 2, 2]} columns={[1, 1, 2]} sx={{ paddingLeft: '10vw', paddingRight: '10vw' }}>
          <JoinChatCard data={joinChat} />
        </Grid>
      </Grid>
      <div style={{ height: '10vh' }} />
      <Grid rows={2} sx={{ justifyContent: 'center', backgroundColor: 'lightestBlue' }}>
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
        <Grid p={[1, 2, 2]} columns={[1, 1, 2]} sx={{ paddingLeft: '10vw', paddingRight: '10vw' }}>
          <JoinChatCard data={joinConsume} />
        </Grid>
      </Grid>
    </Layout>
  )
}

export async function getServerSideProps() {
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
