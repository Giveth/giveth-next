import { useMediaQuery } from 'react-responsive'
import { Grid, Heading, Text } from 'theme-ui'
import styled from '@emotion/styled'

const Hero = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 850px)' })
  return (
    <HeroSection>
      <HeroText p={['10px', null, '80px']} sx={{ width: ['95%', '50%', '80%'] }}>
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
          Join our Community{' '}
        </Heading>
        <Text
          pt={1}
          sx={{
            variant: 'text.large',
            color: 'secondary',
            lineHeight: 'taller'
          }}
        >
          Building the Future of Giving
        </Text>
        <Text pt={4} sx={{ variant: 'text.default' }}>
          Giveth is first and foremost a community of givers and changemakers. We are passionate
          people working together to build a crypto-economic system that can reward giving to good
          causes. Our project is open-source, decentralized, altruistic, and community-led. Want to
          get more involved?
          <br />
          <br />
          Follow our social media and come say hello in a channel below, we look forward to
          welcoming you!
        </Text>
      </HeroText>
      {isMobile ? null : <HeroImage src='/images/people-highfive.svg' alt='' />}
    </HeroSection>
  )
}

const HeroSection = styled(Grid)`
  grid-template-columns: 1fr auto;
  align-items: end;
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

export default Hero
