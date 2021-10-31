import React, { useContext, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import redirect from 'nextjs-redirect'
import { Flex, Text } from 'theme-ui'
import styled from '@emotion/styled'
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon
} from 'react-share'

import theme from '../../utils/theme-ui'
import OnlyFiat from './onlyFiat'
import Success from './success'
import ProjectListing from '../projectListing'
import { Context as Web3Context } from '../../contextProvider/Web3Provider'

const OnlyCrypto = dynamic(() => import('./onlyCrypto'), { ssr: false })

// CONSTANTS

const CRYPTO = 'Cryptocurrency'
const CREDIT = 'Credit Card'

const DonateIndex = props => {
  const {
    state: { networkId }
  } = useContext(Web3Context)

  const { project } = props

  const [hashSent, setHashSent] = useState(false)
  const [paymentType, setPaymentType] = useState(CRYPTO)
  const [isAfterPayment, setIsAfterPayment] = useState(null)
  const [paymentSessionId, setPaymentSessionId] = useState(null)
  const [isCancelled, setIsCancelled] = useState(null)
  const [transakTx, setTransakTx] = useState(null)

  useEffect(() => {
    if (project?.status?.id !== '5') {
      setIsCancelled(true)
    }
    const search = getUrlParams(props?.location?.search)
    setIsAfterPayment(search?.success === 'true')
    if (search?.sessionId) setPaymentSessionId(search?.sessionId)
  }, [])

  // TODO: Implement this on a utils file
  function getUrlParams(search) {
    const hashes = search?.slice(search.indexOf('?') + 1).split('&')
    return hashes?.reduce((params, hash) => {
      const [key, val] = hash.split('=')
      return Object.assign(params, { [key]: decodeURIComponent(val) })
    }, {})
  }

  function PaymentOptions() {
    const isSSR = typeof window === 'undefined'

    const ShowPaymentOption = () => {
      return paymentType === CRYPTO && !isSSR ? (
        <OnlyCrypto project={project} setHashSent={val => setHashSent(val)} />
      ) : (
        <OnlyFiat project={project} setTransakTx={setTransakTx} />
      )
    }

    const OptionType = ({ title, subtitle, style }) => {
      const isSelected = title === paymentType
      const textColor = isSelected ? theme.colors.secondary : 'white'

      return (
        <OptionTypesBox
          onClick={() => {
            setPaymentType(title)
          }}
          style={{
            backgroundColor: isSelected ? 'white' : theme.colors.secondary,
            ...style
          }}
        >
          <Text
            sx={{
              variant: 'text.medium',
              color: textColor,
              fontWeight: 'bold'
            }}
          >
            {title}
          </Text>
          <Text sx={{ variant: 'text.small', color: textColor }}>{subtitle}</Text>
        </OptionTypesBox>
      )
    }

    return (
      <>
        <Text sx={{ variant: 'headings.h5', color: 'white' }}>Donate With</Text>
        <Options>
          <OptionType title={CRYPTO} subtitle='Zero Fees' style={RIGHT_BOX_STYLE} />
          <OptionType title={CREDIT} subtitle='Bank Fees' style={LEFT_BOX_STYLE} />
        </Options>
        {ShowPaymentOption()}
      </>
    )
  }

  const ShareIcons = ({ message, centered }) => {
    const shareTitle = `Check out on @Givethio`
    const url = typeof window !== 'undefined' ? window?.location?.href : null
    return (
      <Share
        style={{
          textAlign: centered && 'center'
        }}
      >
        <Text sx={{ variant: 'text.medium', color: 'white' }}>{message}</Text>
        <SocialIcons
          sx={{
            justifyContent: centered ? 'center' : 'flex-start',
            '*': {
              outline: 'none'
            }
          }}
        >
          <TwitterShareButton title={shareTitle} url={url} hashtags={['giveth']}>
            <TwitterIcon size={40} round />
          </TwitterShareButton>
          <LinkedinShareButton title={shareTitle} summary={project?.description} url={url}>
            <LinkedinIcon size={40} round />
          </LinkedinShareButton>
          <FacebookShareButton quote={shareTitle} url={url} hashtag='#giveth'>
            <FacebookIcon size={40} round />
          </FacebookShareButton>
        </SocialIcons>
      </Share>
    )
  }

  if (project?.fromTrace) {
    const Redirect = redirect(`https://trace.giveth.io/campaign/${project?.slug}`)
    return (
      <Redirect>
        <h3 style={{ color: 'white' }}>Redirecting to Giveth TRACE...</h3>
      </Redirect>
    )
  }

  if (isCancelled) {
    return (
      <Flex sx={{ justifyContent: 'center', pt: 5 }}>
        <Text variant='headings.h4' sx={{ color: 'background' }}>
          Project Not Available
        </Text>
      </Flex>
    )
  }

  if (isAfterPayment || hashSent || transakTx) {
    return (
      <Flex sx={{ flexDirection: ['column', 'column', 'row'] }}>
        <ProjectContainer>
          <ProjectListing
            wholeClickable
            transparentBorders
            project={project}
            name={project?.title}
            description={project?.description}
            image={project?.image || '/images/no-image-available.jpg'}
            raised={1223}
            category={project?.categories || 'Blockchain 4 Good'}
            listingId='key1'
            key='key1'
          />
        </ProjectContainer>
        <Payment>
          <Success
            transakTx={transakTx}
            sessionId={paymentSessionId}
            hash={hashSent}
            currentChainId={networkId}
          />
          <div style={{ margin: '3rem 0', zIndex: 2 }}>
            <ShareIcons message='Share this with your friends!' centered />
          </div>
        </Payment>
      </Flex>
    )
  }

  return (
    <Container>
      <ProjectContainer>
        <ProjectListing
          wholeClickable
          transparentBorders
          name={project?.title}
          project={project}
          description={project?.description}
          image={project?.image || '/images/no-image-available.jpg'}
          raised={1223}
          categories={project?.categories}
          listingId='key1'
          key='key1'
        />
        <ShareIcons message="Can't donate? Share this page instead." centered />
      </ProjectContainer>
      <Payment>{PaymentOptions()}</Payment>
    </Container>
  )
}

