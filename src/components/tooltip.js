import React from 'react'
import { Text } from 'theme-ui'
import styled from '@emotion/styled'
import TooltipImg from '../images/svg/general/decorators/tooltip.svg'

const Tooltip = styled.div`
  position: relative;
  border-radius: 48px;
  .tooltip-text {
    visibility: hidden;
    width: 180px;
    background-color: white;
    color: black;
    border-radius: 6px;
    padding: 1rem;
    margin: 5px 0 0 5px;
    text-align: left;
    position: absolute;
    z-index: 1;
  }

  .tooltip-arrow {
    visibility: hidden;
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: transparent;
    z-index: 1;
  }

  &:hover {
    .tooltip-text {
      visibility: visible;
    }
    .tooltip-arrow {
      visibility: visible;
    }
  }

  @media (max-width: 600px) {
    .tooltip-text {
      margin: 10% 0 0 0;
      left: 10%;
    }
  }

  &.right .tooltip-text {
    top: -40px;
    margin-left: 10px;
  }

  &.left .tooltip-text {
    top: -40px;
    right: 32px;
  }

  &.top .tooltip-text {
    bottom: 34px;
    left: -81px;
  }

  &.bottom .tooltip-text {
    top: 25px;
    left: -81px;
  }

  &.top .tooltip-arrow {
    top: -14px;
    border-width: 5px 5px 0;
    border-top-color: #af9bd3;
  }

  &.right .tooltip-arrow {
    top: 0;
    left: auto;
    margin-left: 23px;
    border-width: 5px 5px 5px 0;
    border-right-color: #af9bd3;
  }

  &.bottom .tooltip-arrow {
    top: 20px;
    border-width: 0 5px 5px;
    border-bottom-color: #af9bd3;
  }

  &.left .tooltip-arrow {
    top: 0;
    right: 22px;
    border-width: 5px 0 5px 5px;
    border-left-color: #af9bd3;
  }
`

export default function ToolTip({
  content,
  contentStyle,
  textStyle,
  isArrow,
  placement,
  children
}) {
  return (
    <Tooltip
      sx={{
        ':hover': {
          visibility: 'visible'
        }
      }}
      className={placement}
    >
      {children ? children : <TooltipImg style={{ cursor: 'pointer' }} />}
      {isArrow && <div className='tooltip-arrow' />}
      <span className='tooltip-text' style={contentStyle}>
        <Text sx={{ variant: 'text.small' }} style={textStyle}>
          {content}
        </Text>
      </span>
    </Tooltip>
  )
}
