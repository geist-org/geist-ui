import React, { useEffect, useRef, useState } from 'react'
import useSSR from '../utils/use-ssr'
import { createPortal } from 'react-dom'

const Portal: React.FC<React.PropsWithChildren<{}>> = React.memo(({
  children,
}) => {
  const { isBrowser } = useSSR()
  const [mounted, setMounted] = useState<boolean>(false)
  const ref = useRef(isBrowser ? document.createElement('div') : null)
  
  useEffect(() => {
    if (!isBrowser) return
    if (!ref.current) {
      ref.current = document.createElement('div')
    }
    if (!mounted) {
      document.body.appendChild(ref.current)
      setMounted(true)
    }
    
    return () => {
      if (!ref.current) return
      document.body.removeChild(ref.current)
      ref.current.remove()
    }
  }, [isBrowser])
  
  if (!isBrowser || !ref.current) return null
  return createPortal(children, ref.current)
})

export default Portal
