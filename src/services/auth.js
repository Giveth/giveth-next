import { isSSR } from '../lib/helpers'

export const getUser = () =>
  !isSSR() && window.localStorage.getItem(getLocalStorageUserLabel())
    ? JSON.parse(window.localStorage.getItem(getLocalStorageUserLabel()))
    : {}

export function setUser(user) {
  return window.localStorage.setItem(getLocalStorageUserLabel(), JSON.stringify(user))
}

export const logout = () => {
  if (!isSSR()) {
    window.localStorage.removeItem(getLocalStorageUserLabel())
    window.localStorage.removeItem('create-form')
    window.localStorage.removeItem('cached-uploaded-imgs')
    // TODO: let's check if we should remove everything or just be careful
    // window.localStorage.clear()
  }
}

export function getLocalStorageUserLabel() {
  return process.env.NEXT_PUBLIC_LOCAL_USER_LABEL
    ? process.env.NEXT_PUBLIC_LOCAL_USER_LABEL + '_' + process.env.ENVIRONMENT
    : 'nextUser' + '_' + process.env.ENVIRONMENT
}
