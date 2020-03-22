import { Dispatch, MutableRefObject, SetStateAction } from 'react'
import useCurrentState from '../utils/use-current-state'

const useTabs = (initialValue: string): {
  state: string
  setState: Dispatch<SetStateAction<string>>
  currentRef: MutableRefObject<string>
  bindings: {
    value: string
    onChange: (val: string) => void
  }
} => {
  const [state, setState, currentRef] = useCurrentState<string>(initialValue)
  
  return {
    state,
    setState,
    currentRef,
    bindings: {
      value: state,
      onChange: (val: string) => {
        setState(val)
      },
    },
  }
}

export default useTabs
