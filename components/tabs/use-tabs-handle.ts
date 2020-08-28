import { useRef, RefObject } from 'react'
import { Handles } from './tabs-context'

export default function useImperative() {
  const ref: RefObject<Handles> = useRef(null)
  return {
    getCurrentTab() {
      return ref.current?.getCurrentTab()
    },
    setCurrentTab(v: string) {
      ref.current?.setCurrentTab(v)
    },
    ref,
  }
}
