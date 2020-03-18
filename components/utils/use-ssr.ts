
const isBrowser = (): boolean => {
  return Boolean(typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement)
}

export type SSRState = {
  isBrowser: boolean
  isServer: boolean
}

const useSSR = (): SSRState => {
  return {
    isBrowser: isBrowser(),
    isServer: !isBrowser(),
  }
}

export default useSSR
