import React, { useState, useEffect, useContext, useRef, useCallback } from 'react'
import styled from '@emotion/styled'
import Link from 'next/link'
import Image from 'next/image'
import tokenAbi from 'human-standard-token-abi'
import { useRouter } from 'next/router'
import { pollEvery } from '../utils'
import { Giv_100, Primary_Deep_800, Pinky_500 } from './styled-components/Colors'
import { FlexCenter } from './styled-components/Grid'
import { Shadow } from './styled-components/Shadow'
import { Button } from './styled-components/Button'
import Tooltip from '../components/tooltip'
import Routes from '../lib/Routes'
import WalletMenu from './walletMenu'
import { Context as Web3Context } from '../contextProvider/Web3Provider'
import config from '../../config'

const POLL_DELAY_TOKENS = 5000

const Header = () => {
  const {
    state: { account, networkId, web3, isEnabled },
    actions: { loginModal }
  } = useContext(Web3Context)
  const [givBalance, setGivBalance] = useState(0)
  const stopPolling = useRef()
  const router = useRouter()

  const clearPoll = () => {
    if (stopPolling.current) {
      stopPolling.current()
      stopPolling.current = undefined
    }
  }

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

  const pollToken = useCallback(() => {
    clearPoll()

    stopPolling.current = pollEvery(
      () => ({
        request: async () => {
          try {
            const env = process.env.NEXT_PUBLIC_ENVIRONMENT
            const isDev = env === 'dev'
            // TODO: REMOVE THIS WHEN WE HAVE OUR TOKEN DEPLOYED
            if (!isDev) return 0
            const instance = new web3.eth.Contract(
              tokenAbi,
              networkId === 100 ? config.GIV_TOKEN.XDAI : config.GIV_TOKEN.MAINNET
            )
            return (await instance.methods.balanceOf(account).call()) / 10 ** 18
          } catch (e) {
            return 0
          }
        },
        onResult: _balance => {
          if (_balance !== undefined && (!givBalance || givBalance !== _balance)) {
            setGivBalance(_balance)
          }
        }
      }),
      POLL_DELAY_TOKENS
    )()
  }, [account, networkId])

  useEffect(() => {
    if (isEnabled) pollToken()

    return () => clearPoll()
  }, [isEnabled, account, networkId])

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
        <Tooltip
          placement='bottom'
          content='GIV currently in wallet'
          contentStyle={{
            marginTop: '30px',
            backgroundColor: '#AF9BD3'
          }}
          textStyle={{
            color: 'white'
          }}
        >
          <GivMenu onClick={() => router.push(config.LINKS.GIVECONOMY)}>
            <Image width={24} height={24} src='/images/GIV_menu-01.svg' alt='giv icon' />
            <GivBalance>{parseFloat(givBalance).toLocaleString('en-US')} </GivBalance>
          </GivMenu>
        </Tooltip>

        {isEnabled ? (
          <WalletMenu />
        ) : (
          <Button small onClick={loginModal}>
            SIGN IN
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
  background: white;
  border-radius: 48px;
  height: 48px;
  color: ${Primary_Deep_800};
`

const RoutesItem = styled.a`
  padding: 7px 15px;
  font-weight: 400;
  cursor: pointer;
  border-radius: 72px;
  :hover {
    color: ${Pinky_500} !important;
  }
  &.active {
    background: ${Giv_100};
    :hover {
      color: ${Primary_Deep_800} !important;
    }
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
