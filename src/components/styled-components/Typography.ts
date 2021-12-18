import styled from '@emotion/styled'
import { Gray_700, Pinky_500 } from './Colors'

interface ITypographyProps {
  color?: string
  bold?: boolean
}

export const H1 = styled.h1<ITypographyProps>`
  font-family: TeX Gyre Adventor, sans-serif;
  font-size: 66px;
  font-style: normal;
  font-weight: 700;
  line-height: 86px;
  letter-spacing: -0.03em;
  color: ${props => props.color || 'inherit'};
`

export const H2 = styled.h2`
  font-family: TeX Gyre Adventor, sans-serif;
  font-weight: 700;
  font-size: 52px;
  line-height: 80px;
  margin: 0;
  color: ${props => props.color || 'inherit'};
`

export const H3 = styled.h3<ITypographyProps>`
  font-family: TeX Gyre Adventor, sans-serif;
  font-size: 41px;
  font-weight: 700;
  line-height: 56px;
  color: ${props => props.color || 'inherit'};
`

export const H4 = styled.h4`
  font-family: TeX Gyre Adventor, sans-serif;
  font-size: 32px;
  font-weight: 700;
  line-height: 50px;
  color: ${props => props.color || 'inherit'};
`

export const H5 = styled.h5<ITypographyProps>`
  font-family: TeX Gyre Adventor, sans-serif;
  font-size: 25px;
  font-weight: 700;
  line-height: 38px;
  color: ${props => props.color || 'inherit'};
`

export const H6 = styled.h6<ITypographyProps>`
  font-family: TeX Gyre Adventor, sans-serif;
  font-size: 18px;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: -0.005em;
  margin-bottom: 0;
  color: ${props => props.color || 'inherit'};
`

export const Lead = styled.div`
  font-family: Red Hat Text, sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 32px;
`

export const Lead_Medium = styled.div`
  font-family: Red Hat Text, sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
  color: ${props => props.color || 'inherit'};
`

export const Lead_Large = styled.div`
  font-family: Red Hat Text, sans-serif;
  font-weight: 400;
  font-size: 24px;
  line-height: 36px;
`

export const D3 = styled.div`
  font-family: TeX Gyre Adventor, sans-serif;
  font-size: 88px;
  font-weight: 700;
  line-height: 106px;
  color: ${props => props.color || 'inherit'};
`

export const Body_P = styled.div<ITypographyProps>`
  font-family: Red Hat Text, sans-serif;
  margin: 0;
  font-size: 16px;
  line-height: 24px;
  color: ${props => props.color || 'inherit'};
  font-weight: ${props => (props.bold ? 500 : 400)};
`

export const Link_Medium = styled.div<ITypographyProps>`
  font-family: Red Hat Text, sans-serif;
  font-size: 14px;
  line-height: 21px;
  font-weight: ${props => (props.bold ? 500 : 400)};
  color: ${props => props.color || Gray_700};
`

export const Overline_Small = styled.div<ITypographyProps>`
  font-family: Red Hat Text, sans-serif;
  font-size: 10px;
  font-weight: ${props => (props.bold ? 500 : 400)};
  line-height: 13px;
  color: inherit;
`

export const Overline = styled.div`
  font-family: Red Hat Text, sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  color: ${props => props.color || 'inherit'};
  letter-spacing: 5px;
  text-transform: uppercase;
`

export const Subline_Bold = styled.div`
  font-family: Red Hat Text, sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  color: inherit;
`

export const Subline = styled.div`
  font-family: Red Hat Text, sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: ${props => props.color || 'inherit'};
`

export const Button_Medium = styled.div`
  font-family: Red Hat Text, sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 18px;
  color: ${Pinky_500};
`
