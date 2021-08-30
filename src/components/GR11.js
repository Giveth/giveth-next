import React from 'react'
import { Flex, Button, Text } from 'theme-ui'
import { useSpring, animated, to } from '@react-spring/web'

const calcXY = (x, y) => [
  -(y - window.innerHeight / 2) / 20,
  (x - window.innerWidth / 2) / 150,
  1.0
]

const perspective = (x, y, s) =>
  `perspective(500px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

function GR11 () {
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 200, friction: 100 }
  }))

  return (
    <>
      <animated.div
        onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calcXY(x, y) })}
        onMouseLeave={() => set({ xys: [0, 0, 1] })}
        style={{ transform: props.xys.interpolate(perspective) }}
        className='gr11'
      >
        <Flex
          style={{
            flex: 1,
            flexDirection: ['column', 'row', 'row'],
            px: '15%'
          }}
        >
          <Flex sx={{ flex: 0.5, background: 'blue' }}>
            <Text>Sept 8-23</Text>
          </Flex>
          <Flex sx={{ flex: 0.5, flexDirection: 'column', background: 'red' }}>
            <Text>Gitcoin Grants</Text>
            <Text>Round 11 is here!</Text>
            <Text>
              Donate to support Giveth with the power of Quadratic Funding
            </Text>
            <Button
              type='submit'
              variant='buttons.default'
              sx={{
                maxWidth: '230px',
                height: '52px',
                fontWeight: 'bold',
                fontSize: 2,
                lineHeight: 'button',
                letterSpacing: 'normal'
              }}
            >
              DONATE ON GITCOIN
            </Button>
          </Flex>
        </Flex>
      </animated.div>
      <style global jsx>
        {`
          .gr11 {
            margin: 0 15%;
            align-items: center;
            border-radius: 15px;
            box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
            transition: box-shadow 0.5s;
          }

          .gr11:hover {
            box-shadow: 0px 30px 100px -10px rgba(0, 0, 0, 0.4);
          }
        `}
      </style>
    </>
  )
}

export default GR11
