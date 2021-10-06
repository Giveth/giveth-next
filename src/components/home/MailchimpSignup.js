import { Grid, Button, Input, Flex, Text } from 'theme-ui'
import React, { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import Toast from '../../components/toast'
import SubscribedAnimation from '../animations/subscribed'
// import addToMailchimp from 'gatsby-plugin-mailchimp'

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

const MailchimpSignup = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = async e => {
    e?.preventDefault()
    if (email !== '') {
      if (!validateEmail(email))
        return Toast({
          content: `Please type a valid email`,
          type: 'error'
        })

      if (typeof window !== 'undefined') {
        try {
          await window.Autopilot.run('associate', {
            _simpleAssociate: true,
            Email: email
          })
        } catch (error) {
          console.log({ error })
        }
        setSubscribed(true)
      }
      return false
    } else {
      return Toast({
        content: `Please type a valid email`,
        type: 'error'
      })
    }
  }

  const isMobile = useMediaQuery({ query: '(max-width: 825px)' })

  const handleChange = e => {
    setEmail(e.target.value)
  }

  return (
    <>
      {!subscribed && !isMobile && (
        <Grid
          as='form'
          columns={[2, '1fr auto']}
          onSubmit={handleSubmit}
          sx={{ maxWidth: '780px' }}
          pt='30px'
          pb='100px'
        >
          <Input
            type='text'
            value={email}
            placeholder='Your email address'
            onChange={handleChange}
          />
          <Button
            sx={{ variant: 'buttons.default', minWidth: '180px' }}
            type='submit'
          >
            Subscribe
          </Button>
        </Grid>
      )}
      {!subscribed && isMobile && (
        <Grid as='form' rows={[2]} onSubmit={handleSubmit} pt='30px' pb='100px'>
          <Input
            type='text'
            value={email}
            placeholder='Your email address'
            onChange={handleChange}
          />
          <Button
            sx={{ variant: 'buttons.default', minWidth: '180px' }}
            type='submit'
          >
            Subscribe
          </Button>
        </Grid>
      )}
      {subscribed && !isMobile && (
        <Grid
          columns={[2, '60% auto']}
          sx={{
            maxWidth: '780px',
            alignItems: 'center',
            color: 'secondaryDark'
          }}
          pt='30px'
          pb='100px'
        >
          <Flex sx={{ flexDirection: 'column' }}>
            <Text
              sx={{
                variant: 'headings.h4',
                color: 'secondaryDark'
              }}
            >
              Thank you for subscribing!
            </Text>
            <Text
              sx={{
                variant: 'headings.h6',
                fontWeight: 'fontWeights.body',
                color: 'secondaryDark'
              }}
            >
              You will receive updates straight to your inbox.
            </Text>
          </Flex>
          <SubscribedAnimation size={isMobile ? 350 : 600} />
        </Grid>
      )}
      {subscribed && isMobile && (
        <Grid
          rows={[2, 'auto auto']}
          sx={{
            maxWidth: '780px',
            alignItems: 'center',
            color: 'secondaryDark'
          }}
          pt='30px'
          pb='100px'
        >
          <Flex sx={{ flexDirection: 'column' }}>
            <Text
              sx={{
                variant: 'headings.h5',
                color: 'secondaryDark',
                textAlign: 'center'
              }}
            >
              Thank you for subscribing!
            </Text>
            <Text
              sx={{
                variant: 'headings.h6',
                fontWeight: 'fontWeights.body',
                color: 'secondaryDark'
              }}
            >
              You will receive updates straight to your inbox.
            </Text>
          </Flex>
          <SubscribedAnimation size={isMobile ? 350 : 600} />
        </Grid>
      )}
    </>
  )
}

export default MailchimpSignup
