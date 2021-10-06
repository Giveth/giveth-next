import React, { createContext, useEffect, useState } from 'react'
import Onboard from 'bnc-onboard'
import Web3 from 'web3'

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

  const initOnBoard = () => {
    if (validProvider) return

    const _onboard = Onboard({
      dappId,
      networkId: defaultNetworkId,
      subscriptions: {
        wallet: wallet => {
          window.localStorage.setItem('selectedWallet', wallet.name)
          const _web3 = new Web3(wallet.provider)
          setValidProvider(!!wallet.provider)
          setWeb3(_web3)
          setProvider(wallet.provider)
        },
        network: _network => setNetworkId(_network),
        address: _address => setAccount(_address),
        balance: _balance => setBalance(_balance / 10 ** nativeTokenDecimals)
      },
      walletSelect: {
        wallets
      }
    })

    const previouslySelectedWallet =
      window.localStorage.getItem('selectedWallet')
    if (previouslySelectedWallet) {
      _onboard
        .walletSelect(previouslySelectedWallet)
        .then(selected => selected && _onboard.walletCheck().then())
    } else {
      _onboard
        .walletSelect()
        .then(selected => selected && _onboard.walletCheck().then())
    }
    setOnboard(_onboard)
  }

  const switchWallet = () => {
    onboard
      .walletSelect()
      .then(selected => selected && onboard.walletCheck().then())
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

  useEffect(() => {
    if (networkId) onboard.config({ networkId })
  }, [networkId])

  const isEnabled = !!web3 && !!account && balance !== undefined && !!networkId

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
          provider
        },
        actions: {
          switchWallet,
          switchToXdai,
          enableProvider,
          initOnBoard
        }
      }}
    >
      {props.children}
    </Provider>
  )
}

export { Context }
export default Web3Provider
