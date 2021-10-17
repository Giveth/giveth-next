import transakSDK from '@transak/transak-sdk'
import { SAVE_DONATION, SAVE_DONATION_TRANSACTION } from '../apollo/gql/donations'
import { client } from '../apollo/client'

export async function saveDonation(
  fromAddress: string,
  toAddress: string,
  transactionId: string,
  transactionNetworkId: number,
  amount: number,
  token: string,
  projectId: number
) {
  const saveDonationErrors = []
  let donationId: any = 0
  try {
    const { data } = await client.mutate({
      mutation: SAVE_DONATION,
      variables: {
        chainId: transactionNetworkId,
        fromAddress,
        toAddress,
        transactionId,
        transactionNetworkId,
        amount,
        token,
        projectId
      }
    })
    const { saveDonation: saveDonationId } = data
    donationId = saveDonationId
  } catch (error) {
    saveDonationErrors.push(error)
  }
  return {
    donationId,
    saveDonationErrors,
    savedDonation: saveDonationErrors.length === 0
  }
}

export async function saveDonationTransaction(hash: string, donationId: Number) {
  const saveDonationTransactionErrors = []
  let savedDonationTransaction: any = 0
  try {
    const { data } = await client.mutate({
      mutation: SAVE_DONATION_TRANSACTION,
      variables: {
        transactionId: hash?.toString(),
        donationId
        // anonymous: false
      }
    })
    savedDonationTransaction = data
  } catch (error) {
    saveDonationTransactionErrors.push(error)
  }

  return {
    savedDonationTransaction,
    saveDonationTransactionErrors
  }
}

export async function startTransakDonation({project, amount}) {
  const request = await fetch(`/api/transak`)
  const response = await request.json()
  const apiKey = response?.apiKey

  const transak = new transakSDK({
    apiKey: apiKey,  // Your API Key
    environment:  process.env.NEXT_PUBLIC_ENVIRONMENT == 'production' ? 'PRODUCTION' :'STAGING', // STAGING/PRODUCTION
    defaultCryptoCurrency: 'DAI',
    walletAddress: project.walletAddress, // Your customer's wallet address
    themeColor: '000000', // App theme color
    fiatCurrency: '', // INR/GBP
    cryptoCurrencyList: 'ETH,DAI,USDT',
    email: '', // Your customer's email address
    redirectURL: '',
    hostURL: window.location.origin,
    widgetHeight: '550px',
    widgetWidth: '450px',
    fiatAmount: amount,
    exchangeScreenTitle: `Donate to ${project.title}`,
    hideMenu: true
  });

  transak.init();

  transak.on(transak.ALL_EVENTS, (data) => {
		console.log(data)
  });
}