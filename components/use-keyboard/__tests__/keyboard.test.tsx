import React, { useEffect } from 'react'
import { mount } from 'enzyme'
import { useKeyboard, KeyMod, KeyCode } from 'components'
import { renderHook, act } from '@testing-library/react-hooks'

describe('UseKeyboard', () => {
  it('should work correctly', () => {
    let code = null
    const handler = jest.fn().mockImplementation(e => {
      code = e.keyCode
    })
    const {} = renderHook(() => useKeyboard([KeyCode.KEY_H], handler))
    const event = new KeyboardEvent('keypress', { keyCode: KeyCode.KEY_H })
    document.dispatchEvent(event)
    expect(handler).toBeCalledTimes(1)
    expect(code).toEqual(KeyCode.KEY_H)
  })
})
