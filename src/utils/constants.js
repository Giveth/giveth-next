export const categoryList = [
  { name: 'community', value: 'Community', source: 'adhoc' },
  { name: 'food', value: 'Food', source: 'adhoc' },
  { name: 'non-profit', value: 'Non-profit', source: 'adhoc' },
  { name: 'housing', value: 'Housing', source: 'adhoc' },
  { name: 'technology', value: 'Technology', source: 'adhoc' },
  { name: 'research', value: 'Research', source: 'adhoc' },
  { name: 'nutrition', value: 'Nutrition', source: 'adhoc' },
  { name: 'art-culture', value: 'Art & Culture', source: 'adhoc' },
  { name: 'agriculture', value: 'Agriculture', source: 'IRIS' },
  { name: 'air', value: 'Air', source: 'IRIS' },
  { name: 'biodiversity', value: 'Biodiversity', source: 'IRIS' },
  { name: 'climate', value: 'Climate', source: 'IRIS' },
  { name: 'inclusion', value: 'Inclusion', source: 'IRIS' },
  { name: 'education', value: 'Education', source: 'IRIS' },
  { name: 'employment', value: 'Employment', source: 'IRIS' },
  { name: 'energy', value: 'Energy', source: 'IRIS' },
  { name: 'finance', value: 'Finance', source: 'IRIS' },
  { name: 'health', value: 'Health', source: 'IRIS' },
  { name: 'infrastructure', value: 'Infrastructure', source: 'IRIS' },
  { name: 'land', value: 'Land', source: 'IRIS' },
  { name: 'oceans', value: 'Oceans', source: 'IRIS' },
  { name: 'pollution', value: 'Pollution', source: 'IRIS' },
  { name: 'real-estate', value: 'Real Estate', source: 'IRIS' },
  { name: 'waste', value: 'Waste', source: 'IRIS' },
  { name: 'water', value: 'Water', source: 'IRIS' },
  { name: 'other', value: 'Other', source: 'adhoc' }
]

export const maxSelectedCategory = 5

export const gqlEnums = {
  QUALITYSCORE: 'QualityScore',
  CREATIONDATE: 'CreationDate',
  ACCEPTGIV: 'AcceptGiv',
  BALANCE: 'Balance',
  VERIFIED: 'Verified',
  TRACEABLE: 'Traceable',
  HEARTS: 'Reactions',
  DONATIONS: 'Donations',
  DESC: 'DESC',
  ASC: 'ASC'
}

const rpcUrl = process.env.NEXT_PUBLIC_ETHEREUM_NODE
const portisKey = process.env.NEXT_PUBLIC_PORTIS_KEY
const infuraKey = process.env.NEXT_PUBLIC_INFURA_ID
const CONTACT_EMAIL = 'info@giveth.io'

export const onboardWallets = [
  { walletName: 'metamask' },
  { walletName: 'torus' },
  {
    walletName: 'portis',
    apiKey: portisKey
  },
  {
    walletName: 'trezor',
    appUrl: 'https://giveth.io/',
    email: CONTACT_EMAIL,
    rpcUrl
  },
  {
    walletName: 'lattice',
    appName: 'Giveth 2.0',
    rpcUrl
  },
  {
    walletName: 'ledger',
    rpcUrl
  },
  // { walletName: 'dapper' },
  // { walletName: 'coinbase' },
  // { walletName: 'status' },
  // { walletName: 'unilogin' },
  // { walletName: 'authereum', disableNotifications: true },
  // { walletName: 'gnosis' },
  {
    walletName: 'walletConnect',
    infuraKey
  },
  { walletName: 'opera' }
  // { walletName: 'operaTouch' },
  // { walletName: 'imToken', rpcUrl },
  // { walletName: 'meetone' },
  // { walletName: 'mykey' },
  // { walletName: 'wallet.io', rpcUrl }
]

export const walletsArray = [
  {
    name: 'MetaMask',
    image: '/images/wallets/metamask.svg'
  },
  {
    name: 'Torus',
    image: '/images/wallets/torus.svg'
  },
  {
    name: 'Portis',
    image: '/images/wallets/portis.svg'
  },
  {
    name: 'Ledger',
    image: '/images/wallets/ledger.svg'
  },
  {
    name: 'Trezor',
    image: '/images/wallets/trezor.svg'
  },
  {
    name: 'WalletConnect',
    image: '/images/wallets/walletConnect.svg'
  },
  {
    name: 'Lattice',
    image: '/images/wallets/lattice.svg'
  },
  {
    name: 'Opera',
    image: '/images/wallets/opera.svg'
  }
]
