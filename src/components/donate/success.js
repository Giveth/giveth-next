import React from 'react'
import { Box, Link, Flex, Text } from 'theme-ui'
import { useMediaQuery } from 'react-responsive'
import styled from '@emotion/styled'
import ConfettiAnimation from '../animations/confetti'
import BillIcon from '../../images/svg/donation/bill-icon.svg'
import { ETHERSCAN_PREFIXES } from '../../lib/util'

const Success = props => {
  const { project, hash, currentChainId } = props

  const downloadPDF = () => {
    const filename = 'donation_invoice.pdf'
    const link = document.createElement('a')
    link.setAttribute('download', filename)
    const event = new MouseEvent('click')
    link.dispatchEvent(event)
  }

  const isMobile = useMediaQuery({ query: '(max-width: 825px)' })
  return (
    <>
      <Flex
        sx={{
          position: 'absolute',
          zIndex: 0,
          top: ['5%', 0, '-10%'],
          left: ['5%', '40%', '40%']
        }}
      >
        <ConfettiAnimation size={isMobile ? 350 : 600} />
      </Flex>
      <Content>
        <Text
          sx={{
            variant: 'headings.h3',
            color: 'background',
            my: 3,
            textAlign: 'left'
          }}
        >
          You`&apos;re a giver now!
        </Text>
        <Text sx={{ variant: 'headings.h5', color: 'background' }}>
          Thank you for supporting <strong> {project?.title} </strong>.
        </Text>
        <Text sx={{ variant: 'headings.h5', color: 'background', pt: -1 }}>
          Your <strong> {hash && `${hash.subtotal} ${hash.tokenSymbol}`} </strong> contribution goes
          a long way!
        </Text>
        {hash?.transactionHash ? (
          <Receipt sx={{ my: 4 }}>
            <div style={{ flex: 1 }}>
              <a
                style={{
                  variant: 'text.paragraph',
                  color: 'yellow'
                }}
                target='_blank'
                href={`${ETHERSCAN_PREFIXES[currentChainId]}tx/${hash.transactionHash}`}
                rel='noreferrer noopener'
              >
                View transaction details
              </a>
            </div>
          </Receipt>
        ) : (
          <Receipt sx={{ my: 4 }}>
            <DownloadReceipt onClick={downloadPDF}>
              <Text
                sx={{
                  variant: 'text.paragraph',
                  pt: -1,
                  color: 'bodyLight'
                }}
              >
                Download receipt
              </Text>
              <BillIcon />
            </DownloadReceipt>
          </Receipt>
        )}

        <Text sx={{ variant: 'headings.h5', color: 'background', pt: 4 }}>
          Thank you for your support{' '}
          <div>
            <Link
              sx={{
                variant: 'text.paragraph',
                color: 'yellow',
                cursor: 'pointer'
              }}
              target='_blank'
              href='/account?view=donations'
            >
              View your donations
            </Link>
          </div>
        </Text>
      </Content>
    </>
  )
}

const Content = styled(Flex)`
  flex-direction: column;
  z-index: 10;
  min-width: 32vw;
  word-wrap: break-word;
`

const Receipt = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const DownloadReceipt = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 0.5;
  border: 2px solid #aaafca;
  border-radius: 6px;
  padding: 20px 14px;
  align-items: center;
  cursor: pointer;
`

export default Success
