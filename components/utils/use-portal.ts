import { useEffect, useState } from 'react'
import useSSR from '../utils/use-ssr'
import { getId } from './collections'

const createElement = (id: string): HTMLElement => {
  const el = document.createElement('div')
  el.setAttribute('id', id)
  return el
}

const usePortal = (selectId: string = getId()): HTMLElement | null => {
  const id = `zeit-ui-${selectId}`
  const { isBrowser } = useSSR()
  const [elSnapshot, setElSnapshot] = useState<HTMLElement | null>(
    isBrowser ? createElement(id) : null,
  )

  useEffect(() => {
    const hasElement = document.querySelector<HTMLElement>(`#${id}`)
    const el = hasElement || createElement(id)

    if (!hasElement) {
      document.body.appendChild(el)
    }
    setElSnapshot(el)
  }, [])

  return elSnapshot
}

export default usePortal
