import { Dispatch, MutableRefObject, SetStateAction, useEffect, useRef, useState } from 'react'

export type CurrentStateType<S> = [
  S, Dispatch<SetStateAction<S>>, MutableRefObject<S>
]

const useCurrentState = <S,>(initialState: S): CurrentStateType<S> => {
  const [state, setState] = useState<S>(initialState)
  const ref = useRef<S>(initialState)

  useEffect(() => {
    ref.current = state
  }, [state])

  const setValue = (val: S) => {
    ref.current = val
    setState(val)
  }

  return [state, setValue, ref]
}

export default useCurrentState
