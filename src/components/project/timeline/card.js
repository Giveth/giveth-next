import React, { useState, useEffect, useContext } from 'react'
import { Avatar, Heading, Badge, Box, Button, Card, IconButton, Input, Flex, Text } from 'theme-ui'
import dynamic from 'next/dynamic'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import Jdenticon from 'react-jdenticon'
import styled from '@emotion/styled'
import { useApolloClient } from '@apollo/client'

import ConfirmationModal from '../../confirmationModal'
import { GET_USER } from '../../../apollo/gql/auth'
import {
  TOGGLE_UPDATE_REACTION,
  EDIT_PROJECT_UPDATE,
  DELETE_PROJECT_UPDATE
} from '../../../apollo/gql/projects'
import Toast from '../../../components/toast'
import theme from '../../../utils/theme-ui'
import DarkClouds from '../../../images/svg/general/decorators/dark-clouds.svg'
import { Context as Web3Context } from '../../../contextProvider/Web3Provider'

// import RichTextViewer from '../../richTextViewer'

const RichTextViewer = dynamic(() => import('../../richTextViewer'), {
  ssr: false
})
const RichTextInput = dynamic(() => import('../../richTextInput'), {
  ssr: false
})

dayjs.extend(localizedFormat)

const CardContainer = styled(Card)`
  position: relative;
  background-color: ${theme.colors.background};
  border: 1px solid ${theme.colors.muted};
  box-sizing: border-box;
  border-radius: 12px;
  margin: 0.5rem 0;
  width: 100%;
`
const SpecialCardContainer = styled(Flex)`
  width: 100%;
  min-height: 240px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  background-color: ${theme.colors.secondary};
  border: 1px solid ${theme.colors.muted};
  box-sizing: border-box;
  border-radius: 12px;
  margin: 0.5rem 0;
`

const CardContent = styled(Flex)`
  flex: 1;
  flex-direction: column;
  word-wrap: break-word;
  padding: 0.5rem 1.5rem 0 1.5rem;
`

const CardFooter = styled.span`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin: -0.5rem 0 0.5rem 0;
  padding: 0 1rem;
`
const Top = styled(Flex)`
  padding: 0.5rem 0 1rem 0;
  justify-content: space-between;
`

const Creator = styled(Flex)`
  text-align: center;
  align-items: center;
  margin: 1rem 0;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`
const CreatorName = styled(Flex)`
  align-items: center;
  flex-direction: row;
`

const RaisedHandsImg = styled.img`
  position: absolute;
  bottom: 0;
  right: 24px;
  @media (max-width: 800px) {
    display: none;
    align-items: flex-start;
  }
`

