import React from 'react'
import { Flex, Button, Text } from 'theme-ui'
import Modal from 'react-modal'
import { TwitterShareButton } from 'react-share'
const GeminiModal = ({ showModal, setShowModal, txHash, networkId }) => {
  return (
    <Modal
      isOpen={showModal}
      onRequestClose={() => setShowModal(false)}
      style={customStyles}
      //   contentLabel={props?.contentLabel}
    >
      <Flex
        sx={{
          display: showModal ? 'flex' : 'none',
          // position: 'absolute',
          // top: '15%',
          // right: [0, '15%', '25%'],
          zIndex: 5,
          alignItems: 'center',
          padding: '3% 0',
          flexDirection: 'column',
          width: ['100vw', '600px', '600px'],
          borderRadius: '2px'
        }}
      >
        <Button
          type='button'
          onClick={() => {
            setShowModal(false)
          }}
          aria-label='close'
          sx={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            fontSize: '3',
            fontFamily: 'body',
            color: 'secondary',
            background: 'unset',
            cursor: 'pointer'
          }}
        >
          <img src='/images/x-icon.svg' />
        </Button>
        <Text
          sx={{
            mt: 3,
            textAlign: 'center',
            variant: 'text.default',
            fontSize: '20px'
          }}
        >
          Giving Block projects only accept donations listed on Gemini
        </Text>
        <Text
          sx={{
            mb: 4,
            textAlign: 'center',
            variant: 'text.default',
            fontSize: '20px'
          }}
        >
          Help us get GIV on Gemini!{' '}
        </Text>
        <img src='/images/twitter-modal.svg' />

        <Button
          type='button'
          variant='nofill'
          sx={{
            mt: 4,
            color: 'white',
            width: '240px',
            height: '52px',
            border: '2px solid #AAAFCA',
            backgroundColor: '#00ACEE'
          }}
        >
          <TwitterShareButton
            beforeOnClick={() => setShowModal(false)}
            title={
              'Hey @gemini - I want to donate $GIV to this @thegivingblock project on @givethio! Help me support them by listing $GIV on gemini.com @tyler @cameron'
            }
            url={'url'}
            hashtags={['gemini', 'giveth', 'giv', 'donation']}
          >
            {' '}
            <a style={{ display: 'flex', justifyContent: 'center' }}>
              TWEET NOW <img src='/images/tw-icon.svg' style={{ marginLeft: '6px' }} />
            </a>
          </TwitterShareButton>
        </Button>
        <Text
          onClick={() => {
            setShowModal(false)
          }}
          sx={{
            textAlign: 'center',
            variant: 'text.default',
            fontWeight: 'bold',
            fontSize: '12px',
            cursor: 'pointer',
            color: '#A3B0F6',
            mt: '12px'
          }}
        >
          CANCEL
        </Text>
      </Flex>
    </Modal>
  )
}

const customStyles = {
  overlay: {
    position: 'fixed',
    zIndex: 4,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(83, 38, 236, 0.2)',
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
    transform: 'translate(-50%, -50%)'
  }
}

export default GeminiModal
