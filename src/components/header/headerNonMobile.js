import React, { useContext } from 'react'
import { Context as Web3Context } from '../../contextProvider/Web3Provider'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'

import Routes from '../../lib/Routes'
import Image from 'next/image'
import HeaderRoutesResponsive from './headerRoutesResponsive'
import HeaderRoutesDesktop from './headerRoutesDesktop'
import Tooltip from '../tooltip'
import WalletMenu from '../walletMenu'
import { Button } from '../styled-components/Button'
import { FlexCenter } from '../styled-components/Grid'
import { Pinky_500 } from '../styled-components/Colors'
import { mediaQueries } from '../../lib/helpers'
import { Shadow } from '../styled-components/Shadow'
import HeaderGivItem from './headerGivItem'

const HeaderNonMobile = () => {
  const {
    state: { isEnabled },
    actions: { loginModal }
  } = useContext(Web3Context)

  const router = useRouter()

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
        >
          <HeaderGivItem />
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

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: none;
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
