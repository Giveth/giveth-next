import React from 'react'
import styled from '@emotion/styled'
import Link from 'next/link'
import { Giv_500, Pinky_500 } from '../styled-components/Colors'

const HeaderItemMobile = ({ href, title, active }) => (
  <Link href={href} passHref>
    <RoutesItem className={active ? 'active' : ''}>{title}</RoutesItem>
  </Link>
)

const RoutesItem = styled.a`
  font-size: 28px;
  line-height: 134%;
  font-weight: 400;
  cursor: pointer;
  border-radius: 72px;
  :hover {
    color: ${Pinky_500} !important;
  }
  &.active {
    color: ${Giv_500};
  }
`

export default HeaderItemMobile
