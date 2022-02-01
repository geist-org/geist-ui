import { useClasses } from 'components'
import { expect } from '@jest/globals'

describe('useClasses', () => {
  it('should be return string always', () => {
    const str = Math.random().toString()
    expect(typeof useClasses(str)).toEqual('string')
    expect(typeof useClasses(true)).toEqual('string')
    expect(typeof useClasses(null)).toEqual('string')
    expect(typeof useClasses(undefined)).toEqual('string')
    expect(typeof useClasses({})).toEqual('string')
    expect(typeof useClasses(null, undefined)).toEqual('string')
    expect(typeof useClasses(1, 0)).toEqual('string')
    expect(typeof useClasses(str, { [str]: true })).toEqual('string')
  })

  it('should be work correctly with string', () => {
    const str = Math.random().toString()
    expect(useClasses()).toEqual('')
    expect(useClasses(str)).toEqual(str)
    expect(useClasses('')).toEqual('')
    expect(useClasses(`${str} ${str}`)).toEqual(`${str} ${str}`)
  })

  it('should be work correctly with object', () => {
    expect(
      useClasses({
        a: 1,
        b: false,
        c: true,
        d: true,
      }),
    ).toEqual('a c d')
    expect(
      useClasses({
        test1: false,
        test2: false,
      }),
    ).toEqual('')
    expect(
      useClasses({
        test1: true,
        test2: true,
        test3: null,
        test4: undefined,
      }),
    ).toEqual('test1 test2')
  })

  it('should be work correctly with combination', () => {
    expect(useClasses('a', { b: false, c: true }, 'd')).toEqual('a c d')
    expect(useClasses('a', 0, 1, { b: false, c: true }, 'd')).toEqual('a 1 c d')
    expect(useClasses({ a: false, b: true }, '')).toEqual('b')
  })

  it('should be remove spaces before and after', () => {
    expect(useClasses('  test  ')).toEqual('test')
    expect(useClasses({ '  a': true })).toEqual('a')
    expect(`a${useClasses('  b  ', ' c  ', undefined)}d`).toEqual('ab cd')
  })
})
