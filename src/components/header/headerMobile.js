import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Image } from 'theme-ui'
import Link from 'next/link'

import { FlexCenter } from '../styled-components/Grid'
import { Shadow } from '../styled-components/Shadow'
import Routes from '../../lib/Routes'
import { mediaQueries } from '../../lib/helpers'
import { headerRoutes } from './headerRoutes'

const HeaderMobile = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Wrapper>
      <Link href={Routes.Home}>
        <a>
          <LogoBackground>
            <Image src='/images/giveth-logo-blue.svg' width={38} height={38} alt='Logo' />
          </LogoBackground>
        </a>
      </Link>
      <Menu onClick={() => setIsOpen(true)}>
        <Image src={'/images/drawer_menu.svg'} alt={'drawer menu'} />
      </Menu>

      <MenuOpened isOpen={isOpen}>
        {headerRoutes.map(i => (
          <div key={i.title}>{i.title}</div>
        ))}
      </MenuOpened>
    </Wrapper>
  )
}

const MenuOpened = styled.div`
  position: absolute;
  top: 0;
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
  border-radius: 4px;
  padding: 5px;
  box-shadow: ${Shadow.Dark[500]};
  background: white;
`

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 16px;
  align-items: center;
  justify-content: space-between;
  //display: flex;
  display: none;

  > :nth-of-type(1),
  > :nth-of-type(2) {
    z-index: 1000;
  }
  > :nth-last-of-type {
    z-index: 900;
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
