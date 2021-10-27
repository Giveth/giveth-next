import React, { createContext, useEffect, useState } from 'react'
import Onboard from 'bnc-onboard'
import Web3 from 'web3'
import { Button, Flex, Text } from 'theme-ui'

import { client } from '../apollo/client'
import { GET_USER_BY_ADDRESS } from '../apollo/gql/auth'
import User from '../entities/user'
import * as Auth from '../services/auth'
import { getToken } from '../services/token'
import { signMessage } from '../lib/helpers'
import Modal from '../components/modal'
import theme from '../utils/theme-ui'

const Context = createContext({})
const { Provider } = Context

const nativeTokenDecimals = 18

const defaultNetworkId = Number(process.env.NEXT_PUBLIC_NETWORK_ID)
const rpcUrl = process.env.NEXT_PUBLIC_ETHEREUM_NODE
const dappId = process.env.NEXT_PUBLIC_BLOCK_NATIVE_DAPP_ID
const portisKey = process.env.NEXT_PUBLIC_PORTIS_KEY
const infuraKey = process.env.NEXT_PUBLIC_INFURA_ID

const wallets = [
  { walletName: 'metamask' },
  { walletName: 'torus' },
  {
    walletName: 'portis',
    apiKey: portisKey
  },
  {
    walletName: 'trezor',
    appUrl: 'https://giveth.io/',
    rpcUrl
  },
  {
    walletName: 'lattice',
    appName: 'Giveth 2.0',
    rpcUrl
  },
  {
    walletName: 'ledger',
    rpcUrl
  },
  { walletName: 'dapper' },
  { walletName: 'coinbase' },
  { walletName: 'status' },
  { walletName: 'unilogin' },
  { walletName: 'authereum', disableNotifications: true },
  {
    walletName: 'walletConnect',
    infuraKey
  },
  { walletName: 'opera' },
  { walletName: 'operaTouch' },
  { walletName: 'imToken', rpcUrl },
  { walletName: 'meetone' },
  { walletName: 'mykey' },
  { walletName: 'wallet.io', rpcUrl }
]

const Web3Provider = props => {
  const [validProvider, setValidProvider] = useState(false)
  const [networkId, setNetworkId] = useState()
  const [web3, setWeb3] = useState()
  const [provider, setProvider] = useState()
  const [account, setAccount] = useState()
  const [balance, setBalance] = useState()
  const [onboard, setOnboard] = useState({})
  const [networkName, setNetworkName] = useState()
  const [user, setUser] = useState()
  const [showSignModal, setShowSignModal] = useState(false)

  const isXdai = networkId === 100

  const initOnBoard = () => {
    if (validProvider) return

    const _onboard = Onboard({
      dappId,
      networkId: defaultNetworkId,
      subscriptions: {
        wallet: wallet => {
          window.localStorage.setItem('selectedWallet', wallet.name)
          const _web3 = new Web3(wallet.provider)
          _web3[wallet.name] = true
          setValidProvider(!!wallet.provider)
          setWeb3(_web3)
          setProvider(wallet.provider)
        },
        network: _network => setNetworkId(_network),
        address: _address => {
          if (!_address || _address !== Auth.getUser()?.walletAddress) {
            Auth.handleLogout()
          }
          if (user) setUser(undefined)
          setAccount(_address)
        },
        balance: _balance => setBalance(_balance / 10 ** nativeTokenDecimals)
      },
      walletSelect: {
        wallets
      }
    })

    const previouslySelectedWallet = window.localStorage.getItem('selectedWallet')
    if (previouslySelectedWallet) {
      _onboard
        .walletSelect(previouslySelectedWallet)
        .then(selected => selected && _onboard.walletCheck().then())
    } else {
      _onboard.walletSelect().then(selected => selected && _onboard.walletCheck().then())
    }
    setOnboard(_onboard)
  }

  const switchWallet = () => {
    onboard.walletSelect().then(selected => selected && onboard.walletCheck().then())
  }

  const switchToXdai = () => {
    window?.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: '0x64',
          chainName: 'xDai',
          nativeCurrency: { name: 'xDAI', symbol: 'xDai', decimals: 18 },
          rpcUrls: ['https://rpc.xdaichain.com/'],
          blockExplorerUrls: ['https://blockscout.com/xdai/mainnet']
        }
      ]
    })
  }

  const enableProvider = () => {
    if (validProvider) onboard.walletCheck().then()
  }

  const fetchUser = () => {
    return client
      .query({
        query: GET_USER_BY_ADDRESS,
        variables: {
          address: account
        },
        fetchPolicy: 'network-only'
      })
      .then(res => res.data?.userByAddress)
      .catch(console.log)
  }

  const updateUser = () => {
    fetchUser().then(res => {
      if (res) {
        const newUser = new User(user)
        newUser.parseDbUser(res)
        Auth.setUser(newUser)
        setUser(newUser)
      }
    })
  }

  const setToken = async () => {
    const signedMessage = await signMessage(
      process.env.NEXT_PUBLIC_OUR_SECRET,
      account,
      networkId,
      web3
    )
    if (!signedMessage) return

    const token = await getToken(user, signedMessage, networkId)
    const newUser = new User(user)
    newUser.setToken(token)
    Auth.setUser(newUser)
    client.resetStore().then()
    setUser(newUser)
  }

  const signModalContent = () => {
    const handleClick = () => {
      showSignModal && setShowSignModal(false)
      setToken().then()
    }
    return (
      <Flex
        sx={{
          flexDirection: 'column',
          p: 4,
          alignItems: 'center'
        }}
      >
        <Text sx={{ variant: 'text.large', color: 'secondary', marginBottom: '25px' }}>
          Please Sign with your wallet to authenticate
        </Text>
        <Button
          onClick={handleClick}
          sx={{ cursor: 'pointer', width: '170px', background: theme.colors.primary }}
        >
          Sign
        </Button>
      </Flex>
    )
  }

  const showSign = () => setShowSignModal(true)

  useEffect(() => {
    initOnBoard()
  }, [])

  useEffect(() => {
    if (account) {
      const _user = Auth.getUser()
      const newUser = new User()
      newUser.addWalletAddress(account)
      if (account === _user?.walletAddress) {
        newUser.parseDbUser(_user)
        newUser.setToken(_user.token)
        setUser(newUser)
      } else {
        fetchUser().then(res => {
          if (res) {
            newUser.parseDbUser(res)
            Auth.setUser(newUser)
            setUser(newUser)
          }
        })
      }
    }
  }, [account])

  useEffect(() => {
    if (networkId) {
      onboard.config({ networkId })
      if (isXdai) setNetworkName('xDai')
      else web3?.eth.net.getNetworkType().then(name => setNetworkName(name))
    }
  }, [networkId])

  const isEnabled = !!web3 && !!account && !!networkId && !!user

  return (
    <Provider
      value={{
        state: {
          account,
          balance,
          validProvider,
          isEnabled,
          web3,
          networkId,
          networkName,
          provider,
          user
        },
        actions: {
          switchWallet,
          switchToXdai,
          enableProvider,
          initOnBoard,
          updateUser,
          showSign,
          signModalContent,
          setToken
        }
      }}
    >
      {showSignModal && (
        <Modal isOpen={showSignModal} onRequestClose={() => setShowSignModal(false)}>
          {signModalContent()}
        </Modal>
      )}
      {props.children}
    </Provider>
  )
}

export { Context }
export default Web3Provider
