import React, { useContext } from 'react'
import { Box, Button, Input, Text, Flex } from 'theme-ui'
import Modal from 'react-modal'
import { useMutation } from '@apollo/client'
import { IoMdClose } from 'react-icons/io'
import { useForm } from 'react-hook-form'

import { UPDATE_USER } from '../../apollo/gql/auth'
import theme from '../../utils/theme-ui/index'
import Avatar from '../avatar'
import Toast from '../../components/toast'
import { Context as Web3Context } from '../../contextProvider/Web3Provider'
import { checkIfURLisValid } from '../../utils'

const InputBox = props => {
  const { title, placeholderText, name, register, errors, refExtras = null } = props
  return (
    <Box sx={{ mt: 3, mb: 2, width: '100%' }}>
      <Text
        variant='text.overlineSmall'
        sx={{ mb: 2, color: 'secondary', textTransform: 'uppercase' }}
      >
        {title}
      </Text>
      <Input
        name={name}
        {...register(name, refExtras)}
        sx={{
          width: '100%',
          fontFamily: 'body',
          py: 2,
          '::placeholder': {
            color: 'bodyLight',
            textTransform: 'capitalize'
          }
        }}
        type='text'
        placeholder={placeholderText}
        maxLength={100}
        // defaultValue={defaultValue}
        // onChange={e => setCharacterLength(e.target.value.length)}
      />
      {errors && errors[name] && <Text sx={{ mt: 1, color: 'red' }}>{errors[name].message}</Text>}
    </Box>
  )
}

function EditProfileModal(props) {
  const {
    state: { user, account },
    actions: { updateUser }
  } = useContext(Web3Context)

  const { register, handleSubmit, reset, errors } = useForm({
    // defaultValues: user
    defaultValues: React.useMemo(() => {
      return user
    }, [user])
  })
  const [updateUserInDB] = useMutation(UPDATE_USER)

  const onSubmit = async data => {
    try {
      const { firstName, lastName, location, email, url } = data
      if (!firstName && !lastName) {
        return Toast({
          content: 'Please fill at least one of first name or last name',
          type: 'error'
        })
      }
      if (!email)
        return Toast({
          content: 'Please fill the email address',
          type: 'error'
        })
      const newProfile = {
        firstName: firstName || '',
        lastName: lastName || '',
        location: location || '',
        email: email || '',
        url: url || ''
      }
      // Check url
      if (url) {
        const valid = await checkIfURLisValid(url)
        console.log({ valid })
        if (!valid)
          return Toast({
            content: `Your website is not valid or isn't reachable at the moment`,
            type: 'error'
          })
      }
      const { data: response, error } = await updateUserInDB({
        variables: newProfile
      })
      if (response?.updateUser === true) {
        props.onRequestClose()
        updateUser()
        reset(data)
        return Toast({
          content: 'Profile updated successfully',
          type: 'success'
        })
      } else {
        console.log({ error })
        return Toast({ content: 'There was an error', type: 'error' })
      }
    } catch (error) {
      console.log({ error })
      return Toast({
        content: error?.message || JSON.stringify(error),
        type: 'error'
      })
    }
  }

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
      style={customStyles}
      contentLabel={props.contentLabel}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex
          sx={{
            flexDirection: 'column',
            minWidth: '350px',
            p: 4,
            alignItems: 'center'
          }}
        >
          <Flex sx={{ mb: 2 }}>
            <Avatar img={user?.profileImage || user?.avatar} size={100} address={account} />
            <Flex sx={{ flexDirection: 'column', ml: '27px' }}>
              <Text sx={{ color: 'secondary', fontSize: 7 }}>{user?.name}</Text>
              <Text sx={{ color: 'bodyDark', fontSize: 3 }}>{user?.email}</Text>
            </Flex>
          </Flex>
          <InputBox
            title='First Name'
            name='firstName'
            placeholderText='First Name'
            errors={errors}
            register={register}
          />
          <InputBox
            title='Last Name'
            placeholderText='Last Name'
            name='lastName'
            errors={errors}
            register={register}
          />
          <InputBox
            title='Email'
            placeholderText='Email address'
            name='email'
            errors={errors}
            register={register}
            refExtras={{
              // required: 'Required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            }}
          />
          <InputBox
            title='Location'
            placeholderText='Location'
            name='location'
            errors={errors}
            register={register}
          />
          <InputBox
            title='Website or URL'
            placeholderText='website'
            name='url'
            errors={errors}
            register={register}
          />
          <Flex sx={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>
            <Button
              aria-label='edit profile'
              variant='small'
              sx={{
                mt: 4,
                mx: 'auto',
                py: 2,
                color: 'background',
                width: '50%',
                fontWeight: 'bold'
              }}
              type='submit'
            >
              SAVE
            </Button>
            <Button
              type='button'
              aria-label='Cancel'
              onClick={props.onRequestClose}
              sx={{
                mt: 4,
                fontSize: '3',
                width: '50%',
                fontFamily: 'body',
                color: 'secondary',
                background: 'unset',
                cursor: 'pointer'
              }}
            >
              Cancel
            </Button>
          </Flex>
          <IoMdClose
            onClick={props.onRequestClose}
            style={{
              cursor: 'pointer',
              position: 'absolute',
              top: '12px',
              right: '12px'
            }}
            size='20px'
            color={theme.colors.bodyLight}
          />
        </Flex>
      </form>
    </Modal>
  )
}

const customStyles = {
  overlay: {
    position: 'fixed',
    zIndex: 4,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    backdropFilter: 'blur(2px)',
    '-webkit-backdrop-filter': 'blur(2px)'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    borderRadius: '12px',
    borderColor: 'transparent',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: '0px 28px 52px rgba(44, 13, 83, 0.2)'
  }
}

export default EditProfileModal
