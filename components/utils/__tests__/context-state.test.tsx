import useContextState from '../use-context-state/use-context-state'
import { renderHook, act } from '@testing-library/react-hooks'

describe('UseContextState', () => {
  it('should work correctly', () => {
    type MyContext = {
      name: string
    }
    const { result } = renderHook(() => useContextState<MyContext>({ name: 'react' }))
    expect(result.current[0]?.name).toEqual('react')

    act(() => result.current[1]({ name: 'angular' }))
    expect(result.current[0]?.name).toEqual('angular')
    expect(result.current[2].current?.name).toEqual('angular')
  })

  it('should work correctly with update handler', () => {
    const { result } = renderHook(() => useContextState({ name: 'react' }))
    const state = result.current[0]
    act(() => state.update('name', 'angular'))
    expect(result.current[0]?.name).toEqual('angular')
    expect(result.current[2].current?.name).toEqual('angular')

    act(() => state.update('name', 'nodejs'))
    expect(result.current[0]?.name).toEqual('nodejs')
    expect(result.current[2].current?.name).toEqual('nodejs')
  })

  it('should work correctly with single handler', () => {
    const { result } = renderHook(() => useContextState({ name: 'react' }))
    const state = result.current[0]
    act(() => state?.setName('angular'))
    expect(result.current[0]?.name).toEqual('angular')
    expect(result.current[2].current?.name).toEqual('angular')

    act(() => state?.setName('express'))
    expect(result.current[0]?.name).toEqual('express')
    expect(result.current[2].current?.name).toEqual('express')
  })

  it('A function should be generated for each child', () => {
    const initial = {
      book1: 1,
      book2: '1',
      book3: undefined,
      book4: 0,
      book5: null,
    }
    const { result } = renderHook(() => useContextState(initial))
    expect(result.current[0]?.setBook1).toBeInstanceOf(Function)
    expect(result.current[0]?.setBook2).toBeInstanceOf(Function)
    expect(result.current[0]?.setBook3).toBeInstanceOf(Function)
    expect(result.current[0]?.setBook4).toBeInstanceOf(Function)
    expect(result.current[0]?.setBook5).toBeInstanceOf(Function)
  })

  it('The listener should be called when the value is updated', () => {
    let value = undefined,
      key = undefined
    const handler = jest.fn().mockImplementation((k: unknown, v: unknown) => {
      value = v
      key = k
    })
    const { result } = renderHook(() =>
      useContextState<{ year: string | undefined }>(
        { year: undefined },
        {
          onChange: (key, next) => {
            handler(key, next)
          },
        },
      ),
    )
    const state = result.current[0]
    act(() => state.update('year', '2021'))
    expect(handler).toBeCalledTimes(1)
    expect(value).toBe('2021')
    expect(key).toBe('year')
  })
})
