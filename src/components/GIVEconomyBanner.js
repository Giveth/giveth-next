import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Flex, Button, Text } from 'theme-ui'
import LevitatingCard from './hoc/levitatingCard'
import { Mustard_500 } from './styled-components/Colors'
import config from '../../config'

function GIVEconomyBanner() {
  const router = useRouter()

  const today = new Date()
  const firstDay = new Date('12/24/2021')
  const lastDay = new Date('10/10/2022')

  const showme = today >= firstDay && today <= lastDay
  if (!showme) return <> </>

  const handleClick = e => {
    if (e.target.name === 'givBannerBtn') {
      e.preventDefault()
      e.stopPropagation()
    } else {
      router.push(config.LINKS.GIVECONOMY)
    }
  }

  return (
    <>
      <LevitatingCard style={{ margin: '0 15% 5% 15%', zIndex: 1, marginBottom: '100px' }}>
        <Flex
          sx={{
            cursor: 'pointer',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: 'url(/images/GIVeconomy_Banner.png)',
            backgroundSize: ['cover', '100% 100%', '100% 100%'],
            backgroundRepeat: 'no-repeat',
            zIndex: -1,
            borderRadius: [0, '12px', '12px'],
            pb: 3
          }}
          onClick={handleClick}
        >
          <Flex
            sx={{
              flex: 1,
              width: '100%',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              p: ['100px 60px', '50px 0', '50px 0']
            }}
          >
            <Text
              sx={{
                fontFamily: 'TeX Gyre Adventor, sans-serif',
                fontWeight: 'bold',
                fontSize: ['40px', '40px', '80px'],
                color: '#FCFCFF'
              }}
            >
              The GIVeconomy
            </Text>
            <Flex sx={{ textAlign: 'center', mt: '-10px' }}>
              <Image src='/images/yellowGurve.svg' width='146px' height='30px' alt='gurve' />
              <Text
                sx={{
                  fontFamily: 'TeX Gyre Adventor',
                  fontSize: '46px',
                  color: Mustard_500,
                  ml: '19px'
                }}
              >
                is here
              </Text>
            </Flex>
            <Text
              sx={{
                variant: 'text.default',
                fontSize: '14px',
                color: '#E7E1FF',
                letterSpacing: '5px',
                lineHeight: '19px',
                textTransform: 'uppercase',
                my: '28px'
              }}
            >
              {`Rewarding & empowering those who give`}
            </Text>
            <Button
              type='submit'
              variant='buttons.default'
              name='givBannerBtn'
              sx={{
                maxWidth: '326px',
                height: '52px',
                fontWeight: 'bold',
                fontSize: 2,
                lineHeight: 'button',
                letterSpacing: 'normal',
                ml: 4,
                zIndex: 2,
                px: 5
              }}
              onClick={() => router.push(`${config.LINKS.GIVECONOMY}/claim`)}
            >
              Check your GIVdrop
            </Button>
          </Flex>
        </Flex>
      </LevitatingCard>
    </>
  )
}

export default GIVEconomyBanner
