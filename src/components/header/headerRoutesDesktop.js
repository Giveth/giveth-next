import React from 'react'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'

import { Primary_Deep_800 } from '../styled-components/Colors'
import { Shadow } from '../styled-components/Shadow'
import { headerRoutes } from './headerRoutes'
import { mediaQueries } from '../../lib/helpers'
import HeaderRoutesItem from './headerRoutesItem'

const HeaderRoutesDesktop = () => {
  const router = useRouter()
  const activeMenu = headerRoutes.findIndex(i => router.pathname === i.href)

  return (
    <Wrapper>
      {headerRoutes.map((i, index) => (
        <HeaderRoutesItem
          key={i.title}
          href={i.href}
          title={i.title}
          active={activeMenu === index}
        />
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  box-shadow: ${Shadow.Dark[500]};
  padding: 0 10px;
  width: 408px;
  display: none;
  align-items: center;
  justify-content: space-between;
  border-radius: 72px;
  background: white;
  height: 48px;
  color: ${Primary_Deep_800};

  ${mediaQueries.lg} {
    display: flex;
  }
`

export default HeaderRoutesDesktop
