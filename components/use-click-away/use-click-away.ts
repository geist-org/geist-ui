import { MutableRefObject, useEffect, useRef } from 'react'

export type ClickAwayGetContainer = () => HTMLElement | null

const useClickAway = (
  ref: MutableRefObject<HTMLElement | null>,
  handler: (event: Event) => void,
) => {
  const handlerRef = useRef(handler)
  useEffect(() => {
    handlerRef.current = handler
  }, [handlerRef])

  useEffect(() => {
    const callback = (event: Event) => {
      const el = ref.current
      if (!event || !el || el.contains((event as any).target)) return
      handlerRef.current(event)
    }

    document.addEventListener('click', callback)
    return () => document.removeEventListener('click', callback)
  }, [ref])
}

export default useClickAway
