import { Dispatch, MutableRefObject, SetStateAction, useEffect, useRef, useState } from 'react'

export type ElementStackItem = {
  last: string
}

const elementStack = new Map<HTMLElement, ElementStackItem>()

const isIos = () => {
  if (typeof window === 'undefined' || !window.navigator) return false
  return /iP(ad|hone|od)/.test(window.navigator.platform)
}

const touchHandler = (event: TouchEvent): boolean => {
  if (event.touches.length > 1) return true
  event.preventDefault()
  return false
}

const useBodyScroll = (
  elementRef?: MutableRefObject<HTMLElement>
): [boolean, Dispatch<SetStateAction<boolean>>] => {
  if (typeof document === 'undefined') return [false, (t: boolean) => t]
  const elRef = elementRef || useRef<HTMLElement>(document.body)
  const [hidden, setHidden] = useState<boolean>(false)

  useEffect(() => {
    const lastOverflow = elRef.current.style.overflow
    if (hidden) {
      if (elementStack.has(elRef.current)) return
      if (!isIos()) {
        elRef.current.style.overflow = 'hidden'
      } else {
        document.addEventListener('touchmove', touchHandler, { passive: false })
      }
      elementStack.set(elRef.current, {
        last: lastOverflow,
      })
      return
    }
  
    // reset element overflow
    if (!elementStack.has(elRef.current)) return
    if (!isIos()) {
      const store = elementStack.get(elRef.current) || { last: 'auto' }
      elRef.current.style.overflow = store.last
    } else {
      document.removeEventListener('touchmove', touchHandler)
    }
    elementStack.delete(elRef.current)
  }, [hidden, elRef.current])

  return [hidden, setHidden]
}

export default useBodyScroll
