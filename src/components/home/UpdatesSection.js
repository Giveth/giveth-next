import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Grid, Box, Heading, Text } from 'theme-ui'
import styled from '@emotion/styled'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import MailchimpSignup from './MailchimpSignup'

dayjs.extend(localizedFormat)

const UpdatesSection = () => {
  const [mediumPosts, setMediumPosts] = useState(null)

  useEffect(() => {
    const getPosts = async () => {
      const medium = await fetch(
        'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/giveth'
      )
      const posts = await medium.json()
      setMediumPosts(posts?.items?.slice(0, 2) || {})
    }
    getPosts()
  }, [])

  if (!mediumPosts) return null

  return (
    <React.Fragment>
      <div
        style={{
          position: 'absolute',
          right: '10px'
        }}
      >
        <Image
          src='/images/decorator-elements.svg'
          width='100%'
          height='100%'
          alt='decorator elements'
        />
      </div>
      <Container p={[2, 3, 5]} sx={{ position: 'relative' }}>
        <Main>
          <Heading sx={{ variant: 'headings.h3' }}>
            Get the latest updates
          </Heading>
          <Text
            sx={{ variant: 'text.larger', maxWidth: '780px', color: 'colors' }}
          >
            Subscribe to our newsletter and get all updates straight to your
            mailbox!
          </Text>
          <MailchimpSignup />
          <Text sx={{ variant: 'text.overline' }}>From our Blog</Text>
          <Grid columns={[[1, 2, 2], 'auto auto']} sx={{ maxWidth: '80vw' }}>
            {/**
             * Map medium content nodes from node Object and destructure to variables
             * */}
            {mediumPosts?.map(node => {
              return (
                <Grid
                  columns={(1, 'auto')}
                  rows={6}
                  key={node.guid}
                  sx={{ maxWidth: '500px' }}
                  p={[2, 0, 0]}
                >
                  <Text
                    as='a'
                    href={node.link}
                    target='_blank'
                    rel='noopener noreferrer'
                    sx={{
                      variant: 'headings.h5',
                      color: 'secondary',
                      textDecoration: 'none'
                    }}
                  >
                    {node.title}
                  </Text>
                  <Text sx={{ variant: 'text.large', color: 'secondary' }}>
                    {/* {previewContent.subtitle} */}
                  </Text>
                  <Grid rows={2} gap={0}>
                    <Text sx={{ variant: 'text.medium', color: 'bodyDark' }}>
                      {node.author}
                    </Text>

                    <Text sx={{ variant: 'text.medium', color: 'bodyDark' }}>
                      {/* {new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit'
                      }).format(node?.pubDate)} */}
                      {dayjs(node.pubDate).format('ll')}
                      {/* {meta} */}
                    </Text>
                  </Grid>
                  <Text
                    as='a'
                    href={node.link}
                    target='_blank'
                    rel='noopener noreferrer'
                    sx={{ variant: 'links.readmore' }}
                  >
                    Read more
                  </Text>
                </Grid>
              )
            })}
          </Grid>
        </Main>
      </Container>
    </React.Fragment>
  )
}

const Main = styled(Grid)`
  position: relative;
`

const Container = styled(Box)`
  margin: 0 auto;
  max-width: 1440px;
`

export default UpdatesSection
