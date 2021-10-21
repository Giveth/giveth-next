import { ethers } from 'ethers'

const infuraId = process.env.NEXT_PUBLIC_INFURA_ID
const network = process.env.NEXT_PUBLIC_NETWORK
const provider = new ethers.providers.InfuraProvider(network, infuraId)

export async function isSmartContract(projectWalletAddress) {
  const code = await provider.getCode(projectWalletAddress)

  return code !== '0x'
}
