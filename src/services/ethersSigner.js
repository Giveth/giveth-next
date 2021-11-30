import { ethers } from 'ethers'

function getSigner(provider) {
  try {
    return new ethers.providers.Web3Provider(provider.provider).getSigner()
  } catch (error) {
    console.log({ error })
  }
}

export default getSigner
