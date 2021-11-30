import { Grid, Box, Button, Heading, Text } from 'theme-ui'
import Link from 'next/link'
import { useMediaQuery } from 'react-responsive'
import styled from '@emotion/styled'
import HeroImage from '../content/HeroImage'
import HeroSideImage from '../content/HeroSideImage'

const Hero = ({ content }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 850px)' })

  return (
    <HeroSection>
      {isMobile ? null : <HeroSideImage />}
      <div id='placeholder' />
      <HeroText p={['10px', null, '80px']}>
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
          {content.mainHead}
        </Heading>
        <Heading
          sx={{
            variant: 'headings.h1',
            width: ['100%', null, '100%'],
            fontWeight: 'bold',
            fontSize: ['8', '11', '11'],
            color: 'secondaryDark'
          }}
        >
          {content.headBold}
        </Heading>
        <Text
          pt={4}
          pb={2}
          sx={{
            variant: 'text.large',
            width: ['100%', '60%', '70%'],
            color: 'secondary',
            lineHeight: 'taller'
          }}
        >
          {content.mainText}
        </Text>
        <Grid
          rows={2}
          sx={{
            justifyContent: ['center', 'start', 'start']
          }}
        >
          <Link href='/projects'>
            <Button
              mt={[4, 5, 5]}
              sx={{
                width: '290px',
                variant: 'buttons.big'
              }}
            >
              {content.mainButton}
            </Button>
          </Link>
          <Link href='/create'>
            <Text
              sx={{
                variant: 'links.nav',
                justifySelf: ['center']
              }}
            >
              {content.mainButtonText}
            </Text>
          </Link>
        </Grid>
      </HeroText>
      <Box sx={{ minHeight: [null, '100vh', '100vh'] }}>
        {isMobile ? null : <HeroImage alt='' />}
      </Box>
    </HeroSection>
  )
}

const HeroSection = styled(Grid)`
  min-height: 100vh;
  grid-template-columns: 1fr auto;
  position: relative;
  @media (max-width: 850px) {
    grid-template-columns: 1fr;
    min-height: 100vh;
  }
`

const HeroText = styled(Box)`
  position: absolute;
  @media (max-width: 850px) {
    position: static;
    justify-content: center;
    padding: 1rem;
    text-align: center;
  }
`

export default Hero
