import React, { useContext, useState } from 'react'
import styled from '@emotion/styled'
import { Image } from 'theme-ui'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { FlexCenter } from '../styled-components/Grid'
import { Shadow } from '../styled-components/Shadow'
import { Giv_500 } from '../styled-components/Colors'
import Routes from '../../lib/Routes'
import { mediaQueries } from '../../lib/helpers'
import { headerRoutes } from './headerRoutes'
import HeaderItemMobile from './HeaderItemMobile'
import { Button } from '../styled-components/Button'
import HeaderGivItem from './headerGivItem'
import WalletMenu from '../walletMenu'
import { Context as Web3Context } from '../../contextProvider/Web3Provider'

const HeaderMobile = () => {
  const {
    state: { isEnabled },
    actions: { loginModal }
  } = useContext(Web3Context)

  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const activeIndex = headerRoutes.findIndex(i => router.pathname === i.href)

  return (
    <Wrapper>
      <Link href={Routes.Home}>
        <a>
          <LogoBackground>
            <Image src='/images/giveth-logo-blue.svg' width={38} height={38} alt='Logo' />
          </LogoBackground>
        </a>
      </Link>
      <Menu onClick={() => setIsOpen(!isOpen)}>
        {!isOpen && <Image src={'/images/drawer_menu.svg'} alt={'drawer menu'} />}
        {isOpen && <CloseButton>×</CloseButton>}
      </Menu>

      <MenuOpened isOpen={isOpen}>
        {headerRoutes.map((i, index) => (
          <HeaderItemMobile
            key={i.title}
            href={i.href}
            title={i.title}
            active={activeIndex === index}
          />
        ))}

        {isEnabled ? (
          <BottomSection>
            <StyledButton small>Create a Project</StyledButton>
            <HeaderGivItem />
            <WalletMenu />
          </BottomSection>
        ) : (
          <Button background={Giv_500} small onClick={loginModal}>
            SIGN IN
          </Button>
        )}
      </MenuOpened>
    </Wrapper>
  )
}

const BottomSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`

const StyledButton = styled(Button)`
  width: 100%;
  text-transform: uppercase;
  margin-top: 66px;
  margin-bottom: 16px;
  font-size: 14px;
`

const CloseButton = styled.div`
  color: ${Giv_500};
  font-size: 30px;
`

const MenuOpened = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: absolute;
  padding: 100px 24px 24px 24px;
  top: 0;
  left: 0;
  width: 100%;
  background: white;
  transition: max-height 0.25s ease-in, opacity 0.25s ease-in;
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  opacity: ${props => (props.isOpen ? 1 : 0)};

  > * {
    opacity: ${props => (props.isOpen ? 1 : 0)};
    transition: opacity 0.25s ease-in;
    transition-delay: 0.25s;
  }
`

const Menu = styled(FlexCenter)`
  cursor: pointer;
  padding: 5px;
`

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 16px;
  align-items: center;
  justify-content: space-between;
  display: flex;
  z-index: 1000;

  > :nth-of-type(0),
  > :nth-of-type(1) {
    position: relative;
    z-index: 1080;
  }

  ${mediaQueries.sm} {
    display: none;
  }
`

const LogoBackground = styled(FlexCenter)`
  box-shadow: ${Shadow.Dark[500]};
  background: white;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
`

export default HeaderMobile
