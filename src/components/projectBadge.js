import { Text } from 'theme-ui'
import React from 'react'
import styled from '@emotion/styled'
import theme from '../utils/theme-ui'

const projectBadge = text => {
  return (
    <Dot>
      <DotInner>
        <Text
          sx={{
            variant: 'text.overlineSmall',
            color: 'background'
          }}
        >
          {text}
        </Text>
      </DotInner>
    </Dot>
  )
}

const Dot = styled.span`
  background-color: ${theme.colors.secondary};
  height: 78px;
  width: 78px;
  display: grid;
  color: ${theme.colors.background};
  border: 6px solid ${theme.colors.background};
  border-radius: 50%;
  position: absolute;
  bottom: -34px;
  left: 24px;
  font-family: 'Red Hat Text', sans-serif;
  font-size: 10px;
`

const DotInner = styled.span`
  display: block;
  text-align: center;
  align-self: center;
  position: relative;
`

export default projectBadge
