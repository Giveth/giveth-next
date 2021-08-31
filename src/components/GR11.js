import React from 'react'
import { useRouter } from 'next/router'
import { Flex, Button, Text, Image } from 'theme-ui'
import LevitatingCard from './hoc/levitatingCard'

function GR11 () {
  const router = useRouter()

  if (process.env.NEXT_PUBLIC_NETWORK !== 'ropsten') return null

  return (
    <>
      <LevitatingCard style={{ margin: '0 15% 5% 15%' }}>
        <Flex
          sx={{
            flex: 1,
            width: '100%',
            flexDirection: ['column-reverse', 'row', 'row'],
            mb: ['25%', 0, 0]
          }}
        >
          <Flex
            sx={{
              flex: 0.5,
              width: '100%',
              flexDirection: 'column',
              alignItems: 'center',
              background: '#0C0631',
              padding: '50px 0',
              borderTopLeftRadius: [0, '16px', '16px'],
              borderBottomLeftRadius: [0, '16px', '16px']
            }}
          >
            <Image
              src='/images/GR11.png'
              style={{
                objectFit: 'cover',
                objectPosition: '3px 0'
              }}
            />
            <Text
              sx={{
                variant: 'text.default',
                fontSize: '24px',
                color: 'background'
              }}
            >
              Sept 8-23
            </Text>
          </Flex>
          <Flex
            sx={{
              flex: 0.5,
              px: 4,
              py: '50px',
              flexDirection: 'column',
              background: '#5326EC',
              '*': {
                zIndex: 2
              },
              borderTopRightRadius: [0, '16px', '16px'],
              borderBottomRightRadius: [0, '16px', '16px']
            }}
          >
            <Text sx={{ variant: 'headings.h1', color: 'background' }}>
              Gitcoin Grants
            </Text>
            <Text sx={{ variant: 'headings.h1', color: 'background' }}>
              Round 11 is here!
            </Text>
            <Text
              sx={{
                variant: 'text.default',
                fontSize: '24px',
                color: 'background',
                pr: 4
              }}
            >
              Donate to support Giveth with the power of Quadratic Funding
            </Text>
            <Button
              type='submit'
              variant='buttons.default'
              sx={{
                maxWidth: '230px',
                height: '52px',
                fontWeight: 'bold',
                fontSize: 2,
                lineHeight: 'button',
                letterSpacing: 'normal',
                mt: 4
              }}
              onClick={() =>
                router.push('https://gitcoin.co/grants/795/giveth-20')
              }
            >
              DONATE
            </Button>
          </Flex>
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0
            }}
          >
            <Image src='/images/arc-1.png' style={{ maxHeight: '300px' }} />
          </div>
        </Flex>
      </LevitatingCard>
      <style global jsx>
        {``}
      </style>
    </>
  )
}

export default GR11
