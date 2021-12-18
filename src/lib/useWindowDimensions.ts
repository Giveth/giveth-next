import { useState, useEffect } from 'react'
import { isSSR } from './helpers'

const SSR = isSSR()

function getWindowDimensions() {
  if (SSR) return undefined
  return window.innerWidth
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    !SSR && window.addEventListener('resize', handleResize)
    return () => {
      !SSR && window.removeEventListener('resize', handleResize)
    }
  }, [])

  return windowDimensions || 1000
}
