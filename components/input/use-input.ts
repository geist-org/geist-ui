import React, { Dispatch, MutableRefObject, SetStateAction } from 'react'
import useCurrentState from '../utils/use-current-state'

const useInput = (
  initialValue: string,
): {
  state: string
  setState: Dispatch<SetStateAction<string>>
  currentRef: MutableRefObject<string>
  reset: () => void
  bindings: {
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  }
} => {
  const [state, setState, currentRef] = useCurrentState<string>(initialValue)

  return {
    state,
    setState,
    currentRef,
    reset: () => setState(initialValue),
    bindings: {
      value: state,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setState(event.target.value)
      },
    },
  }
}

export default useInput
