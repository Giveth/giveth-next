import React, { useContext } from 'react'
import styled from '@emotion/styled'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { Giv_100, Primary_Deep_800 } from './styled-components/Colors'
import { FlexCenter } from './styled-components/Grid'
import { Shadow } from './styled-components/Shadow'
import { Button } from './styled-components/Button'
import Routes from '../lib/Routes'
import WalletMenu from './walletMenu'
import { Context as Web3Context } from '../contextProvider/Web3Provider'
import config from '../../config'

const Header = () => {
  const {
    state: { account, isSignedIn },
    actions: { signIn, showWalletModal }
  } = useContext(Web3Context)

  const router = useRouter()

  let activeTab = ''
  switch (router.pathname) {
    case '/':
      activeTab = 'home'
      break
    case Routes.Projects:
      activeTab = 'projects'
      break
    case Routes.Join:
      activeTab = 'join'
      break
  }

  return (
    <Wrapper>
      <LogoBackground onClick={() => router.push('/')}>
        <Image src='/images/giveth-logo-blue.svg' width={50} height={50} alt='Logo' />
      </LogoBackground>

      <MainRoutes>
        <Link href='/' passHref>
          <RoutesItem className={activeTab === 'home' ? 'active' : ''}>Home</RoutesItem>
        </Link>
        <Link href={Routes.Projects} passHref>
          <RoutesItem className={activeTab === 'projects' ? 'active' : ''}>Projects</RoutesItem>
        </Link>
        <RoutesItem href={config.LINKS.GIVECONOMY} target='_blank' rel='noreferrer noopener'>
          GIVeconomy
        </RoutesItem>
        <Link href={Routes.Join} passHref>
          <RoutesItem className={activeTab === 'join' ? 'active' : ''}>Community</RoutesItem>
        </Link>
      </MainRoutes>

      <RightMenus>
        <Button small onClick={() => router.push(Routes.CreateProject)}>
          CREATE A PROJECT
        </Button>

        <GivMenu>
          <Image width={24} height={24} src='/images/GIV_menu-01.svg' alt='giv icon' />
          <GivBalance>0</GivBalance>
        </GivMenu>

        {isSignedIn ? (
          <WalletMenu />
        ) : account ? (
          <Button small onClick={signIn}>
            SIGN IN
          </Button>
        ) : (
          <Button small onClick={showWalletModal}>
            SELECT WALLET
          </Button>
        )}
      </RightMenus>
    </Wrapper>
  )
}

const RightMenus = styled.div`
  display: flex;
  gap: 8px;
  box-shadow: none;
  > * {
    box-shadow: ${Shadow.Dark[500]};
  }
`

const GivBalance = styled.span`
  margin-left: 8px;
`

const GivMenu = styled(FlexCenter)`
  padding: 0 14.5px;
  cursor: pointer;
  border-radius: 48px;
  background: white;
  height: 48px;
  color: ${Primary_Deep_800};
  z-index: -2;
`

const RoutesItem = styled.a`
  padding: 7px 15px;
  font-weight: 400;
  cursor: pointer;
  border-radius: 72px;

  &.active {
    background: ${Giv_100};
  }
`

const MainRoutes = styled(FlexCenter)`
  padding: 0 10px;
  width: 408px;
  justify-content: space-between;
  border-radius: 72px;
  background: white;
  height: 48px;
  color: ${Primary_Deep_800};
`

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 28px 32px;
  z-index: 1000;

  > * {
    box-shadow: ${Shadow.Dark[500]};
  }
`

const LogoBackground = styled(FlexCenter)`
  background: white;
  width: 66px;
  height: 66px;
  border-radius: 50%;
  cursor: pointer;
`

export default Header
