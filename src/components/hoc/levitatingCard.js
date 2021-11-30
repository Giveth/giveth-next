import React from 'react'
import { animated } from '@react-spring/web'

// const calcXY = (x, y) => [
//   -(y - window.innerHeight / 2) / 20,
//   (x - window.innerWidth / 2) / 10,
//   1
// ]
// const calcXYsteady = (x, y) => [-0.5, 0.5, 1]
// TODO understand this
// const perspective = (x, y, s) =>
//   `perspective(500px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

function LevitatingCard({ children, style }) {
  // const [props, set] = useSpring(() => ({
  //   xys: [0, 0, 1],
  //   config: { mass: 5, tension: 200, friction: 100 }
  // }))

  const sx = { ...style }
  // const sx = { ...style, ...{ transform: props.xys.interpolate(perspective) } }

  return (
    <>
      <animated.div
        // onMouseMove={({ clientX: x, clientY: y }) =>
        //   set({ xys: steady ? calcXYsteady(x, y) : calcXY(x, y) })
        // }
        // onMouseLeave={() => set({ xys: [0, 0, 1] })}
        style={sx}
        className='levitating-card '
      >
        {children}
      </animated.div>
      <style global jsx>
        {`
          .levitating-card {
            align-items: center;
            border-radius: 15px;
            box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
            transition: box-shadow 0.5s;
          }

          .levitating-card:hover {
            box-shadow: 0px 30px 100px -10px rgba(0, 0, 0, 0.4);
          }
        `}
      </style>
    </>
  )
}

export default LevitatingCard
