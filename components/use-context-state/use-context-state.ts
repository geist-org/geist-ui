import { Dispatch, MutableRefObject, SetStateAction, useMemo } from 'react'
import useCurrentState from '../use-current-state'

export type ContextStateOnUpdate<T> = <K extends keyof T>(key: K, nextValue: T[K]) => void

export type ContextHandlerKey<T extends string | number> = `${T}Update`

export type ContextHandler<S> = Record<ContextHandlerKey<Exclude<keyof S, symbol>>, (next: S[keyof S]) => void>

export type ContextHandlerWhere<T> = <K extends keyof T>(key: K, next: T[K]) => void

export type ContextStates<S> = S & ContextHandler<S> & { update: ContextHandlerWhere<S> }

export type ContextStatesType<S> = [ContextStates<S>, Dispatch<SetStateAction<S>>, MutableRefObject<S>]

const useContextState = <S extends Record<string, unknown>>(
  initialState: Required<S> | (() => Required<S>),
  onUpdate?: ContextStateOnUpdate<S>,
): ContextStatesType<S> => {
  const [state, setState, stateRef] = useCurrentState(initialState)
  
  const update: ContextHandlerWhere<S> = (key, next) => {
    setState(last => ({ ...last, [key]: next }))
    onUpdate && onUpdate(key, next)
  }
  const makeUpdates = () => {
    const keys = Object.keys(state) as Array<keyof S>
    return keys.reduce<ContextHandler<S>>((pre, current) => {
      const updateHandler = {
        [`${current}Update`]: (nextValue: S[typeof current]) => {
          update(current, nextValue)
        }
      }
      return { ...pre, ...updateHandler }
    }, {} as ContextHandler<S>)
  }
  const updates: ContextHandler<S> = makeUpdates()
  
  const stateMemo = useMemo<ContextStates<S>>(() => ({
    update,
    ...state,
    ...updates,
  }), [state])
  
  return [stateMemo, setState, stateRef]
}

export default useContextState
