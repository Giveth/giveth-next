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
import { switchNetwork } from '../lib/util'
import { shortenAddress } from '../lib/helpers'
import { networkInfo } from '../lib/NetworksObj'
import Routes from '../lib/Routes'
import config from '../../config'

const WalletMenu = () => {
  const {
    state: { account, user, web3, networkId, networkName, balance },
    actions: { switchWallet }
  } = useContext(Web3Context)

  const [isOpen, setIsOpen] = useState(false)

  return (
    <Wrapper
      isOpen={isOpen}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <UserAvatar src={defaultProfileIcon} />
      <UserDetails>
        <Link_Medium color={Primary_Deep_800}>{user?.name || shortenAddress(account)}</Link_Medium>
        <Overline_Small color={Giv_800}>Connected to {networkName}</Overline_Small>
      </UserDetails>

      <WalletOpened isOpen={isOpen}>
        <Title>WALLET</Title>
        <Subtitle>
          <LeftSection>
            {Math.round(balance * 100) / 100 + ' '}
            <span>{networkInfo(networkId).networkToken}</span>
          </LeftSection>
          <StyledButton onClick={switchWallet}>Change wallet</StyledButton>
        </Subtitle>
        <Title>NETWORK</Title>
        <Subtitle>
          <LeftSection>{networkInfo(networkId).networkName}</LeftSection>
          {web3?.MetaMask && (
            <StyledButton onClick={() => switchNetwork(networkId)}>Switch network</StyledButton>
          )}
        </Subtitle>
        <Menus>
          {walletMenuArray.map(i => (
            <Link href={i.url} key={i.title} passHref>
              <MenuItem>{i.title}</MenuItem>
            </Link>
          ))}
          <MenuItem>Sign out</MenuItem>
        </Menus>
      </WalletOpened>
    </Wrapper>
  )
}

const UserDetails = styled.div`
  padding-left: 8px;
  padding-right: 20px;
`

const walletMenuArray = [
  { title: 'My Account', url: Routes.MyAccount },
  { title: 'My Projects', url: Routes.MyProjects },
  { title: 'My Donations', url: Routes.MyDonations },
  { title: 'Create a Project', url: Routes.CreateProject },
  { title: 'Report a bug', url: config.LINKS.REPORT_ISSUE },
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

const Wrapper = styled(FlexCenter)`
  padding: 0 12.5px;
  cursor: pointer;
  border-radius: 72px;
  background: white;
  height: 48px;
  color: ${Primary_Deep_800};
  box-shadow: ${props => (props.isOpen ? 'none' : Shadow.Dark['500'])};
`

const WalletOpened = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: ${Shadow.Dark[500]};
  width: 250px;
  position: absolute;
  right: 32px;
  top: 55px;
  z-index: -1;
  padding: 40px 0;
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

const LeftSection = styled(Body_P)`
  font-weight: 500;

  > span {
    font-size: 14px;
    font-weight: 400;
  }
`

const Subtitle = styled(Overline_Small)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 7px;
`

const Title = styled(Overline_Small)`
  color: ${Gray_800};
  text-transform: uppercase;
  font-weight: 500;
  margin-bottom: 2px;
`

export default WalletMenu
