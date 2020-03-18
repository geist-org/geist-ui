import { useEffect, useState } from 'react'
import useSSR from '../utils/use-ssr'

const getId = () => {
  return Math.random().toString(32).slice(2, 10)
}

const createElement = (id: string): HTMLElement => {
  const el = document.createElement('div')
  el.setAttribute('id', id)
  return el
}

const usePortal = (selectId: string = getId()): Element | null => {
  const id = `zeit-ui-${selectId}`
  const { isBrowser } = useSSR()
  const [elSnapshot, setElSnapshot] = useState<Element | null>(isBrowser ? createElement(id) : null)
  
  useEffect(() => {
    const hasElement = document.querySelector(`#${id}`)
    const el = hasElement || createElement(id)

    if (!hasElement) {
      document.body.appendChild(el)
    }
    setElSnapshot(el)
  
    return () => {
      const node = document.getElementById(id)
      if (node) {
        // document.body.removeChild(node)
      }
    }
  }, [])

  return elSnapshot
}

export default usePortal
