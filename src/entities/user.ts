import { getLocalStorageTokenLabel } from '../services/auth'
import { shortenAddress } from '../lib/helpers'

const tokenLabel = getLocalStorageTokenLabel()

export default class User {
  id: number
  token: string
  activeWalletIndex: number
  walletAddresses: string[]
  walletAddress: string
  email?: string
  firstName?: string
  lastName?: string
  name?: string
  password?: string
  avatar?: string
  url?: string
  location?: string
  loginType: string
  confirmed: boolean
  walletType: string

  constructor(walletType, initUser) {
    this.walletType = walletType
    this.walletAddresses = []

    if (initUser) {
      this.parseInitUser(initUser)
    }
  }

  parseInitUser(initUser) {
    if (this.walletType === 'torus') {
      this.parseTorusUser(initUser)
    } else {
      this.walletType = initUser.walletType
      this.walletAddresses = initUser.walletAddresses
      this.walletAddress = initUser.walletAddress
      this.id = initUser.id
      this.token = initUser.token
      this.parseDbUser(initUser)
    }
  }

  parseDbUser(dbUser) {
    this.avatar = dbUser.avatar
    this.email = dbUser.email
    this.id = dbUser.id
    this.firstName = dbUser.firstName
    this.lastName = dbUser.lastName
    this.location = dbUser.location
    this.name = dbUser.name
    this.url = dbUser.url
  }

  setUserId(userId) {
    this.id = userId
  }

  setToken(token) {
    this.token = token

    localStorage.setItem(tokenLabel, token)
  }

  addWalletAddress(address, activeWallet) {
    this.walletAddress = address
    if (activeWallet) {
      this.activeWalletIndex = this.walletAddresses.indexOf(address)
    }
  }

  getName() {
    return this.name ? this.name.toUpperCase() : shortenAddress(this.getWalletAddress())
    // return /(.+)@(.+){2,}\.(.+){2,}/.test(this.name)
    //         ? this.name?.toUpperCase()
    //         : this.name
  }

  getWalletAddress() {
    return this.walletAddress
  }
  // organisations: Organisation[]

  parseTorusUser(torusUser) {
    if (this.walletType !== 'torus') throw Error('Only valid for Torus wallets')
    this.avatar = torusUser.profileImage || torusUser.avatar
    this.name = torusUser.name
    this.email = torusUser.email
    this.id = torusUser.id
    // this.addWalletAddress(walletAddress, true)
    torusUser.walletAddresses.forEach(address => {
      this.addWalletAddress(address, true)
    })
  }
}
