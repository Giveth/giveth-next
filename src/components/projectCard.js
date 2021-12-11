import React, { useState, useEffect, useContext } from 'react'
import { Heading, Box, Button, Card, Flex, Text } from 'theme-ui'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import styled from '@emotion/styled'
import { useApolloClient } from '@apollo/client'
import { BsHeartFill } from 'react-icons/bs'
import { FaShareAlt } from 'react-icons/fa'

import theme from '../utils/theme-ui/index'
import { TOGGLE_PROJECT_REACTION } from '../apollo/gql/projects'
import { PopupContext } from '../contextProvider/popupProvider'
import { Context as Web3Context } from '../contextProvider/Web3Provider'
import LevitatingCard from './hoc/levitatingCard'
import projectBadge from './projectBadge'
import { isNewProject } from '../lib/helpers'
// import Donate from '../components/donateForm'

const env = process.env.NEXT_PUBLIC_ENVIRONMENT
const isDev = env === 'dev'

const RichTextViewer = dynamic(() => import('./richTextViewer'), {
  ssr: false
})

const Categories = ({ categories }) => {
  const BadgeContent = ({ index, name }) => {
    const isGivingBlock = name === 'the-giving-block'
    return (
      <Badge key={index} isGivingBlock={isGivingBlock}>
        <Text
          sx={{ variant: 'text.paragraph', fontSize: 1 }}
          style={{
            color: theme.colors.bodyLight,
            textTransform: 'uppercase'
          }}
        >
          {isGivingBlock ? <img src='/images/thegivingblock.svg' /> : name}
        </Text>
      </Badge>
    )
  }
  return categories?.length
    ? categories.map((category, index) => {
        if (!category) return null
        return <BadgeContent key={category.name} index={index} name={category.name} />
      })
    : null
}

