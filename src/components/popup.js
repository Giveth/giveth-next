import React from 'react'
import { Button, Image, Flex, Text } from 'theme-ui'
import Link from 'next/link'
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon
} from 'react-share'

import { PopupContext } from '../contextProvider/popupProvider'
import CopyToClipboard from '../components/copyToClipboard'
import Modal from './modal'
import { switchNetwork } from '../lib/util'

const isDev = process.env.NEXT_PUBLIC_ENVIRONMENT === 'dev'

function ChangeNetworkPopup({ close, onlyMainnet }) {
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        textAlign: 'center',
        alignItems: 'center',
        py: 5,
        px: 4
      }}
    >
      <Text
        sx={{
          variant: 'text.default',
          cursor: 'pointer',
          position: 'absolute',
          right: '5%',
          top: '5%'
        }}
        onClick={close}
      >
        Close
      </Text>
      <Image
        src={'/images/decorator-exclamation.png'}
        style={{ alignSelf: 'center' }}
        alt='decorator-exclamation img'
      />
      <Flex sx={{ flexDirection: 'column', alignItems: 'center', mx: 4 }}>
        <Text color='secondary' variant='headings.h4' sx={{ pt: 4 }}>
          Please change the Network
        </Text>
        <Text color='secondary' variant='text.default' sx={{ width: '50%' }}>
          Please select the {isDev ? 'Ropsten' : 'Ethereum Mainnet'} {onlyMainnet ? '' : ' or xDAI'}{' '}
          network in your wallet and try again
        </Text>
      </Flex>
      <Button
        mt={4}
        sx={{
          variant: 'buttons.default',
          backgroundColor: 'secondary'
        }}
        style={{ padding: '17px 60px' }}
        onClick={() => {
          switchNetwork()
          close()
        }}
      >
        CHANGE NETWORK
      </Button>
      <Image
        src={'/images/worried_woman.png'}
        style={{ position: 'absolute', left: -60, bottom: 0, zIndex: -1 }}
        alt='worried woman img'
      />
    </Flex>
  )
}

function IncompleteProfilePopup({ close }) {
  return (
    <Flex
      sx={{
        alignItems: 'center',
        flexDirection: 'column',
        py: 5,
        textAlign: 'center'
      }}
    >
      <Image
        src={'/images/incomplete_profile.png'}
        style={{ width: '157px' }}
        alt='no-profile-bg'
      />
      <Text sx={{ variant: 'headings.h4', color: 'secondary', mt: 3 }}>
        Please complete your profile
      </Text>
      <Text
        sx={{
          variant: 'text.default',
          color: 'secondary',
          my: 3,
          width: '60%'
        }}
      >
        Please finish setting up your public profile with at least your name and e-mail before
        proceeding
      </Text>
      <Link href='/account'>
        <a>
          <Button
            mt={4}
            sx={{
              variant: 'buttons.default',
              backgroundColor: 'secondary'
            }}
            style={{ padding: '17px 60px' }}
          >
            COMPLETE PROFILE
          </Button>
        </a>
      </Link>
      <Text
        sx={{
          position: 'absolute',
          top: '15px',
          right: '32px',
          color: 'secondary',
          variant: 'text.default',
          cursor: 'pointer'
        }}
        onClick={close}
      >
        Close
      </Text>
    </Flex>
  )
}

function InsufficientFundsPopup({ close }) {
  return (
    <Flex
      sx={{
        flexDirection: 'column'
      }}
    >
      <Text
        sx={{
          variant: 'text.default',
          cursor: 'pointer',
          position: 'absolute',
          right: '5%',
          top: '5%'
        }}
        onClick={close}
      >
        Close
      </Text>
      <Flex
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          top: '5%',
          py: 4,
          my: 4,
          mx: 4,
          mb: 6
        }}
      >
        <Image
          src={'/images/exclamation.png'}
          alt='exclamation'
          style={{
            width: '110px'
          }}
        />
        <Text sx={{ variant: 'headings.h4', color: 'secondary', py: 2 }}>Insufficient Funds</Text>
        <Text sx={{ variant: 'text.default', color: 'secondary' }}>
          Please add funds to your wallet or switch to a different wallet.
        </Text>
        <Button
          mt={4}
          sx={{
            variant: 'buttons.default',
            backgroundColor: 'secondary'
          }}
          style={{ padding: '15px 80px' }}
          onClick={close}
        >
          Ok
        </Button>
      </Flex>
      <Image
        src={'/images/no_funds.png'}
        style={{
          width: '50%',
          position: 'absolute',
          right: -10,
          bottom: -10,
          zIndex: -1
        }}
        alt='signup-bg'
      />
    </Flex>
  )
}

function SharePopup() {
  const usePopup = React.useContext(PopupContext)
  const { value } = usePopup
  const { description, slug } = value?.extra
  const shareTitle = `Check out on @Givethio`
  const url = `${window.location.origin}/project/${slug}`

  return (
    <Flex
      sx={{
        flexDirection: 'column',
        p: 4,
        textAlign: 'center'
      }}
    >
      <Text sx={{ variant: 'text.large', color: 'secondary' }}>Share this project!</Text>
      <Flex
        sx={{
          pt: 4,
          justifyContent: 'space-around',
          '*': {
            outline: 'none'
          }
        }}
      >
        <TwitterShareButton title={shareTitle} url={url} hashtags={['giveth']}>
          <TwitterIcon size={40} round />
        </TwitterShareButton>
        <LinkedinShareButton title={shareTitle} summary={description} url={url}>
          <LinkedinIcon size={40} round />
        </LinkedinShareButton>
        <FacebookShareButton quote={shareTitle} url={url} hashtag='#giveth'>
          <FacebookIcon size={40} round />
        </FacebookShareButton>
      </Flex>
      <br />
      <CopyToClipboard size='18px' text={url}>
        <Text sx={{ variant: 'text.medium', color: 'bodyLight' }}>click to copy url</Text>
      </CopyToClipboard>
    </Flex>
  )
}

function Popup() {
  const usePopup = React.useContext(PopupContext)
  const { value, clearPopup } = usePopup

  const setView = () => {
    switch (value?.type) {
      case 'IncompleteProfile':
        return <IncompleteProfilePopup close={clearPopup} />
      case 'InsufficientFunds':
        return <InsufficientFundsPopup close={clearPopup} />
      case 'WrongNetwork':
        return <ChangeNetworkPopup close={clearPopup} onlyMainnet={value?.extra} />
      case 'share':
        return <SharePopup title={value?.extra?.title} description={value?.extra?.description} />
      default:
        return null
    }
  }

  return value ? (
    <Modal isOpen={value} onRequestClose={() => clearPopup()}>
      {setView()}
    </Modal>
  ) : null
}

export default Popup
