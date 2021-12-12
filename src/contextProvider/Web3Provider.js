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
  // { walletName: 'authereum', disableNotifications: true },
  // { walletName: 'gnosis' },
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
    if (web3) return

    const _onboard = Onboard({
      dappId,
      networkId: defaultNetworkId,
      subscriptions: {
        wallet: wallet => {
          window?.localStorage.setItem('selectedWallet', wallet.name)
          const _web3 = new Web3(wallet.provider)
          _web3[wallet.name] = true
          setWeb3(_web3)
          setProvider(wallet.provider)
        },
        network: _network => setNetworkId(_network),
        address: _address => {
          if (!_address || _address !== Auth.getUser()?.walletAddress) {
            Auth.logout()
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

    const previouslySelectedWallet = window?.localStorage.getItem('selectedWallet')
    if (previouslySelectedWallet) {
      _onboard
        .walletSelect(previouslySelectedWallet)
        .then(selected => selected && _onboard.walletCheck().then())
    } else {
      _onboard.walletSelect().then(selected => selected && _onboard.walletCheck().then())
    }
    setOnboard(_onboard)
  }

  const switchWallet = async () => {
    onboard.walletSelect().then(selected => {
      if (selected) {
        onboard.walletCheck().then()
      }
    })
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

  const connectWallet = () => {
    if (web3) {
      onboard.walletCheck()
    } else {
      initOnBoard()
    }
  }

  const fetchLocalUser = () => {
    const _user = Auth.getUser()
    const newUser = new User()
    newUser.addWalletAddress(_user.walletAddress)
    newUser.parseDbUser(_user)
    newUser.setToken(_user.token)
    return newUser
  }

  const fetchDBUser = () => {
    return client
      .query({
        query: GET_USER_BY_ADDRESS,
        variables: {
          address: account?.toLowerCase()
        },
        fetchPolicy: 'network-only'
      })
      .then(res => {
        console.log(res.data?.userByAddress)
        return res.data?.userByAddress
      })
      .catch(console.log)
  }

  const updateUser = () => {
    fetchDBUser().then(res => {
      if (res) {
        const newUser = new User(res)
        newUser.setToken(user.token)
        Auth.setUser(newUser)
        setUser(newUser)
      }
    })
  }

  const signIn = async () => {
    if (!web3) return false

    const signedMessage = await signMessage(
      process.env.NEXT_PUBLIC_OUR_SECRET,
      account,
      networkId,
      web3
    )
    if (!signedMessage) return false
    const token = await getToken(account, signedMessage, networkId)

    const localUser = fetchLocalUser()

    if (account !== localUser?.walletAddress) {
      Auth.logout()
      const DBUser = await fetchDBUser()
      const newUser = new User(DBUser)
      newUser.setToken(token)
      Auth.setUser(newUser)
      client.resetStore().then()
      setUser(newUser)
    } else {
      localUser.setToken(token)
      setUser(localUser)
    }
    return true
  }

  const signOut = () => {
    Auth.logout()
    setUser(undefined)
  }

  const signModalContent = () => {
    const handleClick = () => {
      showSignModal && setShowSignModal(false)
      signIn().then()
    }
    return (
      <Flex
        sx={{
          flexDirection: 'column',
          p: 4,
          alignItems: 'center'
        }}
      >
        <Text
          sx={{
            variant: 'text.large',
            color: 'secondary',
            marginBottom: '25px'
          }}
        >
          Please Sign with your wallet to authenticate
        </Text>
        <Button
          onClick={handleClick}
          sx={{
            cursor: 'pointer',
            width: '170px',
            background: theme.colors.primary
          }}
        >
          Sign
        </Button>
      </Flex>
    )
  }

  const showSign = () => setShowSignModal(true)

  // useEffect(() => {
  //   initOnBoard()
  // }, [])

  useEffect(() => {
    const localUser = fetchLocalUser()
    setUser(localUser)
  }, [])

  useEffect(() => {
    if (account) {
      const _user = Auth.getUser()
      if (account === _user?.walletAddress) {
        const newUser = new User(_user)
        setUser(newUser)
      } else {
        Auth.logout()
        fetchDBUser().then(res => {
          if (res) {
            const newUser = new User(res)
            Auth.setUser(newUser)
            setUser(newUser)
          } else {
            const noUser = new User()
            setUser(noUser)
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
  const isSignedIn = isEnabled && user.token

  console.log(user)

  return (
    <Provider
      value={{
        state: {
          account,
          balance,
          isEnabled,
          web3,
          networkId,
          networkName,
          provider,
          user,
          isSignedIn
        },
        actions: {
          switchWallet,
          switchToXdai,
          connectWallet,
          updateUser,
          showSign,
          signModalContent,
          signIn,
          signOut
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
