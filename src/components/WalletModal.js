import React, { useContext, useState } from 'react'
import styled from '@emotion/styled'
import Modal from 'react-modal'
import { Image } from 'theme-ui'

import { Giv_500, Primary_Deep_900, Semantic_Link_500 } from './styled-components/Colors'
import { H6, Body_P, Overline_Small } from './styled-components/Typography'
import { Shadow } from './styled-components/Shadow'
import { walletsArray } from '../utils/constants'
import { FlexCenter } from './styled-components/Grid'
import { Context as Web3Context } from '../contextProvider/Web3Provider'
import { checkWalletName } from '../lib/helpers'

const WalletModal = ({ showModal, closeModal }) => {
  const {
    state: { web3 },
    actions: { switchWallet }
  } = useContext(Web3Context)

  const [showInfo, setShowInfo] = useState(false)

  const selectedWallet = checkWalletName(web3)

  const InfoPage = () => {
    return (
      <>
        <Title>
          <Image
            className='pointer'
            onClick={() => setShowInfo(false)}
            src={'/images/back.svg'}
            alt='back'
          />
          <H6>What is a wallet?</H6>
        </Title>
        <InfoBody>
          Wallets are used to send, receive, and store digital assets like Ether. Wallets come in
          many forms.
          <br />
          <br />
          They are either built into your browser, an extension added to your browser, a piece of
          hardware plugged into your computer or even an app on your phone.
          <br />
          <br />
          For more information about wallets, see{' '}
          <ExternalLink
            href={'https://docs.ethhub.io/using-ethereum/wallets/intro-to-ethereum-wallets/'}
            text='this explanation'
          />
        </InfoBody>
      </>
    )
  }

  const WalletsPage = () => {
    return (
      <>
        <Title>
          <Image src={'/images/wallet.svg'} alt='wallet' />
          <H6>Select a Wallet</H6>
        </Title>
        <Body_P>Please select a wallet to connect to this DApp</Body_P>
        <IconsContainer>
          {walletsArray.map(i => (
            <WalletItem
              onClick={() => handleSelect(i.name)}
              key={i.name}
              className={selectedWallet === i.name ? 'active' : ''}
            >
              {selectedWallet === i.name && <Badge>SELECTED</Badge>}
              <WalletIcon>
                <Image src={i.image} alt={i.name} />
              </WalletIcon>
              <Body_P bold>{i.name}</Body_P>
            </WalletItem>
          ))}
        </IconsContainer>
        <InfoSection onClick={() => setShowInfo(true)}>
          What is a wallet
          <InfoBadge />
        </InfoSection>
      </>
    )
  }

  const handleSelect = selected => {
    if (selectedWallet !== selected) {
      switchWallet(selected)
    }
    closeModal()
  }

  if (!showModal) return null
  return (
    <Modal isOpen={showModal} onRequestClose={closeModal} style={customStyles}>
      <CloseButton onClick={closeModal}>
        <Image src={'/images/close.svg'} alt='close' />
      </CloseButton>
      {showInfo ? <InfoPage /> : <WalletsPage />}
    </Modal>
  )
}

const ExternalLink = ({ text, href }) => {
  return (
    <StyledLink href={href} rel='noopener noreferrer' target='_blank'>
      {text}
    </StyledLink>
  )
}

const StyledLink = styled.a`
  color: ${Semantic_Link_500} !important;
`

const InfoBadge = () => {
  return (
    <div>
      <Circle>?</Circle>
    </div>
  )
}

const WalletIcon = styled.div`
  width: 32px;
  text-align: center;
`

const Circle = styled(FlexCenter)`
  border-radius: 50%;
  border: 1px solid;
  width: 16px;
  text-align: center;
  height: 16px;
  font-size: 10px;
  color: inherit;
  font-weight: 500;
`

const InfoBody = styled(Body_P)`
  margin-top: 50px;
`

const CloseButton = styled.div`
  position: absolute;
  right: 24px;
  top: 24px;
  cursor: pointer;
`

const InfoSection = styled(Body_P)`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${Semantic_Link_500};
  cursor: pointer;
`

const Badge = styled(Overline_Small)`
  position: absolute;
  top: -7px;
  padding: 0 3px;
  background: white;
  font-weight: 500;
  color: ${Giv_500};
`

const WalletItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 8px;
  border-radius: 12px;
  border: 1px solid transparent;
  cursor: pointer;
  width: 200px;

  &:hover {
    box-shadow: ${Shadow.Neutral[500]};
  }

  &.active {
    border-color: ${Giv_500};
  }
`

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 18px;
`

const IconsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px 80px;
  margin: 40px 10px 50px 10px;
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
    minWidth: '350px',
    boxShadow: '0 5px 16px rgba(0, 0, 0, 0.15)',
    color: Primary_Deep_900,
    padding: '27px',
    maxHeight: '100%'
  },
  overlay: {
    backgroundColor: 'rgb(9 4 70 / 70%)',
    zIndex: 1070
  }
}

export default WalletModal
