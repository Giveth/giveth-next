import Link from 'next/link'
import Image from 'next/image'
import { Box, Grid, Text, Flex } from 'theme-ui'
import { useMediaQuery } from 'react-responsive'
import styled from '@emotion/styled'
import { FiExternalLink } from 'react-icons/fi'
import theme from '../utils/theme-ui'
import SocialNetworks from './content/SocialNetworks'

const Footer = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 800px)' })
  function romanize(num) {
    if (!+num) return false
    const digits = String(+num).split('')
    let roman = '',
      i = 3
    while (i--) roman = (key[+digits.pop() + i * 10] || '') + roman
    return Array(+digits.join('') + 1).join('M') + roman
  }

  const currentTime = new Date()

  const strRomanDate = romanize(currentTime.getFullYear())

  return (
    <Container p={[0, 3, 5]} sx={{ position: 'relative' }}>
      <br />

      <InnerGrid>
        {!isMobile && (
          <Link style={{ marginRight: '10px' }} href='/'>
            <a>
              <Image
                src='/images/giveth-logo-blue.svg'
                width='40px'
                height='40px'
                alt='giveth-logo-blue'
              />
            </a>
          </Link>
        )}

        <LinkBox>
          <FooterLink href='/'>Home</FooterLink>
          <FooterLink href='/projects'>Projects</FooterLink>
          <FooterLink href='/about'>About Us</FooterLink>
          <FooterLink href='/faq'>FAQ</FooterLink>
          <FooterLink href='/support'>Support</FooterLink>
        </LinkBox>

        <LinkBox>
          <FooterLink href='/join'>Join Our Community</FooterLink>
          <FooterExternalLink
            href='https://docs.giveth.io/whatisgiveth/'
            target='_blank'
            rel='noopener noreferrer'
          >
            What is Giveth? <ExtIcon />
          </FooterExternalLink>
          <FooterExternalLink
            href='https://docs.giveth.io/dapps/'
            target='_blank'
            rel='noopener noreferrer'
          >
            User Guides <ExtIcon />
          </FooterExternalLink>
          <FooterExternalLink
            href='https://docs.giveth.io/dapps/givethioinstallation'
            target='_blank'
            rel='noopener noreferrer'
          >
            Developer Docs <ExtIcon />
          </FooterExternalLink>
          <FooterLink href='/tos'>Terms of Use</FooterLink>
        </LinkBox>

        <LinkBox>
          <FooterExternalLink
            href='https://trace.giveth.io'
            target='_blank'
            rel='noopener noreferrer'
          >
            Giveth TRACE <ExtIcon />
          </FooterExternalLink>
          <FooterExternalLink
            href='https://commonsstack.org'
            target='_blank'
            rel='noopener noreferrer'
          >
            Commons Stack <ExtIcon />
          </FooterExternalLink>
          <FooterLink href='/partnerships'>Partnerships</FooterLink>
          <FooterExternalLink
            href='https://docs.giveth.io/jobs/'
            target='_blank'
            rel='noopener noreferrer'
          >
            We`&apos;re Hiring! <ExtIcon />
          </FooterExternalLink>
        </LinkBox>
      </InnerGrid>

      <br />

      <DonateSection>
        <SocialNetworks />
        <Text
          sx={{
            variant: 'text.medium',
            pt: '10px',
            fontWeight: 'bold'
          }}
        >
          Support us{' '}
          <FooterLink
            href={`/donate/${theme.donationSlug}`}
            sx={{ variant: 'links.nav' }}
          >
            with your donation
          </FooterLink>
        </Text>
      </DonateSection>

      <CreditsSection>
        <Text sx={{ textAlign: 'center' }}>
          {strRomanDate} - No Rights Reserved -{' '}
          <a href='https://wiki.giveth.io/dac/' sx={{ variant: 'links.light' }}>
            The Giveth DAC
          </a>
        </Text>
      </CreditsSection>
    </Container>
  )
}

const key = [
  '',
  'C',
  'CC',
  'CCC',
  'CD',
  'D',
  'DC',
  'DCC',
  'DCCC',
  'CM',
  '',
  'X',
  'XX',
  'XXX',
  'XL',
  'L',
  'LX',
  'LXX',
  'LXXX',
  'XC',
  '',
  'I',
  'II',
  'III',
  'IV',
  'V',
  'VI',
  'VII',
  'VIII',
  'IX'
]

const Container = styled(Box)`
  padding: 10px;
  margin: 0 auto;
  max-width: 1440px;
  @media (max-width: 850px) {
    background-color: ${theme.colors.lightestBlue};
  }
`

const FooterLink = styled.a`
  font-family: ${theme.fonts.heading}, sans-serif;
  color: ${theme.colors.bodyDark};
  :hover {
    color: ${theme.colors.accent};
  }
`

const FooterExternalLink = styled.a`
  font-family: ${theme.fonts.heading}, sans-serif;
  color: ${theme.colors.bodyDark};
  cursor: pointer;
  :hover {
    color: ${theme.colors.accent};
  }
`

const ExtIcon = styled(FiExternalLink)`
  size: 16px;
  @media (max-width: 850px) {
    size: 8px;
  }
`

const InnerGrid = styled.div`
  display: flex;
  justify-content: space-between;
`

const LinkBox = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 150px;
  line-height: 2;
  @media (max-width: 400px) {
    font-size: 10px;
  }
`

const DonateSection = styled(Flex)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;

  @media (max-width: 850px) {
    margin-top: 5px;
  }
`

const CreditsSection = styled(Grid)`
  padding: 40px 0;
`

export default Footer
