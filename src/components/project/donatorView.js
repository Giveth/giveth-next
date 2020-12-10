import React, { useState, useEffect } from 'react'
import { Flex, Image, Badge, Text, Box, Button } from 'theme-ui'
import SEO from '../seo'
import { getEtherscanTxs } from '../../utils'
import { ProjectContext } from '../../contextProvider/projectProvider'
import { TorusContext } from '../../contextProvider/torusProvider'

import testImg from '../../images/giveth-test-image.png'
import ProjectImageGallery1 from '../../images/svg/create/projectImageGallery1.svg'
import ProjectImageGallery2 from '../../images/svg/create/projectImageGallery2.svg'
import ProjectImageGallery3 from '../../images/svg/create/projectImageGallery3.svg'
import ProjectImageGallery4 from '../../images/svg/create/projectImageGallery4.svg'

import { Link } from 'gatsby'
import { useQuery, useApolloClient } from '@apollo/react-hooks'
import {
  GET_STRIPE_PROJECT_DONATIONS,
  GET_PROJECT_UPDATES
} from '../../apollo/gql/projects'
import styled from '@emotion/styled'

const DonationsTab = React.lazy(() => import('./donationsTab'))
const UpdatesTab = React.lazy(() => import('./updatesTab'))

const FloatingDonateView = styled(Flex)`
  @media screen and (max-width: 800px) {
    width: 80%;
    align-self: center;
    margin: 0 auto;
    bottom: 0;
  }
`

