import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'

import { Primary_Deep_800 } from '../styled-components/Colors'
import { FlexCenter } from '../styled-components/Grid'
import config from '../../../config'
import Image from 'next/image'
import { pollEvery } from '../../utils'
import tokenAbi from 'human-standard-token-abi'
import { Context as Web3Context } from '../../contextProvider/Web3Provider'
import { Shadow } from '../styled-components/Shadow'

const POLL_DELAY_TOKENS = 5000

const HeaderGivItem = () => {
  const {
    state: { account, networkId, web3, isEnabled }
  } = useContext(Web3Context)

  const [givBalance, setGivBalance] = useState(0)
  const stopPolling = useRef()
  const router = useRouter()

  const clearPoll = () => {
    if (stopPolling.current) {
      stopPolling.current()
      stopPolling.current = undefined
    }
  }

  const pollToken = useCallback(() => {
    clearPoll()

    stopPolling.current = pollEvery(
      () => ({
        request: async () => {
          try {
            const env = process.env.NEXT_PUBLIC_ENVIRONMENT
            const instance = new web3.eth.Contract(
              tokenAbi,
              networkId === 100 ? config.GIV_TOKEN.XDAI : config.GIV_TOKEN.MAINNET
            )
            return (await instance.methods.balanceOf(account).call()) / 10 ** 18
          } catch (e) {
            return 0
          }
        },
        onResult: _balance => {
          if (_balance !== undefined && (!givBalance || givBalance !== _balance)) {
            setGivBalance(_balance)
          }
        }
      }),
      POLL_DELAY_TOKENS
    )()
  }, [account, networkId])

  useEffect(() => {
    if (isEnabled) pollToken()

    return () => clearPoll()
  }, [isEnabled, account, networkId])

  return (
    <GivMenu onClick={() => router.push(config.LINKS.GIVECONOMY)}>
      <Image width={24} height={24} src='/images/GIV_menu-01.svg' alt='giv icon' />
      <GivBalance>{parseFloat(givBalance).toLocaleString('en-US')} </GivBalance>
    </GivMenu>
  )
}

const GivBalance = styled.span`
  margin-left: 8px;
`

const GivMenu = styled(FlexCenter)`
  padding: 0 14.5px;
  cursor: pointer;
  background: white;
  border-radius: 48px;
  height: 48px;
  color: ${Primary_Deep_800};
  box-shadow: ${Shadow.Dark[500]};
`

export default HeaderGivItem
