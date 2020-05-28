import { MutableRefObject, useEffect } from 'react'

const useDOMObserver = (
  ref: MutableRefObject<HTMLElement | null> | undefined,
  callback: MutationCallback = () => {},
) => {
  const config = { attributes: false, childList: true, subtree: true }

  useEffect(() => {
    if (!ref || !ref.current) return
    let unmount = false
    const done: MutationCallback = (...params) => {
      if (unmount) return
      callback(...params)
    }
    const observer = new MutationObserver(done)
    observer.observe(ref.current, config)
    return () => {
      unmount = true
      observer.disconnect()
    }
  }, [ref])
}

export default useDOMObserver
