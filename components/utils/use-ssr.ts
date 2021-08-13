import { useEffect, useState } from 'react'
import { isBrowser } from './collections'

export type SSRState = {
  isBrowser: boolean
  isServer: boolean
}

const useSSR = (): SSRState => {
  const [browser, setBrowser] = useState<boolean>(false)
  useEffect(() => {
    setBrowser(isBrowser())
  }, [])

  return {
    isBrowser: browser,
    isServer: !browser,
  }
}

export default useSSR
