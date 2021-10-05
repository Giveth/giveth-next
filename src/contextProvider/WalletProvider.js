import detectEthereumProvider from '@metamask/detect-provider'
import React, { useState, useEffect, useContext } from 'react'
import { keccak256 } from 'ethers/lib/utils'
import { client } from '../apollo/client'
import { promisify } from 'util'
import { ethers } from 'ethers'
import Web3 from 'web3'
import _ from 'lodash'
import { getToken, validateAuthToken } from '../services/token'
import { GET_USER_BY_ADDRESS } from '../apollo/gql/auth'
import { PopupContext } from '../contextProvider/popupProvider'
import LoadingModal from '../components/loadingModal'
import SignInMetamaskModal from '../components/signInMetamaskModal'
import tokenAbi from 'human-standard-token-abi'
import * as Auth from '../services/auth'
import Toast from '../components/toast'
import User from '../entities/user'

import { getWallet } from '../wallets'
import { GivethBridge } from '@giveth/bridge-contract'

const WalletContext = React.createContext()
const network = process.env.NEXT_PUBLIC_NETWORK
const networkId = process.env.NEXT_PUBLIC_NETWORK_ID

let EVENT_SETUP_DONE = false
let wallet = {}

function useWallet() {
  const context = React.useContext(WalletContext)
  if (!context) {
    throw new Error(`userWallet must be used within a WalletProvider`)
  }
  return context
}

