import React from 'react'
import { useRouter } from 'next/router'
import { Flex, Image, Grid, Text, Box, Button } from 'theme-ui'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import styled from '@emotion/styled'
import Seo from '../seo'
import SocialNetworks from './SocialNetworks'
import Layout from '../layout'
import ContentTeam from './ContentTeam'
import theme from '../../utils/theme-ui'

const DonateButton = styled(Button)`
  position: relative;
  top: -40px;
  border: 10px solid white;
`

const AboutPage = ({ about, team }) => {
  console.log({ about, team })

  const router = useRouter()

  // return null
  const [currentTab, setCurrentTab] = React.useState('mission')
  const richTextOptions = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: node => {
        const { title, description, file } = node.data.target.fields
        const mimeType = file['en-US'].contentType
        const mimeGroup = mimeType.split('/')[0]

        switch (mimeGroup) {
          case 'image':
            return (
              <img
                title={title ? title['en-US'] : null}
                alt={description ? description['en-US'] : null}
                src={file['en-US'].url}
              />
            )
          case 'application':
            return (
              <a
                alt={description ? description['en-US'] : null}
                href={file['en-US'].url}
              >
                {title ? title['en-US'] : file['en-US'].details.fileName}
              </a>
            )
          default:
            return (
              <span style={{ backgroundColor: 'black', color: 'white' }}>
                {' '}
                {mimeType} embedded asset{' '}
              </span>
            )
        }
      }
    }
  }
  return (
    <Layout>
      <Seo title='About us' />
      <Flex>
        <Image
          src='/images/giveth-team-image.jpg'
          alt='giveth team image'
          sx={{
            objectFit: 'cover',
            objectPosition: 'top',
            width: '85%',
            margin: 'auto',
            height: ['50vh', '300px', '600px'],
            borderRadius: '10px'
          }}
        />
      </Flex>
      <Flex
        sx={{
          width: ['90%', '90%', '80%'],
          flexDirection: ['column', 'row', 'row'],
          justifyContent: 'space-between',
          margin: 'auto'
        }}
      >
        <Grid rows={['2', '1', '1']} sx={{ width: ['100%', '100%', '50%'] }}>
          <Flex sx={{ mt: '20px', flexDirection: 'column' }}>
            <Text
              sx={{
                fontSize: 9,
                fontFamily: 'heading',
                fontWeight: 'bold',
                color: 'secondary'
              }}
            >
              {about?.length > 0 && about[0].title}
            </Text>
            <Text
              sx={{
                variant: 'text.large'
              }}
            >
              {about?.length > 0 && about[0].subtitle}
            </Text>
          </Flex>

          <Flex
            sx={{
              width: ['100%', '100%', '60%'],
              justifyContent: 'space-between',
              height: '60px',
              mt: '20px'
            }}
          >
            <Button
              variant='nofill'
              type='button'
              onClick={e => {
                e.preventDefault()
                setCurrentTab('mission')
              }}
            >
              <Text
                sx={{
                  color: '#303B72',
                  paddingBottom: '30px',
                  borderBottomColor:
                    currentTab === 'mission' ? '#C2449F' : null,
                  borderBottomStyle: currentTab === 'mission' ? 'solid' : null
                }}
              >
                Mission & Vision
              </Text>
            </Button>
            <Button
              variant='nofill'
              type='button'
              onClick={e => {
                e.preventDefault()
                setCurrentTab('history')
              }}
            >
              <Text
                sx={{
                  color: '#303B72',
                  paddingBottom: '30px',
                  borderBottomColor:
                    currentTab === 'history' ? '#C2449F' : null,
                  borderBottomStyle: currentTab === 'history' ? 'solid' : null
                }}
              >
                History
              </Text>
            </Button>
            <Button
              variant='nofill'
              type='button'
              onClick={e => {
                e.preventDefault()
                setCurrentTab('donation')
              }}
            >
              <Text
                sx={{
                  color: '#303B72',
                  paddingBottom: '30px',
                  borderBottomColor:
                    currentTab === 'donation' ? '#C2449F' : null,
                  borderBottomStyle: currentTab === 'donation' ? 'solid' : null
                }}
              >
                Team
              </Text>
            </Button>
          </Flex>
          <Grid sx={{ mt: '30px', mb: '60px' }}>
            {currentTab === 'mission' ? (
              <Text sx={{ variant: 'text.default' }}>
                {documentToReactComponents(
                  about?.length > 0 && about[0].missionandvision,
                  richTextOptions
                )}
              </Text>
            ) : currentTab === 'history' ? (
              <Text
                sx={{
                  fontSize: 3,
                  fontFamily: 'body',
                  fontWeight: 'body',
                  color: 'black'
                }}
              >
                {documentToReactComponents(
                  about?.length > 0 && about[0].history,
                  richTextOptions
                )}
              </Text>
            ) : (
              <Text
                sx={{
                  fontSize: 3,
                  fontFamily: 'body',
                  fontWeight: 'body',
                  color: 'black'
                }}
              >
                <ContentTeam headerdata={team} />
              </Text>
            )}
          </Grid>
        </Grid>
        <Flex
          sx={{
            mb: '30px',
            width: ['100%', '100%', '30%'],
            flexDirection: 'column',
            alignContent: 'center'
          }}
        >
          <DonateButton
            variant='default'
            sx={{
              paddingTop: '20px',
              paddingBottom: '20px'
            }}
            onClick={() => router.push(`/donate/${theme.donationSlug}`)}
          >
            <Text sx={{ color: 'background' }}>Support Giveth</Text>
          </DonateButton>

          {/* <Flex
            sx={{
              justifyContent: 'space-around',
              fontFamily: 'heading',
              textTransform: 'uppercase',
              my: '-20px',
              mb: '10px'
            }}
          >
            <Text>Givers: 24</Text>
            <Text>Donations: 65</Text>
          </Flex> */}
          <Flex pt={3} sx={{ justifyContent: 'center' }}>
            <Text
              sx={{
                variant: 'text.medium',
                color: 'secondary',
                textDecoration: 'none',
                mt: '10px'
              }}
            >
              Find us elsewhere
            </Text>
          </Flex>
          <Grid
            pt={2}
            sx={{
              gridTemplateColumns: 'repeat(4, auto)',
              fontSize: '40px',
              justifyContent: 'center',
              fontFamily: 'heading',
              '*': {
                outline: ' none'
              }
            }}
          >
            <SocialNetworks compressed />
          </Grid>
        </Flex>
      </Flex>

      {/* <pre>{JSON.stringify(pageContext, null, 2)}</pre> */}
    </Layout>
  )
}

export default AboutPage
