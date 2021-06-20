import React, { useState } from 'react'
import { Heading, Grid, Button, Card, Text } from 'theme-ui'
import Link from 'next/link'
import styled from '@emotion/styled'
import Modal from 'react-modal'

import theme from '../../utils/theme-ui/index'
import { render } from 'react-dom'

const CardContainer = styled(Card)`
  background-color: ${theme.colors.backgroundGray};
  margin-bottom: 30px;
  border-radius: 12px;
  max-width: 550px;
  overflow: hidden;
  position: relative;
`

const CardContent = styled.span`
  display: flex;
  flex: 1;
  word-wrap: break-word;
  padding: 2rem 1rem;
  position: relative;
`
const Logo = styled.img`
  align-self: center;
  justify-self: center;
  margin: 2rem;
`
const customStyles = {
  overlay: {
    position: 'fixed',
    zIndex: 4,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    backdropFilter: 'blur(2px)',
    '-webkit-backdrop-filter': 'blur(2px)'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    borderRadius: '12px',
    borderColor: 'transparent',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '80%'
  }
}

function SupportCard ({ data }) {
  const [showModal, toggleModal] = useState(false)
  return (
    <>
      {data?.map(support => {
        return (
          <CardContainer key={support.platformLogo.sys.id + '_card'}>
            <Grid columns={[2, '1fr auto']}>
              <div>
                <Heading
                  sx={{ variant: 'headings.h6' }}
                  style={{
                    padding: '2.5rem 1rem 0 1rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    color: theme.colors.secondary,
                    background: 'none',
                    position: 'relative'
                  }}
                  key={support.platformLogo.sys.id + '_heading'}
                >
                  {support.platformTitle}
                </Heading>

                <CardContent>
                  <Text
                    sx={{ variant: 'text.default' }}
                    style={{
                      fontSize: '16px',
                      color: theme.colors.bodyDark,
                      lineHeight: '1.2rem',
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical'
                    }}
                  >
                    {
                      /* Description String */

                      support.descriptionText
                    }
                  </Text>
                </CardContent>
                <Button
                  mt={2}
                  mb={'2rem'}
                  ml={'1rem'}
                  sx={{
                    variant: 'buttons.default'
                  }}
                  onClick={() => toggleModal(true)}
                >
                  {support.platformTitle}
                </Button>
                <Modal
                  isOpen={showModal}
                  style={customStyles}
                  key={support.platformLogo.sys.id + '_modal'}
                >
                  <iframe
                    title='Give feedback'
                    src={support.onboardingLink}
                    style={{
                      height: '70%',
                      width: '100%',
                      border: '0px',
                      alignSelf: 'center'
                    }}
                  />
                  <Button
                    mt={2}
                    mb={'2rem'}
                    ml={'1rem'}
                    sx={{
                      variant: 'buttons.tertiary',
                      position: 'absolute',
                      top: '0px',
                      right: '0px'
                    }}
                    onClick={() => toggleModal(false)}
                  >
                    x
                  </Button>
                </Modal>
              </div>
              <Logo
                src={support.platformLogo.fields.file.url}
                alt={support.platformTitle + ' logo'}
                width='90px'
              />
            </Grid>
          </CardContainer>
        )
      })}
    </>
  )
}

export default SupportCard
