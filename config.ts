const config = {
  PRIMARY_NETWORK: {
    name: 'Mainnet',
    id: 1,
    chain: '0x1'
  },
  SECONDARY_NETWORK: {
    name: 'xDai',
    id: 100,
    chain: '0x64'
  },
  LINKS: {
    BACKEND: 'https://serve.giveth.io/graphql',
    FRONTEND: 'https://giveth.io/',
    REPORT_ISSUE: 'https://github.com/Giveth/giveth-next/issues/new',
    PROJECT_VERIFY: 'https://giveth.typeform.com/verification',
    GIVECONOMY: 'https://liquidity-mining-dapp.vercel.app/',
    DISCORD: 'https://discord.gg/Uq2TaXP9bC',
    DISCOURSE: 'https://forum.giveth.io/',
    GITHUB: 'https://github.com/Giveth/',
    TELEGRAM: 'https://t.me/Givethio',
    MEDIUM: 'https://medium.com/giveth/',
    TWITTER: 'https://twitter.com/Givethio',
    YOUTUBE: 'https://www.youtube.com/channel/UClfutpRoY0WTVnq0oB0E0wQ',
    REDDIT: 'https://reddit.com/r/giveth'
  },
  GIV_TOKEN: {
    MAINNET: '0x067eA48882E6D728A37acfd1535ec03f8E33794a',
    XDAI: '0x7aade4907a8e2412beacbe42e51aaee5b6085f24'
  }
}

if (process.env.NEXT_PUBLIC_ENVIRONMENT === 'dev') {
  config.LINKS.FRONTEND = 'http://localhost:3000/'
  config.PRIMARY_NETWORK = {
    name: 'Ropsten',
    id: 3,
    chain: '0x3'
  }
}

export default config
