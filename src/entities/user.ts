import { getLocalStorageTokenLabel } from '../services/auth'
import { shortenAddress } from '../lib/helpers'

const tokenLabel = getLocalStorageTokenLabel()

export default class User {
  id: number
  token: string
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

  constructor(initUser) {
    if (initUser) {
      this.parseInitUser(initUser)
    }
  }

  parseInitUser(initUser) {
    this.walletAddress = initUser.walletAddress
    this.id = initUser.id
    this.token = initUser.token
    this.parseDbUser(initUser)
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

  addWalletAddress(address) {
    this.walletAddress = address
  }

  getName() {
    return this.name ? this.name.toUpperCase() : shortenAddress(this.walletAddress)
    // return /(.+)@(.+){2,}\.(.+){2,}/.test(this.name)
    //         ? this.name?.toUpperCase()
    //         : this.name
  }
}
