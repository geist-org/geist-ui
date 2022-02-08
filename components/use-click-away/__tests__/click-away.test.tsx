import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { useClickAway } from 'components'

const simulateNativeClick = (el: Element) => {
  el.dispatchEvent(
    new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    }),
  )
}

describe('UseClickAway', () => {
  it('should work correctly', () => {
    const handler = jest.fn()
    const ref = React.createRef() as React.MutableRefObject<HTMLDivElement>
    ref.current = document.createElement('div')
    const el = ref.current
    document.body.appendChild(el)
    renderHook(() => useClickAway(ref, handler))

    simulateNativeClick(el)
    expect(handler).not.toHaveBeenCalled()
    simulateNativeClick(document.body)
    expect(handler).toHaveBeenCalled()
  })

  it('should no errors when element missing', () => {
    const errorSpy = jest.spyOn(console, 'error')
    const ref = React.createRef<HTMLDivElement>()
    renderHook(() => useClickAway(ref, () => {}))

    expect(errorSpy).not.toHaveBeenCalled()
  })

  it('should update handler reference', async () => {
    const ref = React.createRef() as React.MutableRefObject<HTMLDivElement>
    ref.current = document.createElement('div')
    const handler1 = jest.fn()
    const handler2 = jest.fn()
    let isFirstRender = true
    const { rerender } = renderHook(() => {
      const handler = isFirstRender ? handler1 : handler2
      useClickAway(ref, handler)
      isFirstRender = false
    })
    simulateNativeClick(document.body)
    expect(handler1).toHaveBeenCalled()

    rerender()
    simulateNativeClick(document.body)
    expect(handler2).toHaveBeenCalled()
  })
})
