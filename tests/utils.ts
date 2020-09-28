import { act } from 'react-dom/test-utils'
import { ReactWrapper } from 'enzyme'

export const sleep = (time: number) => {
  return new Promise(resolve => setTimeout(resolve, time))
}

export const updateWrapper = async (wrapper: ReactWrapper, time: number = 0) => {
  await act(async () => {
    await sleep(time)
    wrapper.update()
  })
}

export const mockNativeEvent = (fn: Function = () => {}) => ({
  nativeEvent: { stopImmediatePropagation: fn },
})

export const resizeWindow = (width: number, height?: number) => {
  Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: width })
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: height,
  })
}

export const nativeEvent = mockNativeEvent()
