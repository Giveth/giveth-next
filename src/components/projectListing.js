import React from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Heading, Box, Card, Flex, Button, Text, Image } from 'theme-ui'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import NextImage from 'next/image'

import theme from '../utils/theme-ui/index'
import projectBadge from './projectBadge'
import { isNewProject } from '../lib/helpers'
// import Donate from '../components/donateForm'

// import iconShare from '../images/icon-share.svg'
// import iconHeart from '../images/icon-heart.svg'

const RichTextViewer = dynamic(() => import('./richTextViewer'), {
  ssr: false
})

const StyledImage = styled(NextImage)`
  cursor: pointer;
  border-radius: 12px 12px 0 0;
  background: ${props => (props.isgivingblockproject ? 'white' : 'none')};
  object-fit: ${props => (props.isgivingblockproject ? 'contain' : 'cover')};
`

const CardContainer = styled(Card)`
  position: relative;
  z-index: 0;
  background-color: ${theme.colors.background};
  margin-bottom: 30px;
  border-radius: 12px;
  width: 100%;
`

const ProjectCard = styled(Flex)`
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  min-height: 400px;
  border-radius: 12px;
  background-color: ${theme.colors.background};
  margin-bottom: 30px;
  z-index: 0;
`

const CardContent = styled.span`
  display: flex;
  flex: 1;
  word-wrap: break-word;
  padding: 0.5rem 1rem;
`

const Badge = styled.span`
  padding: 3px 11.76px;
  margin: ${props => (props.isGivingBlock ? '1rem' : '0.2rem')};
  align-items: center;
  border: ${props => (props.isGivingBlock ? 'none' : `1px solid ${theme.colors.bodyLight}`)};
  border-radius: 48px;
  color: ${theme.colors.bodyLight};
  position: ${props => (props.isGivingBlock ? 'absolute' : 'relative')};
  left: ${props => (props.isGivingBlock ? '0' : 'none')};
  bottom: ${props => (props.isGivingBlock ? '-10px' : 'none')};
`

const AltCardContent = styled.span`
  position: absolute;
  bottom: 0;
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  padding: 0.5rem 1.5rem 1rem 1.5rem;
`

// const Options = styled.span`
//   font-family: 'Red Hat Text', sans-serif;
//   color: ${theme.colors.background};
//   display: flex;
//   position: absolute;
//   align-items: center;
//   bottom: -54px;
//   right: 24px;
// `

const CardFooter = styled.span`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 1rem 0.5rem;
  margin: ${props => (props.isGivingBlock ? '3rem 0 2px 0' : '1rem 0')};
`

const Categories = ({ categories }) => {
  return categories.length
    ? categories.map((category, index) => {
        if (!category) return null
        const isGivingBlock = category?.name === 'the-giving-block'
        return (
          <Badge key={index} isGivingBlock={isGivingBlock}>
            <Text
              sx={{
                variant: 'text.default',
                fontSize: '10px',
                color: 'bodyLight',
                fontWeight: '500',
                textTransform: 'uppercase'
              }}
            >
              {isGivingBlock ? (
                <Image src='/images/thegivingblock.svg' alt='giving-block' />
              ) : (
                category?.name
              )}
            </Text>
          </Badge>
        )
      })
    : null
}

const ProjectListing = props => {
  const { project } = props
  const router = useRouter()
  const [hoverStyle, setHoverStyle] = React.useState(false)
  const image = props.image || '/images/no-image-available.jpg'
  const isGivingBlockProject = project?.givingBlocksId
  return (
    <Box
      key={props.listingId + '_box'}
      style={{
        width: '100%',
        flexDirection: 'row',
        cursor: props.wholeClickable ? 'pointer' : 'default'
      }}
      onMouseOver={() => setHoverStyle(true)}
      onMouseLeave={() => setHoverStyle(false)}
    >
      <CardContainer>
        <ProjectCard
          key={props.listingId + '_card'}
          onClick={() => {
            if (props.withEditHover) return
            if (props.wholeClickable)
              return router.push(`/project/${props?.project?.slug || props?.slug}`)
            if (hoverStyle) return
            !props.disabled &&
              (props?.action ? props.action() : router.push(`/donate/${props?.id}`))
          }}
          style={{
            cursor: props.wholeClickable
              ? 'pointer'
              : props.disabled || hoverStyle || props.withEditHover
              ? 'default'
              : 'pointer',
            border:
              props.disabled || props.transparentBorders ? null : `1px solid ${theme.colors.muted}`,
            boxShadow: props.shadowed || hoverStyle ? '0px 28px 52px rgba(44, 13, 83, 0.2)' : null
          }}
        >
          {/* need to add options from the gallery. */}
          <div key={props.listingId + '_div'} style={{ position: 'relative' }}>
            {/^\d+$/.test(image) ? (
              <div
                style={{
                  width: '100%',
                  height: '186px',
                  margin: '0 auto',
                  cursor: 'pointer',
                  borderRadius: '12px 12px 0px 0px',
                  backgroundImage: `url('/assets/create/projectImageGallery${image.toString()}.svg')`,
                  backgroundColor: '#cccccc',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  position: 'relative'
                }}
              />
            ) : props.image ? (
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
                  isgivingblockproject={isGivingBlockProject}
                />
              </div>
            ) : (
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
              />
            )}

            {project?.traceCampaignId
              ? projectBadge('TRACEABLE & VERIFIED')
              : project?.verified
              ? projectBadge('VERIFIED')
              : isNewProject(project?.creationDate)
              ? projectBadge('NEW')
              : null}
          </div>
          <Heading
            sx={{
              variant: 'headings.h6',
              padding: '2.5rem 1rem 0 1rem',
              width: '260',
              height: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              color: theme.colors.secondary
            }}
            key={props.listingId + '_heading'}
          >
            {props?.name}
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
              {/* {props?.description} */}
            </Text>
          </Heading>
          {props?.withEditHover && hoverStyle && (
            <AltCardContent>
              <Button
                sx={{
                  variant: 'buttons.nofill',
                  backgroundColor: 'secondary',
                  color: 'background',
                  mt: 2,
                  zIndex: 100
                }}
                onClick={() => {
                  props?.action()
                }}
              >
                EDIT
              </Button>
              <Link href={!props.disabled && `/project/${props?.slug}`} passHref>
                <a style={{ margin: 'auto', zIndex: 10 }}>
                  <Text
                    sx={{
                      variant: 'text.default',
                      cursor: 'pointer',
                      color: 'primary'
                    }}
                    // onClick={() => {
                    //   !props.disabled && router.push(`/project/${props?.slug}`)
                    // }}
                  >
                    View Project{' '}
                  </Text>
                </a>
              </Link>
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
                maxHeight: '6.4rem',
                lineHeight: '1.2rem',
                display: '-webkit-box',
                WebkitLineClamp: '3',
                WebkitBoxOrient: 'vertical'
              }}
            >
              <RichTextViewer
                content={
                  props?.description
                    ?.replace(/<img .*?>/g, '')
                    .replace(/<iframe .*?>/g, '')
                    .replace(/<[^>]*>/g, '') || ''
                }
              />
              {
                /* Description String */
                // props?.description
              }
            </Text>
          </CardContent>
          {props?.categories && props.categories.length > 0 && (
            <CardFooter isGivingBlock={project?.givingBlocksId}>
              <Categories categories={props?.categories} />
            </CardFooter>
          )}
        </ProjectCard>
        {
          // <Donate
          //   maxAmount={balance}
          //   doDonate={values => alert('donating' + values.amount)}
          // />
        }
      </CardContainer>
    </Box>
  )
}

export default ProjectListing
