import { useContext } from 'react'
import styled from '@emotion/styled'
import Image from 'next/image'
import Link from 'next/link'
import { Text } from 'theme-ui'
import { FiExternalLink } from 'react-icons/fi'
import { useMediaQuery } from 'react-responsive'
import Jdenticon from 'react-jdenticon'

import theme from '../../utils/theme-ui'
import useComponentVisible from '../../utils/useComponentVisible'
import { formatEtherscanLink } from '../../lib/util'
import { shortenAddress } from '../../lib/helpers'
import { Context as Web3Context } from '../../contextProvider/Web3Provider'

const UserDetails = () => {
  const isXsWindow = useMediaQuery({ query: '(max-width: 576px)' })
  const {
    state: { balance, account, networkId, networkName, user, web3 }
  } = useContext(Web3Context)

  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)

  let isXDai = false
  let dotColor
  if (networkId === 100) {
    dotColor = 'greenishBlue'
    isXDai = true
  }

  const truncAddress = shortenAddress(account)

  const parseNetwork = () => {
    switch (networkName) {
      case 'main':
        dotColor = 'greenishBlue'
        break
      case 'ropsten':
        dotColor = 'ropstenPink'
        break
      case 'kovan':
        dotColor = 'kovanPurple'
        break
      case 'rinkeby':
        dotColor = 'rinkebyYellow'
        break
      case 'goerli':
        dotColor = 'goerliBlue'
        break
      default:
        dotColor = 'softGray'
    }

    return (
      <MenuTitle
        sx={{
          variant: 'text.medium',
          pb: 2,
          color: 'secondary',
          textTransform: 'capitalize'
        }}
      >
        <Dot sx={{ backgroundColor: dotColor }} />
        {networkName}
      </MenuTitle>
    )
  }

  return (
    <div ref={ref}>
      <StyledButton
        sx={{ variant: 'buttons.nofill' }}
        onClick={() => setIsComponentVisible(!isComponentVisible)}
      >
        {user?.avatar ? (
          <Image
            alt='user avatar'
            sx={{
              width: '30',
              height: '30',
              borderRadius: '15px'
            }}
            src={user.avatar}
            className='avatar image'
          />
        ) : (
          <Jdenticon size='32' value={account || ''} />
        )}

        {!isXsWindow && (
          <Text
            p={1}
            sx={{
              variant: 'text.default',
              fontWeight: 'normal',
              ml: 2,
              color: 'secondary',
              textTransform: 'capitalize'
            }}
          >
            {user?.getName()}
          </Text>
        )}
      </StyledButton>

      {isComponentVisible ? (
        <AccountDetails>
          <MenuTitle sx={{ variant: 'text.overlineSmall', pt: 2, color: 'bodyDark' }}>
            Wallet Address
          </MenuTitle>

          <MenuTitle sx={{ variant: 'text.medium', color: 'secondary' }}>{truncAddress}</MenuTitle>

          {balance >= 0 && (
            <MenuTitle
              sx={{
                variant: 'text.small',
                pb: 2,
                '&:focus': { color: 'red' }
              }}
              className='balance'
            >
              Balance:{' '}
              {parseFloat(balance)?.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 6
              })}{' '}
              {isXDai ? 'xDAI' : 'ETH'}
            </MenuTitle>
          )}

          <MenuTitle sx={{ variant: 'text.overlineSmall', pt: 2, color: 'bodyDark' }}>
            {web3?.Torus ? 'Torus Network' : web3?.MetaMask ? 'Metamask Network' : 'Wallet network'}
          </MenuTitle>
          {parseNetwork()}

          <Link
            href='/account'
            passHref
            sx={{ textDecoration: 'none', textDecorationLine: 'none' }}
          >
            <MenuItem
              sx={{
                variant: 'text.medium'
              }}
              className='shadow boxheight'
            >
              My Account
            </MenuItem>
          </Link>

          <MenuItem
            sx={{
              variant: 'text.medium'
            }}
            className='shadow boxheight'
            href={formatEtherscanLink('Account', [networkId, account])}
            target='_blank'
            rel='noopener noreferrer'
            style={{ textDecoration: 'none' }}
          >
            My Wallet
            <div style={{ marginLeft: '10px' }}>
              <FiExternalLink size='18px' />
            </div>
          </MenuItem>

          <Link
            href='/account?data=all&view=projects'
            sx={{ textDecoration: 'none', textDecorationLine: 'none' }}
            passHref
          >
            <MenuItem
              sx={{
                variant: 'text.medium'
              }}
              className='shadow boxheight'
            >
              My Projects
            </MenuItem>
          </Link>

          <Link href='/create' sx={{ textDecoration: 'none', textDecorationLine: 'none' }} passHref>
            <MenuItem
              sx={{
                variant: 'text.medium'
              }}
              className='shadow boxheight'
            >
              Create a Project
            </MenuItem>
          </Link>

          <Link
            href='https://hlfkiwoiwhi.typeform.com/to/pXxk0HO5'
            sx={{ textDecoration: 'none', textDecorationLine: 'none' }}
            passHref
          >
            <MenuItem
              sx={{
                variant: 'text.medium'
              }}
              className='shadow boxheight'
            >
              Project Verification
            </MenuItem>
          </Link>

          <MenuItem
            sx={{
              variant: 'text.medium'
            }}
            className='shadow boxheight'
            href='https://github.com/Giveth/giveth-2/issues/new/choose'
            target='_blank'
            rel='noopener noreferrer'
          >
            Report a bug
          </MenuItem>

          <MenuItem
            sx={{
              variant: 'text.medium'
            }}
            className='shadow boxheight'
            href='https://discord.gg/JYNBDuFUpG'
            target='_blank'
            rel='noopener noreferrer'
          >
            Support
          </MenuItem>
        </AccountDetails>
      ) : null}
    </div>
  )
}

const AccountDetails = styled.div`
  width: 200px;
  position: absolute;
  padding: 5px 0;
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.background};
  box-sizing: border-box;
  box-shadow: 0 5px 12px rgba(107, 117, 167, 0.3);
  border-radius: 6px;
  z-index: 205;
  right: 0;
  top: 60px;
  display: grid;
  grid-template-rows: repeat(7, auto);
  grid-gap: 0 1rem;
  .shadow {
    box-shadow: 0 1px 0 #f5f5f5;
  }
  .boxheight {
    display: flex;
    align-self: center;
    padding-top: 11px;
    padding-bottom: 11px;
  }
  & :hover .balance {
    opacity: 1;
  }
`

const MenuItem = styled.a`
  align-self: center;
  padding-left: 16px;
  cursor: pointer;
  align-content: center;
  color: ${theme.colors.secondary};
  :hover {
    color: ${theme.colors.primary};
  }
`

const MenuTitle = styled(Text)`
  align-self: center;
  padding-left: 16px;
  align-content: center;
  color: ${theme.colors.secondary};
`

const Dot = styled.div`
  height: 8px;
  width: 8px;
  border-radius: 50%;
  display: inline-block;
  margin: 0 4px 0 0;
`

const StyledButton = styled.a`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  align-items: center;
  padding: 0.5rem;
`

export default UserDetails