export const ProjectDonatorView = ({ pageContext }) => {
  const { user } = React.useContext(TorusContext)
  const [currentTab, setCurrentTab] = useState('description')
  const [totalDonations, setTotalDonations] = useState(null)
  const [totalGivers, setTotalGivers] = useState(null)
  const [isOwner, setIsOwner] = useState(false)
  const isSSR = typeof window === 'undefined'
  const client = useApolloClient()

  const { data } = useQuery(GET_STRIPE_PROJECT_DONATIONS, {
    variables: { projectId: pageContext?.project?.id }
  })

  const { currentProjectView, setCurrentProjectView } = React.useContext(
    ProjectContext
  )

  const project = pageContext?.project

  useEffect(() => {
    const firstFetch = async () => {
      try {
        // Add donations to current project store
        if (!project.walletAddress) return
        const cryptoTxs = await getEtherscanTxs(
          project.walletAddress,
          client,
          true
        )
        console.log({ cryptoTxs, data })
        let donations = []
        if (cryptoTxs) {
          donations = [
            data?.getStripeProjectDonations || null,
            ...cryptoTxs.txs
          ].filter(function (e) {
            return e
          })
        }

        // Get Updates
        const updates = await client?.query({
          query: GET_PROJECT_UPDATES,
          variables: {
            projectId: parseInt(project?.id),
            take: 100,
            skip: 0
          }
        })

        setCurrentProjectView({
          ...currentProjectView,
          ethBalance: cryptoTxs?.balance,
          donations,
          updates: updates?.data?.getProjectUpdates
        })
        setTotalDonations(donations?.length)
        setTotalGivers([...new Set(donations?.map(data => data?.donor))].length)
        setIsOwner(pageContext?.project?.admin === user.userIDFromDB)
      } catch (error) {
        console.log({ error })
      }
    }

    firstFetch()
  }, [])
  const showMap = process.env.OPEN_FOREST_MAP
    ? process.env.OPEN_FOREST_MAP
    : false

  const setImage = img => {
    if (/^\d+$/.test(img)) {
      // Is not url
      let svg = null
      const style = {
        objectFit: 'cover',
        // objectPosition: '100% 25%',
        width: '100%',
        height: '100%',
        margin: '0 5%',
        borderRadius: '10px'
      }
      switch (parseInt(img)) {
        case 1:
          svg = <ProjectImageGallery1 style={style} />
          break
        case 2:
          svg = <ProjectImageGallery2 style={style} />
          break
        case 3:
          svg = <ProjectImageGallery3 style={style} />
          break
        case 4:
          svg = <ProjectImageGallery4 style={style} />
          break
      }
      return svg
    } else {
      return false
    }
  }
  console.log({ currentProjectView })
  return (
    <>
      <SEO title={project?.title} />
      <Flex>
        {setImage(project?.image) || (
          <Image
            src={project?.image ? project?.image : testImg}
            onError={ev =>
              (ev.target.src =
                'https://miro.medium.com/max/4998/1*pGxFDKfIk59bcQgGW14EIg.jpeg')
            }
            sx={{
              objectFit: 'cover',
              // objectPosition: '100% 25%',
              width: '100vw',
              margin: '0 5%',
              height: '250px',
              borderRadius: '10px'
            }}
          />
        )}
      </Flex>
      <Flex
        sx={{
          width: '90%',
          flexDirection: ['column-reverse', 'row', 'row'],
          margin: 'auto',
          justifyContent: 'space-around'
        }}
      >
        <Box sx={{ width: ['100%', null, '70%'] }}>
          <Flex>
            <Box sx={{ mt: '20px' }}>
              <Text
                sx={{
                  fontSize: 9,
                  fontFamily: 'heading',
                  fontWeight: 'bold',
                  color: 'secondary'
                }}
              >
                {pageContext?.project?.title}
              </Text>
              <Text
                sx={{
                  fontSize: 6,
                  fontFamily: 'body',
                  fontWeight: 'body',
                  color: 'primary',
                  mt: '10px'
                }}
              ></Text>
            </Box>
          </Flex>
          {/*
          // NOTIFICATION BADGE
          <Flex
            sx={{
              my: '20px',
              alignItems: 'center',
              backgroundColor: '#F0F6FC',
              borderColor: '#3F91E4',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderRadius: '8px',
              padding: '16px'
            }}
          >
            <IconContext.Provider value={{ color: '#3F91E4' }}>
              <GrCircleInformation size='21px' />
              <Text
                sx={{
                  fontSize: 3,
                  fontFamily: 'body',
                  fontWeight: 'body',
                  color: '#3F91E4',
                  ml: '16px'
                }}
              >
                This is a notification banner to highlight some important
                information about the project.
              </Text>
            </IconContext.Provider>
          </Flex> */}
          <Flex
            sx={{
              width: ['100%', null, '60%'],
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              height: '60px',
              mt: '20px'
            }}
          >
            <Button
              variant='nofill'
              type='button'
              sx={{ width: ['25%', '100%'] }}
              onClick={e => {
                e.preventDefault()
                setCurrentTab('description')
              }}
            >
              <Text
                sx={{
                  color: '#303B72',
                  paddingBottom: '0.5rem',
                  borderBottomColor:
                    currentTab === 'description' ? '#C2449F' : null,
                  borderBottomStyle:
                    currentTab === 'description' ? 'solid' : null
                }}
              >
                Description
              </Text>
            </Button>
            <Button
              variant='nofill'
              type='button'
              sx={{ width: ['25%', '100%'] }}
              onClick={e => {
                e.preventDefault()
                setCurrentTab('updates')
              }}
            >
              <Text
                sx={{
                  color: '#303B72',
                  paddingBottom: '0.5rem',
                  borderBottomColor:
                    currentTab === 'updates' ? '#C2449F' : null,
                  borderBottomStyle: currentTab === 'updates' ? 'solid' : null
                }}
              >
                Updates
                {currentProjectView?.updates ? (
                  <Badge variant='blueDot' sx={{ ml: [-2, 2] }}>
                    <Text sx={{ color: 'white', pt: -2 }}>
                      {currentProjectView?.updates.length}{' '}
                    </Text>
                  </Badge>
                ) : (
                  ''
                )}
              </Text>
            </Button>
            <Button
              variant='nofill'
              type='button'
              sx={{ width: ['25%', '100%'] }}
              onClick={e => {
                e.preventDefault()
                setCurrentTab('donation')
              }}
            >
              <Text
                sx={{
                  color: '#303B72',
                  paddingBottom: '0.5rem',
                  borderBottomColor:
                    currentTab === 'donation' ? '#C2449F' : null,
                  borderBottomStyle: currentTab === 'donation' ? 'solid' : null
                }}
              >
                Donations{' '}
                {currentProjectView?.donations
                  ? `( ${currentProjectView?.donations.length} )`
                  : ''}
              </Text>
            </Button>
          </Flex>
          <Box sx={{ mt: '30px' }}>
            {currentTab === 'description' ? (
              <>
                <Text
                  sx={{
                    mb: 4,
                    fontSize: 3,
                    fontFamily: 'body',
                    fontWeight: 'body',
                    color: 'black'
                  }}
                >
                  {pageContext?.project?.description}
                </Text>
              </>
            ) : currentTab === 'updates' && !isSSR ? (
              <React.Suspense fallback={<div />}>
                <UpdatesTab project={project} isOwner={isOwner} />
              </React.Suspense>
            ) : (
              !isSSR && (
                <React.Suspense fallback={<div />}>
                  <DonationsTab project={project} />
                </React.Suspense>
              )
            )}
          </Box>
        </Box>
        <FloatingDonateView
          sx={{
            left: '-5%',
            p: 2,
            pb: 4,
            marginTop: '-2rem',
            borderRadius: '30px',
            width: ['100%', '50%', '20%'],
            flexDirection: 'column',
            alignContent: 'center',
            backgroundColor: 'white',
            position: ['fixed', 'relative', 'relative'],
            bottom: [0, null, null],
            zIndex: [2, null]
          }}
        >
          <Button
            variant='default'
            sx={{
              paddingTop: '20px',
              paddingBottom: '20px',
              backgroundColor: isOwner && 'secondary'
            }}
            onClick={() =>
              isOwner
                ? window.location.replace('/account')
                : window.location.replace(`/donate/${project?.slug}`)
            }
          >
            {isOwner ? 'Edit' : 'Donate'}
          </Button>
          <Flex
            sx={{
              justifyContent: 'space-around',
              fontFamily: 'heading',
              textTransform: 'uppercase',
              my: '20px'
            }}
          >
            <Text>Givers: {totalGivers}</Text>
            <Text sx={{ pl: 4, borderLeft: '2px solid #edf0fa' }}>
              Donations: {totalDonations}
            </Text>
          </Flex>
          <Flex sx={{ justifyContent: 'space-evenly' }}>
            {project?.categories.length > 0 &&
              project?.categories.map((category, index) => {
                return (
                  <Text
                    key={index}
                    sx={{
                      color: 'primary',
                      borderColor: 'primary',
                      borderStyle: 'solid',
                      borderWidth: '1px',
                      display: 'inline',
                      fontSize: 1,
                      fontFamily: 'body',
                      mt: '9px',
                      backgroundColor: 'white',
                      borderRadius: '18px',
                      paddingY: 1,
                      paddingX: 2,
                      textAlign: 'center'
                    }}
                  >
                    {category?.name?.toUpperCase()}
                  </Text>
                )
              })}
          </Flex>

          <Flex sx={{ justifyContent: 'center' }}>
            <Link to='/projects'>
              <Text
                sx={{
                  variant: 'text.medium',
                  color: 'primary',
                  textDecoration: 'none',
                  mt: '10px'
                }}
              >
                View similar projects
              </Text>
            </Link>
          </Flex>
        </FloatingDonateView>
      </Flex>
      {showMap ? (
        <iframe
          width='100%'
          height='600'
          src='https://explorer.land/embed/project/balam1'
          frameborder='0'
          allowfullscreen
        ></iframe>
      ) : null}
      {/* <pre>{JSON.stringify(pageContext, null, 2)}</pre> */}
    </>
  )
}