const ProjectCard = props => {
  const {
    state: { user },
    actions: { showSign }
  } = useContext(Web3Context)
  const usePopup = useContext(PopupContext)
  const client = useApolloClient()

  const { project, fromViewStyle, isATrace } = props

  const isGivingBlock = project?.givingBlocksId
  const [altStyle, setAltStyle] = useState(false)
  const [heartedByUser, setHeartedByUser] = useState(null)
  const [heartedCount, setHeartedCount] = useState(null)

  const reactToProject = async () => {
    try {
      const reaction = await client?.mutate({
        mutation: TOGGLE_PROJECT_REACTION,
        variables: {
          reaction: 'heart',
          projectId: parseFloat(project?.id)
        }
      })

      const { data } = reaction
      const { toggleProjectReaction } = data
      const { reaction: hearted, reactionCount } = toggleProjectReaction
      setHeartedCount(reactionCount)
      setHeartedByUser(hearted)
    } catch (err) {
      showSign()
    }
  }

  useEffect(() => {
    if (project) setHeartedCount(project.reactions?.length)
    if (user) setHeartedByUser(project?.reactions?.find(r => r.userId === user.id))
  }, [project, user])

  const image = props?.image || project?.image

  return (
    <Box
      key={props.listingId + '_box'}
      style={{ width: '100%' }}
      onMouseOver={() => setAltStyle(true)}
      onMouseLeave={() => setAltStyle(false)}
    >
      <LevitatingCard steady>
        <CardContainer
          key={props.listingId || project?.title + '_card'}
          sx={{
            border: isATrace ? `1px solid rgba(44, 13, 83, 0.2)` : null,
            boxShadow: altStyle ? '0px 28px 52px rgba(44, 13, 83, 0.2)' : null
          }}
        >
          <Link
            // href={
            //   project?.fromTrace
            //     ? `https://trace.giveth.io/campaign/${project?.slug}`
            //     : `/project/${props?.slug || project?.slug || ''}`
            // }
            href={isATrace ? isATrace : `/project/${props?.slug || project?.slug || ''}`}
            passHref
          >
            <a
              target={project?.fromTrace ? '_blank' : null}
              rel={project?.fromTrace ? 'noopener noreferrer' : null}
            >
              {/^\d+$/.test(image) ? (
                <div
                  key={props.listingId || project?.title + '_div'}
                  src={image}
                  style={{
                    width: '100%',
                    height: '186px',
                    margin: '0 auto',
                    cursor: 'pointer',
                    borderRadius: '12px 12px 0px 0px',
                    // backgroundImage: /^\d+$/.test(image)
                    //   ? `url('/assets/create/projectImageGallery${image.toString()}.svg')`
                    //   : `${image}`,
                    backgroundImage: `url('/assets/create/projectImageGallery${image.toString()}.svg')`,
                    backgroundColor: '#cccccc',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    position: 'relative'
                  }}
                />
              ) : (
                image && (
                  <div
                    style={{
                      width: '100%',
                      height: '186px',
                      margin: '0 auto',
                      cursor: 'pointer',
                      borderRadius: '12px 12px 0px 0px',
                      backgroundColor: '#cccccc',
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      position: 'relative'
                    }}
                  >
                    <StyledImage
                      src={image}
                      layout='fill'
                      priority={true}
                      quality={40}
                      isGivingBlockProject={project?.givingBlocksId}
                      // placeholder='blur'
                      // blurDataURL='/images/giveth_bg.jpg'
                    />
                  </div>
                )
              )}
            </a>
          </Link>

          <div style={{ position: 'relative' }}>
            {project?.traceCampaignId
              ? projectBadge('TRACEABLE')
              : project?.verified
              ? projectBadge('VERIFIED')
              : isNewProject(project?.creationDate)
              ? projectBadge('NEW')
              : null}

            {!project?.fromTrace ? (
              <Options>
                <Flex sx={{ alignItems: 'center' }}>
                  <BsHeartFill
                    style={{ cursor: 'pointer' }}
                    size='18px'
                    color={heartedByUser ? theme.colors.red : theme.colors.muted}
                    onClick={reactToProject}
                  />
                  {heartedCount && (
                    <Text sx={{ variant: 'text.default', ml: 2 }}>{heartedCount}</Text>
                  )}
                </Flex>

                <Flex sx={{ alignItems: 'center', ml: 3 }}>
                  <FaShareAlt
                    style={{ cursor: 'pointer' }}
                    onClick={() =>
                      usePopup?.triggerPopup('share', {
                        title: project?.title,
                        description: project?.description,
                        slug: project?.slug
                      })
                    }
                    size='18px'
                    color={theme.colors.muted}
                  />
                </Flex>
              </Options>
            ) : null}
          </div>

          <Heading
            sx={{ variant: 'headings.h6' }}
            style={{
              padding: '2.5rem 1rem 0 1rem',
              width: '260',
              height: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              color: theme.colors.secondary
            }}
            key={props.listingId + '_heading'}
          >
            {props.name || project?.title}
            <Text
              sx={{ variant: 'text.default' }}
              style={{
                color: theme.colors.primary,
                alignSelf: 'center',
                minHeight: '28px',
                lineHeight: '150%',
                paddingTop: '4px'
              }}
            >
              {''}
            </Text>
          </Heading>
          {altStyle && (
            <AltCardContent>
              <Givers>
                {/* <Text sx={{ variant: 'text.default' }}>GIVERS: 24</Text>
              <Text sx={{ variant: 'text.default' }}>DONATIONS: 65</Text> */}
              </Givers>
              <Link
                // href={
                //   project?.fromTrace
                //     ? `https://trace.giveth.io/campaign/${project?.slug}`
                //     : `/project/${props?.slug || project?.slug || ''}`
                // }
                href={isATrace ? isATrace : `/project/${props?.slug || project?.slug || ''}`}
                passHref
              >
                <a
                  target={project?.fromTrace ? '_blank' : null}
                  rel={project?.fromTrace ? 'noopener noreferrer' : null}
                >
                  <Button sx={{ width: '100%', variant: 'buttons.default', mt: 2 }}>
                    Learn More
                  </Button>
                </a>
              </Link>
              {!isATrace && (
                <Link
                  href={
                    project?.fromTrace
                      ? `https://${isDev ? 'develop' : 'trace'}.giveth.io/campaign/${project?.slug}`
                      : !props.disabled && `/donate/${props?.slug || project?.slug}`
                  }
                  passHref
                >
                  <a style={{ marginTop: 2, marginBottom: 2 }}>
                    <Text
                      sx={{
                        variant: 'links.default',
                        my: 2,
                        mx: 'auto',
                        cursor: 'pointer',
                        color: theme.colors.primary
                      }}
                    >
                      Donate
                    </Text>
                  </a>
                </Link>
              )}
            </AltCardContent>
          )}
          <CardContent>
            <Text
              sx={{ variant: 'text.default' }}
              style={{
                fontSize: '16px',
                color: theme.colors.bodyDark,
                // textOverflow: 'ellipsis',
                // wordWrap: 'break-word',
                // whiteSpace: 'nowrap',
                overflow: 'hidden',
                height: '5rem',
                lineHeight: '1.2rem',
                display: '-webkit-box',
                WebkitLineClamp: '3',
                WebkitBoxOrient: 'vertical'
              }}
            >
              {fromViewStyle ? (
                project?.description
              ) : (
                <RichTextViewer
                  content={project?.description
                    ?.replace(/<img .*?>/g, '')
                    .replace(/<iframe .*?>/g, '')
                    .replace(/<[^>]*>/g, '')}
                />
              )}
              {
                /* Description String */
                // project?.description
              }
            </Text>
            <CardFooter isGivingBlock>
              <Categories categories={project?.categories} />
            </CardFooter>
          </CardContent>
        </CardContainer>
      </LevitatingCard>

      {
        // <Donate
        //   maxAmount={balance}
        //   doDonate={values => alert('donating' + values.amount)}
        // />
      }
    </Box>
  )
}

