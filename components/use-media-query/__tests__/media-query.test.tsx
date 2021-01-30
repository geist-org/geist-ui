import { useMediaQuery } from 'components'
import { renderHook } from '@testing-library/react-hooks'
// @ts-ignore
import mediaQuery from 'css-mediaquery'

const mediaListMock = (width: number) => {
  ;(window as any).listeners = [] as Array<() => unknown>
  return (query: string) => {
    return {
      matches: mediaQuery.match(query, { width }),
      addListener: (fn: () => unknown) => (window as any).listeners.push(fn),
      removeListener: () => {},
    }
  }
}

describe('UseMediaQuery with SSR', () => {
  beforeAll(() => {
    ;(window as any).matchMedia = undefined
  })

  it('should work correctly', () => {
    const { result } = renderHook(() => useMediaQuery('xs'))
    expect(result.current).toEqual(false)
  })

  it('should work correctly with ssr match', () => {
    const ssrMatchMedia = (query: string) => ({
      matches: mediaQuery.match(query, {
        width: '100px',
      }),
    })
    const { result } = renderHook(() =>
      useMediaQuery('xs', {
        ssrMatchMedia,
      }),
    )
    expect(result.current).toEqual(true)

    const { result: result2 } = renderHook(() =>
      useMediaQuery('sm', {
        ssrMatchMedia,
      }),
    )
    expect(result2.current).toEqual(false)
  })
})

describe('UseMediaQuery', () => {
  beforeAll(() => {
    ;(window as any).matchMedia = mediaListMock(1500)
  })

  it('should work correctly', () => {
    const { result } = renderHook(() => useMediaQuery('xs'))
    expect(result.current).toEqual(false)
  })

  it('should hit', () => {
    const { result } = renderHook(() => useMediaQuery('lg'))
    expect(result.current).toEqual(true)
  })

  it('different match types should be supported', () => {
    const { result } = renderHook(() =>
      useMediaQuery('md', {
        match: 'up',
      }),
    )
    expect(result.current).toEqual(true)
    const { result: result2 } = renderHook(() =>
      useMediaQuery('md', {
        match: 'down',
      }),
    )
    expect(result2.current).toEqual(false)
  })
})
