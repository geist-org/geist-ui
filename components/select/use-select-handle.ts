import { useRef, RefObject } from 'react'
import { SelectHandles } from './select-context'

const useSelectHandle = () => {
  const ref: RefObject<SelectHandles> = useRef(null)
  return {
    setValue(value: string | string[] = '') {
      return ref.current?.setValue(value)
    },
    getValue() {
      return ref.current?.getValue()
    },
    ref,
  }
}

export default useSelectHandle
