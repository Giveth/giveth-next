import { GivethBridge } from '@giveth/bridge-contract'
import { ethers } from 'ethers'
import tokenAbi from 'human-standard-token-abi'
import { keccak256 } from 'ethers/lib/utils'
import { promisify } from 'util'
import Toast from '../components/toast'

export const shortenAddress = (address, charsLength = 4) => {
  const prefixLength = 2 // "0x"
  if (!address) {
    return ''
  }
  if (address.length < charsLength * 2 + prefixLength) {
    return address
  }
  return `${address.slice(0, charsLength + prefixLength)}…${address.slice(-charsLength)}`
}

export async function sendTransaction(
  web3,
  params,
  txCallbacks,
  contractAddress,
  fromSigner,
  traceableDonation = false
) {
  try {
    let web3Provider = web3.eth
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
        web3,
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
      txParams.value = ethers.utils.parseUnits(params?.value, parseInt(decimals))

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

export async function signMessage(message, publicAddress, chainId, web3) {
  try {
    // await checkNetwork()
    let signedMessage = null
    const customPrefix = `\u0019${window.location.hostname} Signed Message:\n`
    const prefixWithLength = Buffer.from(`${customPrefix}${message.length.toString()}`, 'utf-8')
    const finalMessage = Buffer.concat([prefixWithLength, Buffer.from(message)])

    const hashedMsg = keccak256(finalMessage)
    const send = promisify(web3.currentProvider.sendAsync)
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
        chainId,
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
