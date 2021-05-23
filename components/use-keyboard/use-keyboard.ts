import { KeyMod } from './codes'
import React, { useEffect } from 'react'
import { isMac } from '../utils/collections'

export type KeyBindings = Array<number>

export type KeyboardOptions = {
  globalEvent?: boolean
  preventDefault?: boolean
  capture?: boolean
  event?: 'keydown' | 'keypress' | 'keyup'
}

export type KeyboardResult<T> = {
  bindings: {
    onKeyDown: React.KeyboardEventHandler<T>
    onKeyDownCapture: React.KeyboardEventHandler<T>
    onKeyPress: React.KeyboardEventHandler<T>
    onKeyPressCapture: React.KeyboardEventHandler<T>
    onKeyUp: React.KeyboardEventHandler<T>
    onKeyUpCapture: React.KeyboardEventHandler<T>
  }
}

export type UseKeyboardHandler = (
  event: React.KeyboardEvent<Element> | KeyboardEvent,
) => void

export type UseKeyboard =
  | ((
      keyBindings: KeyBindings,
      options?: KeyboardOptions,
      handler?: UseKeyboardHandler,
    ) => KeyboardResult<Element>)
  | ((keyBindings: KeyBindings, handler?: UseKeyboardHandler) => KeyboardResult<Element>)

const getActiveModMap = (bindings: KeyBindings = []) => {
  const activeModMap: Record<keyof typeof KeyMod, boolean> = {
    CtrlCmd: false,
    Shift: false,
    Alt: false,
    WinCtrl: false,
  }
  for (const key of bindings) {
    const val = bindings[key]
    const modKey = KeyMod[val] as keyof typeof KeyMod | undefined
    if (modKey) {
      activeModMap[modKey] = true
    }
  }
  return activeModMap
}

const useKeyboard: UseKeyboard = (keyBindings, optionsOrHandler, handler) => {
  const options =
    typeof optionsOrHandler === 'function' ? {} : (optionsOrHandler as KeyboardOptions)
  const userHandler =
    typeof optionsOrHandler === 'function'
      ? (optionsOrHandler as UseKeyboardHandler)
      : handler
  const {
    globalEvent = true,
    capture = false,
    preventDefault = true,
    event = 'keypress',
  } = options
  const modBindings = keyBindings.filter((item: number) => !!KeyMod[item])
  const keyCode = keyBindings.filter((item: number) => !KeyMod[item])[0]
  const activeModMap = getActiveModMap(modBindings)

  const eventHandler = (event: React.KeyboardEvent | KeyboardEvent) => {
    if (activeModMap.Shift) {
      if (!event.shiftKey) return
    }
    if (activeModMap.Alt) {
      if (!event.altKey) return
    }
    if (activeModMap.CtrlCmd) {
      if (isMac()) {
        if (!event.metaKey) return
      } else {
        if (!event.ctrlKey) return
      }
    }
    if (activeModMap.WinCtrl) {
      if (isMac()) {
        if (!event.ctrlKey) return
      } else {
        if (!event.metaKey) return
      }
    }
    if (keyCode) {
      if (event.keyCode !== keyCode) return
    }
    if (preventDefault) {
      event.preventDefault()
    }
    userHandler && userHandler(event)
    return !preventDefault
  }

  useEffect(() => {
    if (globalEvent) {
      document.addEventListener(event, eventHandler)
    }
    return () => {
      document.removeEventListener(event, eventHandler)
    }
  }, [globalEvent])

  const elementBindingHandler = (
    elementEventType: 'keydown' | 'keypress' | 'keyup',
    isCapture: boolean = false,
  ) => {
    if (globalEvent) return () => {}
    if (elementEventType !== event) return () => {}
    if (isCapture !== capture) return () => {}
    return (e: React.KeyboardEvent) => {
      eventHandler(e)
    }
  }

  return {
    bindings: {
      onKeyDown: elementBindingHandler('keydown'),
      onKeyDownCapture: elementBindingHandler('keydown', true),
      onKeyPress: elementBindingHandler('keypress'),
      onKeyPressCapture: elementBindingHandler('keypress', true),
      onKeyUp: elementBindingHandler('keyup'),
      onKeyUpCapture: elementBindingHandler('keyup', true),
    },
  }
}

export default useKeyboard