const LEFT_BOX_STYLE = {
  borderTopLeftRadius: '0.2rem',
  borderBottomLeftRadius: '0.2rem'
}

const RIGHT_BOX_STYLE = {
  borderTopRightRadius: '0.2rem',
  borderBottomRightRadius: '0.2rem'
}

const Container = styled(Flex)`
  flex-direction: row;
  @media (max-width: 900px) {
    flex-direction: column;
  }
`

const ProjectContainer = styled(Flex)`
  width: 25vw;
  flex-direction: column;
  margin: 0 3.125rem 0 0;
  align-items: center;
  @media (max-width: 1100px) {
    width: 100%;
  }
`

const Payment = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 800px) {
    width: 80vw;
    margin: 3rem 0;
    padding: 0;
  }
`

const Share = styled.div`
  align-items: center;
`

const SocialIcons = styled.div`
  display: flex;
  margin: 1rem 0;
  justify-content: center;
  * {
    margin: 0 0.3rem;
  }
`

const Options = styled.div`
  display: flex;
  width: 100%;
  min-width: 29.25rem;
  flex-direction: row;
  border: 0.125rem solid white;
  box-sizing: border-box;
  border-radius: 0.375rem;
  margin: 2.063rem 0 0 0;

  @media (max-width: 1100px) {
    min-width: 20rem;
  }

  @media (max-width: 800px) {
    width: 100%;
    align-self: center;
    margin: 2.063rem 0;
  }
`

const OptionTypesBox = styled(Flex)`
  flex-direction: column;
  cursor: pointer;
  width: 50%;
  align-items: center;
  text-align: center;
  padding: 0.875rem 1.938rem;

  @media (max-width: 800px) {
    width: 50%;
  }
`

export default DonateIndex
