import React, { useState } from 'react'
import { Label, Input, Button, Text, Flex } from 'theme-ui'
import theme from '../../../../src/utils/theme-ui'
import { BsQuestionCircle } from 'react-icons/bs'
import { animated } from 'react-spring'

export const ProjectEthAddressInput = ({
  register,
  currentValue,
  walletUsed,
  animationStyle,
  goBack
}) => {
  const [characterLength, setCharacterLength] = useState(
    currentValue ? currentValue.length : 0
  )
  const [address, setAddress] = useState(null)

  const onChangeAddress = e => {
    e.preventDefault()
    setCharacterLength(e.target.value.length)
    setAddress(true)
  }
  return (
    <animated.section style={{ ...animationStyle, marginTop: '30px' }}>
      <Label
        sx={{
          fontSize: 8,
          fontFamily: 'heading',
          lineHeight: '61px'
        }}
        htmlFor='projectWalletAddress'
      >
        Set your eth address
      </Label>
      <Flex sx={{ flexDirection: 'column' }}>
        <Text
          sx={{
            fontSize: '3',
            fontFamily: 'heading',
            color: 'secondary',
            mt: '8px',
            lineHeight: '19px'
          }}
        >
          You can set a custom ethereum address or ENS to receive donations
        </Text>
        <Flex
          className='tooltip'
          sx={{
            padding: '6px 14px 6px 0',
            width: 'fit-content'
          }}
        >
          <Text
            sx={{
              fontSize: '3',
              // textDecoration: 'underline',
              fontFamily: 'heading',
              color: 'secondary',
              mt: '8px',
              lineHeight: '19px'
            }}
          >
            What is an ETH address <BsQuestionCircle size={15} />
            <span className='tooltiptext'>
              Your ETH address, also known as an ERC20 address, is the receiving
              address for your Ethereum wallet. This is where funds raised by
              your project will be sent.
              <br />
              <br /> If you logged using Torus via your email or social media.
              You can access your wallet{' '}
              <a
                href='https://app.tor.us/'
                target='_blank'
                rel='noopener noreferrer'
              >
                here
              </a>
              .
              <br />
              <br /> Learn more about Ethereum wallets{' '}
              <a
                href='https://ethereum.org/en/wallets/'
                target='_blank'
                rel='noopener noreferrer'
              >
                here
              </a>
              .
            </span>
          </Text>
        </Flex>
      </Flex>

      <Flex sx={{ width: '175%' }}>
        <Input
          sx={{
            width: '100%',
            mt: '40px',
            fontFamily: 'body'
          }}
          type='text'
          id='projectWalletAddress'
          name='projectWalletAddress'
          {...register('projectWalletAddress')}
          defaultValue={currentValue}
          placeholder='0x00000...'
          onChange={e => onChangeAddress(e)}
        />
        <Text
          sx={{
            marginTop: '40px',
            paddingLeft: '40px',
            fontFamily: 'body',
            color: 'muted'
          }}
        >
          {/* {characterLength}/42 */}
        </Text>
      </Flex>
      {walletUsed && (
        <Text
          sx={{
            fontSize: '3',
            fontFamily: 'heading',
            color: 'attention',
            mt: '8px',
            lineHeight: '19px'
          }}
        >
          This is your default wallet address, you can choose another one if
          desired*
        </Text>
      )}
      <Flex
        sx={{
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          flexDirection: 'row-reverse'
        }}
      >
        <Button
          aria-label='Next'
          sx={{
            mt: '100px',
            width: '180px',
            height: '52px',
            borderRadius: '48px',
            cursor: 'pointer'
          }}
          type='submit'
        >
          <Text
            sx={{
              color: 'background',
              fontFamily: 'body',
              fontWeight: 'bold',
              fontSize: 2,
              letterSpacing: '4%',
            }}
          >
            NEXT
          </Text>
        </Button>
        <Button
          aria-label='Back'
          variant='nofill'
          sx={{
            width: '180px',
            height: '52px',
            borderRadius: '48px',
            cursor: 'pointer'
          }}
          onClick={goBack}
        >
          <Text
            sx={{
              color: 'secondary',
              fontFamily: 'body',
              fontSize: 2,
              letterSpacing: '4%'
            }}
          >
            Back
          </Text>
        </Button>
      </Flex>
      <style>{`
        .tooltip {
          position: relative;
          display: inline-block;
        }
        .tooltip .tooltiptext {
          visibility: hidden;
          width: 350px;
          max-width: 500px;
          background-color: ${theme.colors.secondary};
          color: #fff;
          text-align: center;
          padding: 15px 10px;
          margin: 0 5px;
          border-radius: 6px;
         
          position: absolute;
          z-index: 1;
        }

        .tooltiptext a {
          text-decoration: underline
        }
        
        .tooltip:hover .tooltiptext {
          visibility: visible;
        }
      `}</style>
    </animated.section>
  )
}
