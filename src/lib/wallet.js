import Web3 from 'web3'

export function isAddressENS(ens) {
  return ens.toLowerCase().indexOf('.eth') > -1
}

export function isWalletAddressValid(address) {
  return !(address?.length !== 42 || !Web3.utils.isAddress(address))
}

export async function getAddressFromENS(ens, web3) {
  const isEns = isAddressENS(ens)
  if (!isEns) return new Error('Error addressNotENS')

  const address = await web3.eth.ens.getOwner(ens)

  let zeroXAddress = '0x0000000000000000000000000000000000000000'

  return address === zeroXAddress ? new Error('Error gettingAddressFromENS') : address
}
