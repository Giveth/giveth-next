import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Context as Web3Context } from '../../contextProvider/Web3Provider'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'

import tokenAbi from 'human-standard-token-abi'
import config from '../../../config'
import Routes from '../../lib/Routes'
import Image from 'next/image'
import HeaderRoutesResponsive from './headerRoutesResponsive'
import HeaderRoutesDesktop from './headerRoutesDesktop'
import Tooltip from '../tooltip'
import WalletMenu from '../walletMenu'
import { Button } from '../styled-components/Button'
import { FlexCenter } from '../styled-components/Grid'
import { Pinky_500, Primary_Deep_800 } from '../styled-components/Colors'
import { mediaQueries } from '../../lib/helpers'
import { Shadow } from '../styled-components/Shadow'
import { pollEvery } from '../../utils'

const POLL_DELAY_TOKENS = 5000

const HeaderNonMobile = () => {
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
      <LeftMenus>
        <LogoBackground onClick={() => router.push(Routes.Home)}>
          <Image src='/images/giveth-logo-blue.svg' width={50} height={50} alt='Logo' />
        </LogoBackground>
        <HeaderRoutesResponsive />
      </LeftMenus>

      <HeaderRoutesDesktop />

      <RightMenus>
        <ButtonDesktop small onClick={() => router.push(Routes.CreateProject)}>
          CREATE A PROJECT
        </ButtonDesktop>
        <ButtonResponsive onClick={() => router.push(Routes.CreateProject)}>
          <span>+</span>
        </ButtonResponsive>
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
          style={{ margin: 0 }}
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

const ButtonResponsive = styled(FlexCenter)`
  cursor: pointer;
  color: white;
  font-size: 24px;
  background: ${Pinky_500};
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: none;
  > span {
    height: 37px;
  }
  ${mediaQueries.sm} {
    display: flex;
  }
  ${mediaQueries.md} {
    display: none;
  }
`

const ButtonDesktop = styled(Button)`
  display: none;
  ${mediaQueries.md} {
    display: unset;
  }
`

const LeftMenus = styled(FlexCenter)`
  gap: 12px;
`

const RightMenus = styled.div`
  display: flex;
  gap: 8px;
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

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  //display: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1000;
  padding: 10px;

  ${mediaQueries.sm} {
    display: flex;
  }
  ${mediaQueries.md} {
    display: flex;
    padding: 28px 32px;
  }
`

const LogoBackground = styled(FlexCenter)`
  box-shadow: ${Shadow.Dark[500]};
  background: white;
  width: 66px;
  height: 66px;
  border-radius: 50%;
  cursor: pointer;
`

export default HeaderNonMobile
