import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Image } from 'theme-ui'
import { useRouter } from 'next/router'

import { headerRoutes } from './headerRoutes'
import { FlexCenter } from '../styled-components/Grid'
import { Shadow } from '../styled-components/Shadow'
import { Body_P } from '../styled-components/Typography'
import { Gray_900 } from '../styled-components/Colors'
import { mediaQueries } from '../../lib/helpers'
import HeaderRoutesItem from './headerRoutesItem'

const HeaderRoutesResponsive = () => {
  const router = useRouter()
  const activeIndex = headerRoutes.findIndex(i => router.pathname === i.href)
  const activeMenu = headerRoutes[activeIndex]?.title
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Wrapper
      onMouseEnter={() => setIsOpen(true)}
      onClick={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <DrawerClosed isOpen={isOpen}>
        <Image src={'/images/drawer_menu.svg'} alt={'drawer menu'} />
        <Body_P color={Gray_900}>{activeMenu}</Body_P>
      </DrawerClosed>
      <DrawerOpened isOpen={isOpen}>
        <Image src={'/images/drawer_menu.svg'} alt={'drawer menu'} />
        <HeaderItems>
          {headerRoutes.map((i, index) => {
            return (
              <HeaderRoutesItem
                key={i.title}
                href={i.href}
                title={i.title}
                active={activeIndex === index}
              />
            )
          })}
        </HeaderItems>
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
  z-index: ${props => (props.isOpen ? '0' : '1080')};
`

const DrawerOpened = styled.div`
  position: absolute;
  top: 10px;
  width: 190px;
  align-items: flex-start;
  background: white;
  display: ${props => (props.isOpen ? 'flex' : 'none')};
  flex-direction: row;
  padding: 15px 20px 20px 20px;
  border-radius: 18px;
  box-shadow: ${Shadow.Dark['500']};
  transition: max-height 0.25s ease-in, opacity 0.25s ease-in;
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  opacity: ${props => (props.isOpen ? 1 : 0)};
  z-index: ${props => (props.isOpen ? '1080' : '0')};
  > * {
    opacity: ${props => (props.isOpen ? 1 : 0)};
    transition: opacity 0.25s ease-in;
    transition-delay: 0.25s;
  }
  ${mediaQueries.sm} {
    padding: 15px 20px 10px 20px;
    img {
      padding: 5px 0 0 0;
    }
  }
`
const HeaderItems = styled.div`
  display: flex;
  flex-direction: column;
`

const Wrapper = styled.div`
  position: relative;

  ${mediaQueries.sm} {
    display: flex;
  }

  ${mediaQueries.lg} {
    display: none;
  }
`

export default HeaderRoutesResponsive
