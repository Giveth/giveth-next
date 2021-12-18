import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Image } from 'theme-ui'
import { useRouter } from 'next/router'

import { headerRoutes } from './headerRoutes'
import { FlexCenter } from '../styled-components/Grid'
import { Shadow } from '../styled-components/Shadow'
import { mediaQueries } from '../../lib/helpers'
import HeaderRoutesItem from './headerRoutesItem'

const HeaderRoutesResponsive = () => {
  const router = useRouter()
  const activeIndex = headerRoutes.findIndex(i => router.pathname === i.href)
  const activeMenu = headerRoutes[activeIndex].title
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Wrapper onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <DrawerClosed isOpen={isOpen}>
        <Image src={'/images/drawer_menu.svg'} alt={'drawer menu'} />
        {activeMenu}
      </DrawerClosed>
      <DrawerOpened isOpen={isOpen}>
        {headerRoutes.map((i, index) => (
          <HeaderRoutesItem
            key={i.title}
            href={i.href}
            title={i.title}
            active={activeIndex === index}
          />
        ))}
      </DrawerOpened>
    </Wrapper>
  )
}

const DrawerClosed = styled(FlexCenter)`
  gap: 11px;
  border-radius: 72px;
  box-shadow: ${props => (props.isOpen ? 'none' : Shadow.Dark['500'])};
  background: white;
  padding: 0 14px;
  height: 48px;
  cursor: pointer;
  z-index: 1080;
`

const DrawerOpened = styled.div`
  position: absolute;
  top: 20px;
  left: 0;
  background: white;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 35px 20px 20px 20px;
  border-radius: 12px;
  box-shadow: ${Shadow.Dark['500']};
  transition: max-height 0.25s ease-in, opacity 0.25s ease-in;
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  opacity: ${props => (props.isOpen ? 1 : 0)};

  > * {
    opacity: ${props => (props.isOpen ? 1 : 0)};
    transition: opacity 0.25s ease-in;
    transition-delay: 0.25s;
  }
`

const Wrapper = styled.div`
  position: relative;
  display: none;

  ${mediaQueries.sm} {
    display: flex;
  }

  ${mediaQueries.lg} {
    display: none;
  }
`

export default HeaderRoutesResponsive