const CardContainer = styled(Card)`
  position: relative;
  z-index: 0;
  background-color: ${theme.colors.background};
  margin-bottom: 30px;
  border-radius: 12px;
  width: 100%;
`

const CardContent = styled(Flex)`
  flex-direction: column;
  word-wrap: break-word;
  padding: 1rem;
`

const AltCardContent = styled.span`
  position: absolute;
  bottom: 0;
  display: flex;
  flex: 1;
  width: 100%;
  z-index: 2;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  padding: 0.5rem 1.5rem 1rem 1.5rem;
  text-align: center;
`

const Badge = styled.span`
  position: ${props => (props.isGivingBlock ? 'absolute' : 'relative')};
  left: ${props => (props.isGivingBlock ? '0' : 'none')};
  bottom: ${props => (props.isGivingBlock ? '-10px' : 'none')};
  padding: 3px 11.76px;
  margin: ${props => (props.isGivingBlock ? '1rem' : '0.4rem')};
  align-items: center;
  text-align: center;
  border: ${props => (props.isGivingBlock ? 'none' : `1px solid ${theme.colors.bodyLight}`)};
  border-radius: 48px;
  color: ${theme.colors.bodyLight};
`

const Options = styled.span`
  font-family: 'Red Hat Text', sans-serif;
  color: ${theme.colors.background};
  display: flex;
  position: absolute;
  align-items: center;
  bottom: -42px;
  right: 24px;
`

const CardFooter = styled.span`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: ${props => (props.isGivingBlock ? '3rem 0 2px 0' : '1rem 0')};
`

const Givers = styled.div`
  display: flex;
  flex-direction: row;
  align-self: center;
  margin: 1.2rem 0 0.5rem 0;
  div:first-child {
    border-right: 2px solid #edf0fa;
  }
  div {
    padding: 0 1rem;
  }
`

const StyledImage = styled(Image)`
  cursor: pointer;
  border-radius: 12px 12px 0px 0px;
  object-fit: cover;
  background: ${props => (props?.isGivingBlockProject ? 'white' : 'none')};
  object-fit: ${props => (props?.isGivingBlockProject ? 'contain' : 'cover')};
`

export default ProjectCard
