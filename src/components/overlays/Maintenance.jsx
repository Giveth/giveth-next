import styled from '@emotion/styled'
import { Giv_500, Gray_100, Semantic_Warning_400 } from '../styled-components/Colors'
import { H1, H4 } from '../styled-components/Typography'

export const OverlayMaintenace = ({ setShowMaintenance }) => {
  return (
    <OverlayMaintenaceContainer>
      <Arc1 src='/images/arc-2.png' />
      <Arc2 src='/images/arc-2.png' />
      <Gear1 src='/images/gear.png' />
      <Gear2 src='/images/gear.png' />
      <Gear3
        src='/images/gear.png'
        onClick={() => {
          setShowMaintenance(false)
        }}
      />
      <Gear4 src='/images/gear.png' />
      <Alert src='/images/alert-gold.png' />
      <Title>Giveth.io is currently offline for scheduled maintenance! </Title>
      <Desc>
        Check again in a few hours to dive
        <div>
          <span> back into the</span>
          <span> Future of Giving</span>
        </div>
      </Desc>
      <img src='/images/logotype-white.png' />
      <SocialRow>
        <a href='https://discord.giveth.io/'>
          <img src='/images/social/discord.svg' />
        </a>
        <a href='https://medium.com/giveth/'>
          <img src='/images/social/medium.svg' />
        </a>
        <a href='https://twitter.com/givethio'>
          <img src='/images/social/twitter.svg' />
        </a>
      </SocialRow>
    </OverlayMaintenaceContainer>
  )
}

const OverlayMaintenaceContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 10000;
  background-color: ${Giv_500};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  color: ${Gray_100};
  text-align: center;
  min-height: 100vh;
  /* background-image: url('/images/bg/giv.png'); */
  /* background-repeat: repeat; */
`

const Arc1 = styled.img`
  position: absolute;
  top: 0;
  right: 0;
`

const Arc2 = styled.img`
  position: absolute;
  bottom: 0;
  left: 0;
  transform: scaleX(-1);
`

const Gear1 = styled.img`
  position: absolute;
  bottom: 60px;
  right: -60px;
  width: 120px;
`
const Gear2 = styled.img`
  position: absolute;
  bottom: 96px;
  right: 54px;
  width: 170px;
`
const Gear3 = styled.img`
  position: absolute;
  bottom: 4px;
  right: 46px;
  width: 92px;
`

const Gear4 = styled.img`
  position: absolute;
  top: 82px;
  left: -71px;
  width: 180px;
`
const Alert = styled.img`
  position: relative;
  margin-top: 64px;
`

const Title = styled(H1)`
  position: relative;
  max-width: 1047px;
  margin: 0;
`
const Desc = styled(H4)`
  position: relative;
  margin: 0;
  font-weight: 400;
  & > div {
    font-weight: 700;
    & :nth-child(2) {
      color: ${Semantic_Warning_400};
    }
  }
`

const SocialRow = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 40px;
`
