import React, { createContext, useEffect, useState } from 'react'
import Onboard from 'bnc-onboard'
import Web3 from 'web3'
import { Button, Flex, Text } from 'theme-ui'

import { client } from '../apollo/client'
import { GET_USER_BY_ADDRESS } from '../apollo/gql/auth'
import User from '../entities/user'
import * as Auth from '../services/auth'
import { getToken } from '../services/token'
import { compareAddresses, signMessage } from '../lib/helpers'
import Modal from '../components/modal'
import theme from '../utils/theme-ui'
import { onboardWallets } from '../utils/constants'
import WalletModal from '../components/WalletModal'

const Context = createContext({})
const { Provider } = Context

const nativeTokenDecimals = 18
const defaultNetworkId = Number(process.env.NEXT_PUBLIC_NETWORK_ID)
const dappId = process.env.NEXT_PUBLIC_BLOCK_NATIVE_DAPP_ID

const Web3Provider = props => {
  const [networkId, setNetworkId] = useState()
  const [web3, setWeb3] = useState()
  const [provider, setProvider] = useState()
  const [account, setAccount] = useState()
  const [balance, setBalance] = useState()
  const [onboard, setOnboard] = useState({})
  const [networkName, setNetworkName] = useState()
  const [user, setUser] = useState()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showWalletModal, setShowWalletModal] = useState(false)

  const isEnabled = !!web3 && !!account && !!networkId && !!user
  const isSignedIn = isEnabled && user.token
  const isXdai = networkId === 100

  const initOnBoard = initialRun => {
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
        address: _address => setAccount(_address),
        balance: _balance => setBalance(_balance / 10 ** nativeTokenDecimals)
      },
      walletSelect: {
        wallets: onboardWallets
      }
    })

    const previouslySelectedWallet = window?.localStorage.getItem('selectedWallet')
    if (previouslySelectedWallet) {
      _onboard.walletSelect(previouslySelectedWallet).then()
    } else if (!initialRun) {
      setShowWalletModal(true)
    }

    setOnboard(_onboard)
  }

  const switchWallet = walletName => {
    onboard.walletSelect(walletName).then(selected => {
      if (selected) {
        onboard.walletCheck().then()
      }
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
    const localUser = Auth.getUser()
    return new User(localUser)
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
      .then(res => res.data?.userByAddress)
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
      await client.resetStore()
      setUser(newUser)
    } else {
      localUser.setToken(token)
      Auth.setUser(localUser)
      await client.resetStore()
      setUser(localUser)
    }
    return true
  }

  const signOut = () => {
    const _user = new User(user)
    _user.setToken(undefined)
    Auth.setUser(_user)
    client.resetStore().then()
    setUser(_user)
  }

  const loginModalContent = () => {
    const handleClick = () => {
      showLoginModal && setShowLoginModal(false)
      isEnabled ? signIn().then() : connectWallet()
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
          Please {isEnabled ? 'Sign with your wallet' : 'Connect Wallet'} to authenticate
        </Text>
        <Button
          onClick={handleClick}
          sx={{
            cursor: 'pointer',
            width: '170px',
            background: theme.colors.primary
          }}
        >
          {isEnabled ? 'Sign' : 'Connect Wallet'}
        </Button>
      </Flex>
    )
  }

  const loginModal = () => setShowLoginModal(true)

  useEffect(() => {
    const localUser = fetchLocalUser()
    setUser(localUser)
    initOnBoard(true)
  }, [])

  useEffect(() => {
    if (account) {
      const _user = Auth.getUser()
      if (compareAddresses(account, _user?.walletAddress)) {
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
    } else {
      if (user) setUser(undefined)
    }
  }, [account])

  useEffect(() => {
    if (networkId) {
      onboard.config({ networkId })
      if (isXdai) setNetworkName('xDai')
      else web3?.eth.net.getNetworkType().then(name => setNetworkName(name))
    }
  }, [networkId])

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
          connectWallet,
          updateUser,
          loginModal,
          loginModalContent,
          signIn,
          signOut,
          showWalletModal: () => setShowWalletModal(true)
        }
      }}
    >
      {showLoginModal && (
        <Modal isOpen={showLoginModal} onRequestClose={() => setShowLoginModal(false)}>
          {loginModalContent()}
        </Modal>
      )}
      {showWalletModal && (
        <WalletModal showModal={showWalletModal} closeModal={() => setShowWalletModal(false)} />
      )}
      {props.children}
    </Provider>
  )
}

export { Context }
export default Web3Provider
