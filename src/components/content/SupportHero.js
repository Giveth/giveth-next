import Link from 'next/link'
import { useMediaQuery } from 'react-responsive'
import { Grid, Heading, Text, jsx } from 'theme-ui'
import styled from '@emotion/styled'

const HeroSection = styled(Grid)`
  grid-template-columns: 1fr auto;
  align-items: end;
  &:nth-child(1) {
    text-align: center;
  }
  @media (max-width: 850px) {
    grid-template-columns: 1fr;
  }
`

const HeroImage = styled.img`
  padding-right: 3rem;
`

const HeroText = styled(Grid)`
  grid-template-rows: auto;
  justify-self: center;
  @media (max-width: 850px) {
  }
`

const Hero = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 850px)' })
  return (
    <HeroSection>
      <HeroText
        p={['10px', null, '80px 80px 0px 80px']}
        sx={{ width: ['95%', '50%', '80%'] }}
      >
        {' '}
        <Heading
          sx={{
            variant: 'headings.h1',
            width: ['100%', null, null],
            fontWeight: 'regular',
            fontSize: ['8', '11', '11'],
            color: 'secondaryDark'
          }}
        >
          Support{' '}
        </Heading>
        <Text
          pt={1}
          sx={{
            variant: 'text.large',
            color: 'secondary',
            lineHeight: 'taller'
          }}
        >
          How can we help you?
        </Text>
        <Text pt={4} sx={{ variant: 'text.default' }}></Text>
      </HeroText>
    </HeroSection>
  )
}

export default Hero
