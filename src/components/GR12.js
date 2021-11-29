import React from 'react'
import { useRouter } from 'next/router'
import { Flex, Button, Text, Image } from 'theme-ui'
import LevitatingCard from './hoc/levitatingCard'

function GR12() {
  const router = useRouter()

  const today = new Date()
  const firstDay = new Date('12/01/2021')
  const lastDay = new Date('12/16/2021')

  const showme = today >= firstDay && today <= lastDay
  if (!showme && process.env.NEXT_PUBLIC_NETWORK !== 'ropsten') return null
  return (
    <>
      <LevitatingCard style={{ margin: '0 15% 5% 15%', zIndex: 1 }}>
        <Flex
          sx={{
            flex: 1,
            width: '100%',
            flexDirection: ['column-reverse', 'row', 'row'],
            mb: ['25%', 0, 0],
          }}
        >
          <Flex
            sx={{
              flex: 0.5,
              width: '100%',
              flexDirection: 'column',
              alignItems: 'center',
              background: '#f6f4d7',
              padding: '50px 0',
              borderTopLeftRadius: [0, '16px', '16px'],
              borderBottomLeftRadius: [0, '16px', '16px'],
            }}
          >
            <Image
              src="/images/GR12PNG.png"
              style={{
                objectFit: 'cover',
                objectPosition: '3px 0',
              }}
            />
            <Text
              sx={{
                variant: 'text.default',
                fontSize: '24px',
                color: '#56b890',
              }}
            >
              Dec 1-16
            </Text>
          </Flex>
          <Flex
            sx={{
              flex: 0.5,
              width: '100%',
              pt: '50px',
              pb: '-50px',
              flexDirection: 'column',
              background: '#56b890',
              position: 'relative',
              borderTopRightRadius: [0, '16px', '16px'],
              borderBottomRightRadius: [0, '16px', '16px'],
            }}
          >
            <Text
              sx={{
                variant: 'headings.h2',
                px: 4,
                color: 'background',
              }}
            >
              Gitcoin Grants
            </Text>
            <Text
              sx={{
                variant: 'headings.h2',
                px: 4,
                color: 'background',
              }}
            >
              Round 12 is here!
            </Text>
            <Text
              sx={{
                variant: 'text.default',
                fontSize: '24px',
                color: 'background',
                px: 4,
              }}
            >
              Donate to support Giveth with the power of Quadratic Funding
            </Text>
            <Button
              type="submit"
              variant="buttons.default"
              sx={{
                maxWidth: '230px',
                height: '52px',
                fontWeight: 'bold',
                fontSize: 2,
                lineHeight: 'button',
                letterSpacing: 'normal',
                mt: 4,
                ml: 4,
                zIndex: 0,
                mb: 4,
              }}
              onClick={() =>
                router.push('https://gitcoin.co/grants/795/giveth-20')
              }
            >
              DONATE
            </Button>
            <Image
              src="/images/arc-1.png"
              sx={{
                position: 'absolute',
                right: 0,
                bottom: 0,
                zIndex: -1,
                maxHeight: '400px',
              }}
            />
          </Flex>
        </Flex>
      </LevitatingCard>
    </>
  )
}

export default GR12