function WalletProvider(props) {
  const localStorageUser = Auth.getUser()
  const initUser = new User(localStorageUser.walletType, localStorageUser)

  const [user, setUser] = useState(initUser)
  const [ready, setReady] = useState(false)
  const [account, setAccount] = useState('')
  const [balance, setBalance] = useState(0)
  const [ethEnabled, setEthEnabled] = useState(false)
  const [currentNetwork, setCurrentNetwork] = useState(null)
  const [currentChainId, setCurrentChainId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [signInMetamask, setSignInMetamask] = useState(false)
  const [isComponentVisible, setIsComponentVisible] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(Auth.checkIfLoggedIn())
  const usePopup = useContext(PopupContext)

  const initWallet = async walletProvider => {
    const provider = await detectEthereumProvider()
    if (provider && walletProvider !== 'torus') {
      setEthEnabled(provider)
      wallet = getWallet('metamask')
    } else {
      wallet = getWallet('torus')
    }
    console.log(`wallet.isTorus : ${JSON.stringify(wallet.isTorus, null, 2)}`)

    await wallet.init(process.env.NEXT_PUBLIC_ENVIRONMENT, network)
    const networkName = await wallet?.web3.eth.net.getNetworkType()
    const currentChainId = await wallet?.web3.eth.net.getId()

    // Checks if Torus needs to re-login
    if (wallet?.isTorus && !wallet?.isLoggedIn()) {
      await logout(true)
    }
    updateBalance(
      localStorageUser?.walletAddresses?.length > 0 &&
        localStorageUser.walletAddresses[0]
    )
    setCurrentNetwork(networkName)
    setCurrentChainId(currentChainId)
    setReady(true)

    // TESTS ONLY --------------
    if (provider?.isTest) return

    // EVENTS ONLY --------------

    if (EVENT_SETUP_DONE || wallet.isTorus) return
    // const refreshPage = () => setTimeout(() => window.location.reload(), 1000)
    wallet?.provider?.on('accountsChanged', accounts => {
      if (accounts[0] && accounts[0] !== account) {
        Toast({ content: 'Account changed', type: 'warn' })
      }
    })
    wallet?.provider?.on('chainChanged', async () => {
      // needs to be fetched again as chainId is being returned like 0x
      const chainID = await wallet?.web3.eth.net.getId()
      setCurrentChainId(chainID)
      console.log({ chainID, networkId })
      if (networkId !== chainID?.toString() && chainID !== 100) {
        // 100 is xDAI
        Toast({
          content: `Ethereum network changed please use ${network} or xDAI network`,
          type: 'warn'
        })
      } else {
        // refreshPage()
      }
    })
    EVENT_SETUP_DONE = true
  }

  useEffect(() => {
    const start = () => {
      if (typeof window === 'undefined') {
        return
      }
      initWallet(localStorageUser?.walletType)
    }
    start()
  }, [])

  async function logout(walletLoggedOut) {
    if (_.isEmpty(wallet)) return
    !walletLoggedOut && wallet?.logout()
    setLoading(true)
    Auth.handleLogout()
    setIsLoggedIn(false)
    setLoading(false)
  }

  async function signMessage(message, publicAddress, loginFromXDAI) {
    try {
      await checkNetwork()
      console.log({ loginFromXDAI }, process.env.NEXT_PUBLIC_NETWORK_ID)
      let signedMessage = null
      const customPrefix = `\u0019${window.location.hostname} Signed Message:\n`
      const prefixWithLength = Buffer.from(
        `${customPrefix}${message.length.toString()}`,
        'utf-8'
      )
      const finalMessage = Buffer.concat([
        prefixWithLength,
        Buffer.from(message)
      ])

      const hashedMsg = keccak256(finalMessage)
      const send = promisify(wallet.web3.currentProvider.sendAsync)
      const msgParams = JSON.stringify({
        primaryType: 'Login',
        types: {
          EIP712Domain: [
            { name: 'name', type: 'string' },
            { name: 'chainId', type: 'uint256' },
            { name: 'version', type: 'string' }
            // { name: 'verifyingContract', type: 'address' }
          ],
          Login: [{ name: 'user', type: 'User' }],
          User: [{ name: 'wallets', type: 'address[]' }]
        },
        domain: {
          name: 'Giveth Login',
          chainId: loginFromXDAI
            ? 100
            : parseInt(process.env.NEXT_PUBLIC_NETWORK_ID),
          version: '1'
        },
        message: {
          contents: hashedMsg,
          user: {
            wallets: [publicAddress]
          }
        }
      })
      const { result } = await send({
        method: 'eth_signTypedData_v4',
        params: [publicAddress, msgParams],
        from: publicAddress
      })
      signedMessage = result

      return signedMessage
    } catch (error) {
      console.log('Signing Error!', { error })
      Toast({
        content: error?.message || 'There was an error',
        type: 'error'
      })
      return false
    }
  }

  async function updateUserInfoOnly() {
    if (!user) return null
    const { data } = await client.query({
      query: GET_USER_BY_ADDRESS,
      variables: {
        address: user?.walletAddresses[0]?.toLowerCase()
      },
      fetchPolicy: 'network-only'
    })
    const localStorageUser = Auth.getUser()
    const newUser = new User(localStorageUser.walletType, localStorageUser)
    newUser.parseDbUser(data?.userByAddress)
    setUser(newUser)
    Auth.setUser(newUser)
  }

  async function updateBalance(publicAddress) {
    if (!publicAddress) return null
    const balance = await wallet.web3.eth.getBalance(publicAddress)
    setBalance(wallet.web3.utils.fromWei(balance, 'ether'))
  }

  async function updateUser(accounts) {
    if (accounts?.length < 0) return
    const publicAddress = wallet.web3.utils.toChecksumAddress(accounts[0])
    setAccount(publicAddress)
    updateBalance(publicAddress)
    // let user
    let user
    if (typeof wallet.torus !== 'undefined') {
      const torusUser = await wallet.torus.getUserInfo()
      torusUser.walletAddresses = []
      torusUser.walletAddresses.push(publicAddress)
      user = new User('torus')
      user.parseTorusUser(torusUser)
      // user.addresses = accounts
    } else {
      user = new User('other')
      user.addWalletAddress(publicAddress, true)
    }

    const loginFromXDAI = !wallet?.isTorus && currentChainId === 100

    const signedMessage = await signMessage(
      process.env.NEXT_PUBLIC_OUR_SECRET,
      publicAddress,
      loginFromXDAI
    )
    if (!signedMessage) return

    const { userIDFromDB, token, dbUser } = await getToken(
      user,
      signedMessage,
      loginFromXDAI
    )
    user.parseDbUser(dbUser)

    user.setUserId(userIDFromDB)
    user.setToken(token)

    Auth.setUser(user)
    setIsLoggedIn(true)
    setSignInMetamask(false)
    setUser(user)
  }

  async function validateToken() {
    const isValid = await validateAuthToken(Auth.getUserToken())
    return isValid
  }

  async function login({ walletProvider, verifier }) {
    try {
      wallet = getWallet(walletProvider)
      setLoading(true)
      if (walletProvider === 'metamask') {
        setSignInMetamask(true)
        setIsComponentVisible(true)
      } else setLoading(true)
      await initWallet(walletProvider)
      console.log(`torus: login WalletProvider.login`, {
        wallet,
        walletProvider
      })
      console.log(
        `torus: login  wallet.torus is loaded : ${wallet.torus === true}`
      )
      console.log(
        `updateUser: typeof wallet : ${JSON.stringify(typeof wallet, null, 2)}`
      )
      console.log(
        `updateUser: wallet.torus : ${JSON.stringify(
          typeof wallet.torus,
          null,
          2
        )}`
      )
      console.log(
        `updateUser: wallet.isLoggedIn()  : ${JSON.stringify(
          wallet.isLoggedIn(),
          null,
          2
        )}`
      )

      if (wallet && !(wallet.isLoggedIn() && isLoggedIn)) {
        await wallet.login(verifier)
        console.log('updateUser: awaiting login')
        wallet.web3.eth.getAccounts().then(updateUser)
      }
      console.log('updateUser: post')

      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  function isWalletAddressValid(address) {
    if (address.length !== 42 || !Web3.utils.isAddress(address)) {
      return false
    } else {
      return true
    }
  }

  function isAddressENS(address) {
    return address.toLowerCase().indexOf('.eth') > -1
  }

  async function checkNetwork() {
    if (!wallet) throw new Error('No Eth Provider')
    const byPassXDAI = currentChainId === 100
    const currentNetworkId = await wallet?.web3.eth.getChainId()
    if (currentNetworkId?.toString() === networkId || byPassXDAI) {
      return true
    } else {
      usePopup?.triggerPopup('WrongNetwork')
      throw new Error(`Wrong network, please change to ${network} or xDAI`)
    }
  }

  async function sendTransaction(
    params,
    txCallbacks,
    contractAddress,
    fromSigner,
    traceableDonation = false
  ) {
    try {
      await checkNetwork(true)
      let web3Provider = wallet?.web3.eth
      let txn = null
      const txParams = {
        to: params?.to
        // value: params?.value
      }

      if (!fromSigner) {
        // Can be signed instantly by current provider
        const fromAccount = await web3Provider.getAccounts()
        txParams.from = fromAccount[0]
      } else {
        // It will be signed later by provider
        web3Provider = fromSigner
      }

      // TRACEABLE DONATION

      if (traceableDonation) {
        //
        // DEV: 0x279277482F13aeF92914317a0417DD591145aDc9
        // RELEASE: 0xC59dCE5CCC065A4b51A2321F857466A25ca49B40
        // TRACE: 0x30f938fED5dE6e06a9A7Cd2Ac3517131C317B1E7

        // TODO !!!!!!!!!!!!
        const givethBridgeCurrent = new GivethBridge(
          wallet?.web3,
          process.env.NEXT_PUBLIC_GIVETH_BRIDGE_ADDRESS
        )
        console.log({ givethBridgeCurrent })
        return alert('This is a trace donation, do something NOW!')
      }

      // ERC20 TRANSFER
      if (contractAddress) {
        const instance = fromSigner
          ? new ethers.Contract(contractAddress, tokenAbi, fromSigner)
          : new web3Provider.Contract(tokenAbi, contractAddress)
        console.log({ instance })
        const decimals = instance?.decimals
          ? await instance.decimals()
          : await instance.methods.decimals().call()
        txParams.value = ethers.utils.parseUnits(
          params?.value,
          parseInt(decimals)
        )

        if (fromSigner) {
          txn = await instance.transfer(txParams?.to, txParams?.value)
          txCallbacks?.onTransactionHash(txn?.hash, txn?.from)
          return txn
        }
        const from = await web3Provider.getAccounts()

        return instance.methods
          .transfer(txParams?.to, txParams?.value)
          .send({
            from: from[0]
          })
          .on('transactionHash', txCallbacks?.onTransactionHash)
          .on('receipt', function (receipt) {
            console.log('receipt>>>', receipt)
            txCallbacks?.onReceiptGenerated(receipt)
          })
          .on('error', error => txCallbacks?.onError(error)) // If a out of gas error, the second parameter is the receipt.
      }

      // REGULAR ETH TRANSFER
      txParams.value = ethers.utils.parseEther(params?.value)
      if (!txCallbacks || fromSigner) {
        // gets hash and checks until it's mined
        txn = await web3Provider.sendTransaction(txParams)
        txCallbacks?.onTransactionHash(txn?.hash, txn?.from)
      } else {
        // using the event emitter
        return web3Provider
          .sendTransaction(txParams)
          .on('transactionHash', txCallbacks?.onTransactionHash)
          .on('receipt', function (receipt) {
            console.log('receipt>>>', receipt)
            txCallbacks?.onReceiptGenerated(receipt)
          })
          .on('error', error => txCallbacks?.onError(error)) // If a out of gas error, the second parameter is the receipt.
      }

      console.log('stTxn ---> : ', { txn })
      return txn
    } catch (error) {
      console.log('Error sending transaction: ', { error })
      const err = new Error(error)
      err.data = error
      throw err
    }
  }

  async function getAddressFromENS(address) {
    const ens = await wallet.web3.eth.ens.getOwner(address)
    let zeroXAddress
    if (ens !== '0x0000000000000000000000000000000000000000') {
      zeroXAddress = ens
    } else {
      zeroXAddress = address
    }

    if (isWalletAddressValid(zeroXAddress)) {
      return zeroXAddress
    } else {
      return new Error('Error gettingAddressFromENS')
    }
  }

  const value = React.useMemo(() => {
    return {
      login,
      validateToken,
      sendTransaction,
      checkNetwork,
      ethEnabled,
      account,
      balance,
      isLoggedIn,
      updateUser,
      updateUserInfoOnly,
      logout,
      user,
      ready,
      network,
      currentNetwork,
      currentChainId,
      isWalletAddressValid,
      isAddressENS,
      getAddressFromENS,
      wallet
    }
  }, [
    account,
    ready,
    balance,
    ethEnabled,
    isLoggedIn,
    user,
    currentNetwork,
    currentChainId
  ])
  return (
    <WalletContext.Provider value={value} {...props}>
      {loading && <LoadingModal isOpen={loading} />}
      {signInMetamask && (
        <SignInMetamaskModal
          isOpen={signInMetamask && isComponentVisible}
          close={() => setIsComponentVisible(false)}
        />
      )}
      {props.children}
    </WalletContext.Provider>
  )
}

export { WalletProvider, useWallet }
