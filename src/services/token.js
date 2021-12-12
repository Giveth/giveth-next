import Web3 from 'web3'
import { client } from '../apollo/client'
import { DO_LOGIN, VALIDATE_TOKEN } from '../apollo/gql/auth'
import Logger from '../Logger'

export async function validateAuthToken(token) {
  try {
    const { data } = await client.mutate({
      mutation: VALIDATE_TOKEN,
      variables: {
        token
      }
    })

    return data.validateToken
  } catch (error) {
    console.error('Error in token login', error)
    Logger.captureException(error)
  }
}

export async function getToken(walletAddress, signedMessage, networkId) {
  if (signedMessage && walletAddress) {
    try {
      const { data } = await client.mutate({
        mutation: DO_LOGIN,
        variables: {
          walletAddress: Web3.utils.toChecksumAddress(walletAddress),
          signature: signedMessage,
          hostname: window.location.hostname,
          networkId
        }
      })
      return data?.loginWallet?.token
    } catch (error) {
      console.log('Error in token login', error)
      Logger.captureException(error)
    }
  }
}
