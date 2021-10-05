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

/**
 * Ok the user has a token, but is it still valid?
 * @param {} user
 * @param {*} signedMessage
 * @param isXDAI
 */
export async function getToken(user, signedMessage, isXDAI) {
  if (signedMessage) {
    try {
      const { data } = await client.mutate({
        mutation: DO_LOGIN,
        variables: {
          walletAddress: Web3.utils.toChecksumAddress(user?.getWalletAddress()),
          signature: signedMessage,
          email: user?.email,
          avatar: user?.avatar,
          name: user?.name,
          hostname: window.location.hostname,
          isXDAI: isXDAI
        }
      })

      const token = data?.loginWallet?.token
      const userIDFromDB = data?.loginWallet?.user?.id
      if (!userIDFromDB) throw new Error('No userId returned from the database')
      return {
        userIDFromDB,
        dbUser: data?.loginWallet?.user,
        token
      }
    } catch (error) {
      console.log('Error in token login', error)
      Logger.captureException(error)
    }
  }
}
