import gql from 'graphql-tag'
const SAVE_DONATION = gql`
  mutation (
    $chainId: Float!
    $fromAddress: String!
    $toAddress: String!
    $transactionId: String
    $transactionNetworkId: Float!
    $amount: Float!
    $token: String!
    $projectId: Float!
    $transakId: String
    $transakStatus: String
  ) {
    saveDonation(
      chainId: $chainId
      fromAddress: $fromAddress
      toAddress: $toAddress
      transactionId: $transactionId
      transactionNetworkId: $transactionNetworkId
      amount: $amount
      token: $token
      projectId: $projectId
      transakId: $transakId
      transakStatus: $transakStatus
    )
  }
`
const SAVE_DONATION_TRANSACTION = gql`
  mutation ($transactionId: String!, $donationId: Float!) {
    saveDonationTransaction(transactionId: $transactionId, donationId: $donationId)
  }
`
const WALLET_DONATIONS = gql`
  query donationsFromWallets($fromWalletAddresses: [String!]!) {
    donationsFromWallets(fromWalletAddresses: $fromWalletAddresses) {
      transactionId
      transactionNetworkId
      toWalletAddress
      fromWalletAddress
      anonymous
      amount
      valueUsd
      valueEth
      priceEth
      priceUsd
      user {
        id
        firstName
        lastName
      }
      project {
        title
      }
      createdAt
      currency
    }
  }
`

const PROJECT_DONATIONS = gql`
  query donationsToWallets($toWalletAddresses: [String!]!) {
    donationsToWallets(toWalletAddresses: $toWalletAddresses) {
      transactionId
      transactionNetworkId
      toWalletAddress
      fromWalletAddress
      anonymous
      amount
      valueUsd
      valueEth
      priceEth
      priceUsd
      user {
        id
        name
        walletAddress
        firstName
        lastName
      }
      project {
        title
      }
      createdAt
      currency
    }
  }
`

const USERS_DONATIONS = gql`
  query {
    donationsByDonor {
      transactionId
      transactionNetworkId
      transakTransactionLink
      toWalletAddress
      fromWalletAddress
      anonymous
      amount
      valueUsd
      user {
        id
        firstName
        lastName
      }
      project {
        title
        slug
      }
      createdAt
      currency
    }
  }
`

const FETCH_TOKEN_PRICE = gql`
  query ($id: String) {
    tokens(where: { id: $id }) {
      id
      derivedETH
    }
  }
`

const FETCH_ETH_PRICE = gql`
  query {
    bundle(id: "1") {
      ethPrice
    }
  }
`

export {
  SAVE_DONATION,
  USERS_DONATIONS,
  WALLET_DONATIONS,
  PROJECT_DONATIONS,
  SAVE_DONATION_TRANSACTION,
  FETCH_ETH_PRICE,
  FETCH_TOKEN_PRICE
}
