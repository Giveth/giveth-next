import Image from 'next/image'

const Logo = () => {
  let siteLogo
  const siteId = process.env.NEXT_PUBLIC_SITE_ID

  if (siteId === 'giveth') {
    siteLogo = '/images/giveth-logo-blue.svg'
  } else if (siteId === 'co2ken') {
    siteLogo = '/images/logos/co2ken-logo.png'
  }

  return (
    <div style={{ marginRight: '10px' }}>
      <Image src={siteLogo} alt='logo' width='60px' height='60px' />
    </div>
  )
}

export default Logo
