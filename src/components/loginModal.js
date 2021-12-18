import React, { useContext } from 'react'
import styled from '@emotion/styled'
import Modal from 'react-modal'
import { Image } from 'theme-ui'

import { Gray_300, Primary_Deep_800, Primary_Deep_900 } from './styled-components/Colors'
import { H3, Body_P, H5 } from './styled-components/Typography'
import { Button } from './styled-components/Button'
import { Shadow } from './styled-components/Shadow'
import { FlexCenter } from './styled-components/Grid'
import { Context as Web3Context } from '../contextProvider/Web3Provider'

const LoginModal = ({ showModal, closeModal }) => {
  const {
    state: { isEnabled },
    actions: { switchWallet, showWalletModal, signIn }
  } = useContext(Web3Context)

  const loginContent = () => {
    return (
      <>
        <H3>Sign in to Giveth</H3>
        <Body_P>Please Sign in to your account to start using Giveth.</Body_P>
        <Ethereum
          onClick={() => {
            showWalletModal()
            closeModal()
          }}
        >
          <Image src={'/images/ethereum.svg'} alt={'ethereum'} />
          <Body_P bold>Sign in with Ethereum</Body_P>
        </Ethereum>
        <Break>
          <Line />
          <Body_P>or</Body_P>
          <Line />
        </Break>
        <Torus
          onClick={() => {
            switchWallet('Torus')
            closeModal()
          }}
        >
          {torusArray.map(i => (
            <EntityCard key={i.name}>
              <Image src={i.icon} alt={i.name} />
            </EntityCard>
          ))}
        </Torus>
      </>
    )
  }

  const signContent = () => {
    return (
      <>
        <H5>Please Sign with your wallet to authenticate</H5>
        <Button
          onClick={() => {
            signIn()
            closeModal()
          }}
          style={{ margin: 'auto' }}
        >
          SIGN
        </Button>
      </>
    )
  }

  if (!showModal) return null
  Modal.setAppElement('body')
  return (
    <Modal isOpen={showModal} onRequestClose={closeModal} style={customStyles}>
      <CloseButton onClick={closeModal}>
        <Image src={'/images/close.svg'} alt='close' />
      </CloseButton>
      <Body>{isEnabled ? signContent() : loginContent()}</Body>
    </Modal>
  )
}

const torusArray = [
  {
    name: 'google',
    icon: '/images/google.svg'
  },
  {
    name: 'twitter',
    icon: '/images/twitter.svg'
  },
  {
    name: 'facebook',
    icon: '/images/facebook.svg'
  },
  {
    name: 'discord',
    icon: '/images/discord.svg'
  }
]

const EntityCard = styled(FlexCenter)`
  width: 80px;
  height: 54px;
  border-radius: 8px;
  box-shadow: ${Shadow.Neutral[400]};
  cursor: pointer;
`

const Torus = styled(FlexCenter)`
  margin-top: 40px;
  gap: 16px;
  flex-wrap: wrap;
`

const Line = styled.div`
  width: 40%;
  border-bottom: 1px solid ${Gray_300};
  margin-left: 14px;
  margin-right: 14px;
  margin-top: 4px;
`

const Break = styled.div`
  display: flex;
  align-items: center;
`

const Ethereum = styled.div`
  margin-top: 60px;
  margin-bottom: 44px;
  box-shadow: ${Shadow.Neutral[500]};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 16px;
  cursor: pointer;
`

const Body = styled.div`
  color: ${Primary_Deep_800};
  text-align: center;
  > h3:first-of-type {
    margin-bottom: 16px;
  }
`

const CloseButton = styled.div`
  position: absolute;
  right: 24px;
  top: 24px;
  cursor: pointer;
`

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    borderRadius: '8px',
    maxWidth: '600px',
    boxShadow: '0 5px 16px rgba(0, 0, 0, 0.15)',
    color: Primary_Deep_900,
    padding: '50px',
    maxHeight: '100%'
  },
  overlay: {
    backgroundColor: 'rgb(9 4 70 / 70%)',
    zIndex: 1070
  }
}

export default LoginModal
