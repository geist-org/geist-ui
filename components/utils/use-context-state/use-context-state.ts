import { Dispatch, MutableRefObject, SetStateAction, useMemo } from 'react'
import useCurrentState from '../use-current-state'
import { capitalize } from '../collections'

export type ContextStateOnChange<T> = <K extends keyof T>(key: K, nextValue: T[K]) => void
export type ContextHandler<S> = {
  [K in keyof S as `set${Capitalize<string & K>}`]: (next: S[K]) => void
}

export type ContextHandlerWhere<T> = <K extends keyof T>(key: K, next: T[K]) => void
export type ContextStates<S> = S & ContextHandler<S> & { update: ContextHandlerWhere<S> }
export type ContextStatesType<S> = [
  ContextStates<S>,
  Dispatch<SetStateAction<S>>,
  MutableRefObject<S>,
]

export type ContextStateFilter<T> = <K extends keyof T>(
  key: K,
  nextValue: T[K],
) => boolean

const useContextState = <S extends Record<string, unknown>>(
  initialState: Required<S> | (() => Required<S>),
  options?: {
    filter?: ContextStateFilter<S>
    onChange?: ContextStateOnChange<S>
  },
): ContextStatesType<S> => {
  const [state, setState, stateRef] = useCurrentState(initialState)

  const update: ContextHandlerWhere<S> = (key, next) => {
    const allowChange = options?.filter ? options?.filter(key, next) : true
    if (!allowChange) return
    setState(last => ({ ...last, [key]: next }))
    options?.onChange && options?.onChange(key, next)
  }
  const makeUpdates = () => {
    const keys = Object.keys(state) as Array<keyof S>
    return keys.reduce<ContextHandler<S>>((pre, current) => {
      const updateHandler = {
        [`set${capitalize(current)}`]: (nextValue: S[typeof current]) => {
          update(current, nextValue)
        },
      }
      return { ...pre, ...updateHandler }
    }, {} as ContextHandler<S>)
  }
  const updates: ContextHandler<S> = makeUpdates()

  const stateMemo = useMemo<ContextStates<S>>(
    () => ({
      update,
      ...state,
      ...updates,
    }),
    [state],
  )

  return [stateMemo, setState, stateRef]
}

export default useContextState
