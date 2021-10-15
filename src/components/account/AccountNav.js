import { Flex, Text } from 'theme-ui'
import { FiExternalLink } from 'react-icons/fi'
import { useContext } from 'react'
import { Context as Web3Context } from '../../contextProvider/Web3Provider'
import { formatEtherscanLink } from '../../lib/util'

const formatTitle = (title, projectsList, userDonations) => {
  switch (title) {
    case 'My Projects':
      return `My Projects ${projectsList?.length ? `(${projectsList?.length})` : ''}`
    case 'My Donations':
      return `My Donations ${userDonations?.length ? `(${userDonations?.length})` : ''}`
    default:
      return title
  }
}

const options = [
  { route: 'account', name: 'My Account' },
  { route: 'projects', name: 'My Projects' },
  { route: 'donations', name: 'My Donations' }
]

const AccountNav = props => {
  const {
    state: { networkId, user }
  } = useContext(Web3Context)

  const { setQuery, query, projectsList, userDonations } = props

  return (
    <Flex sx={{ flexDirection: 'column', pr: '8%' }}>
      <Text
        sx={{
          fontFamily: 'heading',
          color: 'secondary',
          fontSize: 8,
          mt: '40px',
          mb: '68px'
        }}
      >
        My Account
      </Text>

      <Flex sx={{ flexDirection: 'column', maxWidth: '80%' }}>
        {options.map((i, index) => {
          return (
            <a
              key={index}
              style={{ textDecoration: 'none', cursor: 'pointer' }}
              onClick={() => {
                switch (i.route) {
                  case 'projects':
                    return setQuery({ view: 'projects', data: 'all' })
                  case 'account':
                    return setQuery({ view: undefined, data: undefined })
                  default:
                    return setQuery({ view: i.route, data: undefined })
                }
              }}
            >
              <Text
                sx={{
                  mb: '8px',
                  color:
                    query?.view === i.route || (!query?.view && i.route === 'account')
                      ? 'primary'
                      : 'secondary'
                }}
              >
                {formatTitle(i.name, projectsList, userDonations)}
              </Text>
            </a>
          )
        })}
      </Flex>

      <Flex
        sx={{
          flexDirection: 'column',
          mt: ['35px', '70px', '70px']
        }}
      >
        <a
          href={formatEtherscanLink('Account', [networkId, user?.getWalletAddress()])}
          target='_blank'
          rel='noopener noreferrer'
          style={{ textDecoration: 'none' }}
        >
          <Text
            sx={{
              mb: '8px',
              variant: 'links.grey'
            }}
          >
            My Wallet
            <span style={{ marginLeft: '10px' }}>
              <FiExternalLink size='18px' />
            </span>
          </Text>
        </a>

        <a
          href='https://github.com/Giveth/giveth-2/issues/new/choose'
          target='_blank'
          rel='noopener noreferrer'
          style={{ textDecoration: 'none' }}
        >
          <Text
            sx={{
              mb: '8px',
              variant: 'links.grey'
            }}
          >
            Report A Bug
          </Text>
        </a>

        <a
          href='https://discord.gg/JYNBDuFUpG'
          target='_blank'
          rel='noopener noreferrer'
          style={{ textDecoration: 'none' }}
        >
          <Text sx={{ mb: '8px', variant: 'links.grey' }}>Support</Text>
        </a>
      </Flex>
    </Flex>
  )
}

export default AccountNav
