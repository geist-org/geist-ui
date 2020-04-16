export const sleep = (time: number) => {
  return new Promise(resolve => setTimeout(resolve, time))
}

export const mockNativeEvent = (fn: Function = () => {}) => ({
  nativeEvent: { stopImmediatePropagation: fn }
})

export const nativeEvent = mockNativeEvent()
