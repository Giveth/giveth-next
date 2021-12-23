import React, { useState, useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styled from '@emotion/styled'

import { Context as Web3Context } from '../contextProvider/Web3Provider'
import { Body_P, Link_Medium, Overline_Small, Subline } from './styled-components/Typography'
import {
  Giv_800,
  Gray_200,
  Gray_300,
  Gray_800,
  Pinky_500,
  Primary_Deep_800
} from './styled-components/Colors'
import { FlexCenter } from './styled-components/Grid'
import { Shadow } from './styled-components/Shadow'
import defaultProfileIcon from '../../public/images/default_user_profile.png'
import { switchNetwork, switchToXdai } from '../lib/util'
import { truncate, shortenAddress } from '../lib/helpers'
import { networkInfo } from '../lib/NetworksObj'
import Routes from '../lib/Routes'
import config from '../../config'

const WalletMenu = () => {
  const {
    state: { user, web3, networkId, account },
    actions: { showWalletModal, signOut }
  } = useContext(Web3Context)

  const [isOpen, setIsOpen] = useState(false)

  const networkName = networkInfo(networkId).networkName

  return (
    <Wrapper
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={() => setIsOpen(!isOpen)}
    >
      <WalletClosed isOpen={isOpen}>
        <UserAvatar src={defaultProfileIcon} />
        <UserDetails>
          <NameText color={Primary_Deep_800}>
            {user?.name ? truncate(user?.name, 11) : shortenAddress(user.walletAddress)}
          </NameText>
          <ConnectedText color={Giv_800}>Connected to {networkName}</ConnectedText>
        </UserDetails>
      </WalletClosed>

      <WalletOpened isOpen={isOpen}>
        <Title>WALLET</Title>
        <Subtitle>
          <Body_P bold>{shortenAddress(account)}</Body_P>
          <StyledButton onClick={showWalletModal}>Change wallet</StyledButton>
        </Subtitle>
        <Title>NETWORK</Title>
        <Subtitle>
          <Body_P bold>{networkName}</Body_P>
          {web3?.MetaMask && (
            <StyledButton
              onClick={() => {
                console.log({ networkId })
                if (networkId === 100) {
                  switchNetwork(networkId)
                } else {
                  switchToXdai()
                }
              }}
            >
              Switch network
            </StyledButton>
          )}
        </Subtitle>
        <Menus>
          {walletMenuArray.map(i =>
            i?.external ? (
              <MenuItem key={i.title}>
                <a href={i.url} rel='noreferrer' target='_blank'>
                  {i.title}
                </a>
              </MenuItem>
            ) : (
              <Link href={i.url} key={i.title} passHref>
                <MenuItem>{i.title}</MenuItem>
              </Link>
            )
          )}
          {user?.token && <MenuItem onClick={signOut}>Sign out</MenuItem>}
        </Menus>
      </WalletOpened>
    </Wrapper>
  )
}

const WalletClosed = styled(FlexCenter)`
  position: relative;
  z-index: 1080;
  border-radius: 72px;
  background: white;
  height: 48px;
  box-shadow: ${props => (props.isOpen ? 'none' : Shadow.Dark['500'])};
  padding: 0 12.5px;
  cursor: pointer;
`

const UserDetails = styled.div`
  padding-left: 8px;
  padding-right: 20px;
  @media (max-width: 768px) {
    padding-right: 0;
    padding-left: 0;
  }
`

const walletMenuArray = [
  { title: 'My Account', url: Routes.MyAccount },
  { title: 'My Projects', url: Routes.MyProjects },
  { title: 'My Donations', url: Routes.MyDonations },
  { title: 'Create a Project', url: Routes.CreateProject },
  { title: 'Report a bug', url: config.LINKS.REPORT_ISSUE, external: true },
  { title: 'Support', url: Routes.Support }
]

const MenuItem = styled.a`
  height: 45px;
  line-height: 45px;
  border-top: 2px solid ${Gray_300};
  color: ${Primary_Deep_800};
  padding: 0 16px;
  font-size: 14px;
  cursor: pointer;

  :hover {
    background: ${Gray_200};
    color: ${Pinky_500} !important;
  }
`

const Menus = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  padding: 0 !important;
  border-bottom: 2px solid ${Gray_300};
`

const UserAvatar = styled(Image)`
  border-radius: 50%;
  width: 24px;
  height: 24px;
`

const Wrapper = styled.div`
  position: relative;
  z-index: 1000;
  color: ${Primary_Deep_800};
  box-shadow: unset;
`

const WalletOpened = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: ${Shadow.Dark[500]};
  width: 250px;
  position: absolute;
  right: 0;
  top: 22px;
  z-index: 1070;
  padding: 40px 0 5px 0;
  color: ${Primary_Deep_800};
  max-height: ${props => (props.isOpen ? '600px' : '0px')};
  transition: max-height 0.25s ease-in, opacity 0.25s ease-in;
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  opacity: ${props => (props.isOpen ? 1 : 0)};

  > * {
    opacity: ${props => (props.isOpen ? 1 : 0)};
    transition: opacity 0.25s ease-in;
    transition-delay: 0.25s;
    padding: 0 16px;
  }
`

const StyledButton = styled(Subline)`
  color: ${Pinky_500};
  cursor: pointer;
`

const Subtitle = styled(Overline_Small)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 7px;
`

const NameText = styled(Link_Medium)`
  @media (max-width: 500px) {
    // font-size: 12px;
    display: none;
  }
`

const ConnectedText = styled(Overline_Small)`
  @media (max-width: 500px) {
    // font-size: 7px;
    // margin-top: -5px;
    display: none;
  }
`

const Title = styled(Overline_Small)`
  color: ${Gray_800};
  text-transform: uppercase;
  font-weight: 500;
  margin-bottom: 2px;
`

export default WalletMenu
