import styled from '@emotion/styled'
import { Pinky_500 } from './Colors'

interface IButtonProps {
  ghost?: boolean
  small?: boolean
  outline?: boolean
  color?: string
  background?: string
  normal?: boolean
  bold?: boolean
}

export const Button = styled.button<IButtonProps>`
  font-family: Red Hat Text, sans-serif;
  background: ${props => {
    if (props.background) return props.background
    else if (props.ghost || props.outline) return 'unset'
    else return Pinky_500
  }};
  border-style: ${props => {
    if (props.outline) return 'solid'
    else return 'none'
  }};
  border-width: ${props => {
    if (props.outline) return '2px'
    else return '0'
  }};
  border-color: ${props => {
    if (props.outline) {
      if (props.color) return props.color
      else return Pinky_500
    } else return 'transparent'
  }};
  border-radius: 48px;
  color: ${props => {
    if (props.color) return props.color
    else return 'white'
  }};
  height: ${props => {
    if (props.small) return '48px'
    else return '66px'
  }};
  font-weight: ${props => {
    if (props.ghost || props.normal) return '400'
    else if (props.bold) return 500
    else return '700'
  }};
  font-size: ${props => {
    if (props.small) return '12px'
    else return '16px'
  }};
  line-height: 18px;
  text-align: center;
  cursor: pointer;
  display: block;
  padding: ${props => {
    if (props.small) return '0 40px'
    else return '0 80px'
  }};
`
