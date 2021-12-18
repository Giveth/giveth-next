import styled from '@emotion/styled'
import { Giv_100 } from './Colors'

export const Arc = styled.div`
  position: absolute;
  border-radius: 50%;
  border-style: solid;
  z-index: -1;
`

/* Home, Projects */
export const BigArc = styled(Arc)`
  border-width: 250px;
  border-color: ${Giv_100};
  opacity: 40%;
  top: -2340px;
  right: 300px;
  width: 3600px;
  height: 3600px;
  z-index: 0;
`