const TimelineCard = props => {
  const {
    state: { user: currentUser },
    actions: { showSign }
  } = useContext(Web3Context)

  const client = useApolloClient()

  const { content, reactions, number, isOwner } = props

  const [currentContent, setCurrentContent] = useState('')
  const [newTitle, setNewTitle] = useState(undefined)
  const [newInput, setNewInput] = useState('')
  const [editInput, setEditInput] = useState('')
  const [editTitle, setEditTitle] = useState(props?.content?.title)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [user, setUser] = useState(undefined)

  const isSSR = typeof window === 'undefined'

  const react = async () => {
    try {
      await client?.mutate({
        mutation: TOGGLE_UPDATE_REACTION,
        variables: {
          reaction: 'heart',
          updateId: parseFloat(props?.content?.id)
        },
        refetchQueries: [
          {
            query: props?.refreshQuery,
            variables: {
              projectId: parseFloat(props?.project?.id),
              take: 100,
              skip: 0
            }
          }
        ]
      })
      // return Toast({ content: 'You liked it!', type: 'success' })
      return true
    } catch (error) {
      console.log({ error })
    }
  }

  const likedByUser = reactions?.find(r => r?.userId === user?.id)

  const editUpdate = async () => {
    try {
      if (editInput === props?.content?.content && editTitle === props?.content?.title)
        return setOpenEdit(false)
      await client?.mutate({
        mutation: EDIT_PROJECT_UPDATE,
        variables: {
          content: editInput,
          title: editTitle,
          updateId: parseFloat(props?.content?.id)
        }
      })
      setOpenEdit(false)
      setCurrentContent(editInput)
      return Toast({
        content: 'Project update successfully edited',
        type: 'success'
      })
    } catch (error) {
      console.log({ error })
      return Toast({
        content: JSON.stringify(error),
        type: 'error'
      })
    }
  }

  const deleteUpdate = async () => {
    try {
      await client?.mutate({
        mutation: DELETE_PROJECT_UPDATE,
        variables: {
          updateId: parseFloat(props?.content?.id)
        },
        refetchQueries: [
          {
            query: props?.refreshQuery,
            variables: {
              projectId: parseFloat(props?.project?.id),
              take: 100,
              skip: 0
            }
          }
        ]
      })
      setConfirmDelete(false)
      return Toast({
        content: 'Project update deleted successfully',
        type: 'success'
      })
    } catch (error) {
      console.log({ error })
      return Toast({
        content: JSON.stringify(error),
        type: 'error'
      })
    }
  }

  useEffect(() => {
    const setup = async () => {
      if (props?.specialContent || !props?.content) return
      try {
        const userInfo = await client?.query({
          query: GET_USER,
          variables: {
            userId: parseInt(props?.content?.userId)
          }
        })
        setUser(userInfo?.data?.user)
        setEditInput(props?.content?.content)
      } catch (error) {
        console.log({ error })
      }
    }
    setup()
  }, [])

  useEffect(() => {
    setCurrentContent(props?.content?.content)
  }, [props])

  if (props.newUpdateOption) {
    return (
      <Box style={{ width: '100%' }}>
        <CardContainer>
          <Input
            variant='longInput'
            sx={{
              width: '100%',
              variant: 'headings.h3',
              color: 'secondary',
              padding: '1.125rem 0 0 1rem',
              '&::placeholder': {
                variant: 'headings.h3',
                color: 'bodyLight'
              }
            }}
            type='text'
            placeholder='Title'
            value={newTitle}
            onChange={e => {
              e.preventDefault()
              setNewTitle(e.target.value)
            }}
          />
          {/* <Textarea
            variant='longInput'
            rows={4}
            sx={{
              width: '100%',
              fontFamily: 'body',
              padding: '1.125rem 1rem',
              resize: 'none',
              '&::placeholder': {
                variant: 'body',
                color: 'bodyLight'
              }
            }}
            type='text'
            placeholder='Write your update...'
            value={newInput}
            onChange={e => setNewInput(e.target.value)}
          /> */}
          {!isSSR && (
            <React.Suspense fallback={<div />}>
              <RichTextInput
                projectId={props?.projectId}
                style={{
                  width: '100%',
                  height: '400px',
                  fontFamily: 'body',
                  padding: '1.125rem 1rem',
                  borderRadius: '12px',
                  resize: 'none',
                  '&::placeholder': {
                    variant: 'body',
                    color: 'bodyLight'
                  }
                }}
                value={newInput}
                placeholder='Write your update...'
                onChange={setNewInput}
              />
            </React.Suspense>
          )}
          <Flex sx={{ my: 2, mx: 3, justifyContent: 'flex-end' }}>
            <Button
              sx={{
                cursor: 'pointer',
                variant: 'buttons.small',
                background: 'none',
                color: 'primary',
                marginTop: '3rem',
                zIndex: 5
              }}
              onClick={async () => {
                try {
                  if (currentUser && !currentUser.token) return showSign()

                  const res = await props.newUpdateOption({
                    title: newTitle,
                    content: newInput
                  })
                  if (res && res?.addProjectUpdate !== false) {
                    setNewTitle('')
                    setNewInput('')
                    Toast({
                      content: 'Project update added successfully',
                      type: 'success'
                    })
                  }
                } catch (error) {
                  Toast({
                    content: JSON.stringify(error),
                    type: 'error'
                  })
                }
              }}
            >
              <Text variant='text.bold'>SUBMIT</Text>
            </Button>
          </Flex>
        </CardContainer>
      </Box>
    )
  }
  if (props.specialContent) {
    return (
      <Box style={{ width: '100%' }}>
        <SpecialCardContainer>
          <DarkClouds style={{ position: 'absolute', top: '41px', left: '42px' }} />
          <Box
            sx={{
              width: '60%',
              pb: 2,
              pt: 4,
              textAlign: 'center',
              alignSelf: 'center'
            }}
          >
            <Text sx={{ variant: 'headings.h4', color: 'background' }}>
              {props?.specialContent?.title}
            </Text>
          </Box>

          <Text
            sx={{
              variant: 'text.default',
              pb: 4,
              color: 'bodyLight'
            }}
          >
            {props?.specialContent?.content}
          </Text>
          <RaisedHandsImg src={'/images/decorator-raised-hands.png'} />
        </SpecialCardContainer>
      </Box>
    )
  }
  return (
    <Box style={{ width: '100%' }}>
      {confirmDelete && (
        <div style={{ position: 'absolute', zIndex: 100 }}>
          <ConfirmationModal
            showModal={confirmDelete}
            setShowModal={() => setConfirmDelete(false)}
            title='Are you sure you want to delete this update?'
            confirmation={{
              do: () => deleteUpdate(),
              title: 'Yes'
            }}
          />
        </div>
      )}
      <CardContainer>
        <Heading
          sx={{ variant: 'headings.h4' }}
          style={{
            padding: '1rem 1rem 0 1.5rem',
            width: '260',
            height: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            color: theme.colors.secondary
          }}
          key={props.listingId + '_heading'}
        >
          <Top>
            <Text sx={{ variant: 'text.small', color: 'bodyLight' }}>Update # {number}</Text>
          </Top>
          {!openEdit && content?.title}
        </Heading>
        <CardContent>
          {user && (
            <Creator>
              <CreatorName>
                {user?.avatar ? (
                  <Avatar src={user?.avatar} />
                ) : (
                  <Jdenticon size='24' value={user?.walletAddress} />
                )}
                <Text
                  sx={{
                    variant: 'text.paragraph',
                    color: 'secondary',
                    mx: 2
                  }}
                >
                  {user?.name || ''}
                </Text>
              </CreatorName>
              <Badge variant='altOutline' sx={{ mt: [2, 0, 0] }}>
                Creator
              </Badge>
            </Creator>
          )}
          {openEdit ? (
            <>
              <Input
                variant='longInput'
                sx={{
                  width: '100%',
                  variant: 'headings.h3',
                  color: 'secondary',
                  padding: '1.125rem 0 0 1rem',
                  '&::placeholder': {
                    variant: 'headings.h3',
                    color: 'bodyLight'
                  }
                }}
                type='text'
                placeholder='Title'
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
              />
              <RichTextInput
                projectId={props?.projectId}
                style={{
                  width: '100%',
                  height: '300px',
                  fontFamily: 'body',
                  padding: '1.125rem 1rem',
                  borderRadius: '12px',
                  marginBottom: '80px',
                  resize: 'none',
                  '&::placeholder': {
                    variant: 'body',
                    color: 'bodyLight'
                  }
                }}
                value={editInput}
                placeholder='Write your update...'
                onChange={setEditInput}
              />
            </>
          ) : (
            <RichTextViewer content={currentContent} />
          )}
        </CardContent>
        <CardFooter>
          <div>
            <IconButton onClick={react} sx={{ cursor: 'pointer' }}>
              <img
                src='/images/icon-heart.svg'
                alt=''
                style={{
                  '-webkit-filter': likedByUser
                    ? 'invert(40%) grayscale(100%) brightness(40%) sepia(100%) hue-rotate(-50deg) saturate(400%) contrast(2)'
                    : null
                }}
              />
            </IconButton>
            <Text sx={{ variant: 'text.default', ml: -2 }}>
              {' '}
              {reactions?.length > 0 ? reactions?.length : ''}{' '}
            </Text>
          </div>
          {isOwner && (
            <Flex>
              <Button
                sx={{
                  cursor: 'pointer',
                  variant: 'buttons.small',
                  background: 'none',
                  color: 'red',
                  zIndex: 5,
                  marginRight: 2
                }}
                onClick={() => {
                  if (openEdit) {
                    setEditInput(currentContent)
                    return setOpenEdit(false)
                  } else {
                    currentUser && !currentUser.token ? showSign() : setConfirmDelete(true)
                  }
                }}
              >
                <Text variant='text.bold'>{openEdit ? 'CANCEL' : 'DELETE'}</Text>
              </Button>
              <Button
                sx={{
                  cursor: 'pointer',
                  variant: 'buttons.small',
                  background: 'none',
                  color: 'primary',
                  zIndex: 5
                }}
                onClick={async () => {
                  if (!openEdit) {
                    return setOpenEdit(true)
                  } else {
                    currentUser && !currentUser.token ? showSign() : editUpdate()
                  }
                }}
              >
                <Text variant='text.bold'>{openEdit ? 'SAVE' : 'EDIT'}</Text>
              </Button>
            </Flex>
          )}
        </CardFooter>
      </CardContainer>
      {
        // <Donate
        //   maxAmount={balance}
        //   doDonate={values => alert('donating' + values.amount)}
        // />
      }
    </Box>
  )
}

export default TimelineCard
