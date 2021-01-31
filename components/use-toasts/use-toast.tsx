import React, { useEffect } from 'react'
import { NormalTypes } from '../utils/prop-types'
import useCurrentState from '../utils/use-current-state'
import { useGeistUIContext } from '../utils/use-geist-ui-context'
import { ToastWithID } from './toast-container'
import { getId } from '../utils/collections'

export interface ToastAction {
  name: string
  handler: (event: React.MouseEvent<HTMLButtonElement>, cancel: () => void) => void
  passive?: boolean
}

export interface Toast {
  text?: string | React.ReactNode
  type?: NormalTypes
  delay?: number
  actions?: Array<ToastAction>
}

const defaultToast = {
  delay: 2000,
}

let destoryStack: Array<string> = []
let maxDestoryTime: number = 0
let destoryTimer: number | undefined

const useToasts = (): [Array<Toast>, (t: Toast) => void] => {
  const { updateToasts, toastHovering, toasts } = useGeistUIContext()
  const [, setHovering, hoveringRef] = useCurrentState<boolean>(toastHovering)

  useEffect(() => setHovering(toastHovering), [toastHovering])

  const destoryAll = (delay: number, time: number) => {
    /* istanbul ignore next */
    if (time <= maxDestoryTime) return
    clearTimeout(destoryTimer)
    maxDestoryTime = time

    destoryTimer = window.setTimeout(() => {
      /* istanbul ignore next */
      updateToasts((currentToasts: Array<ToastWithID>) => {
        if (destoryStack.length < currentToasts.length) {
          return currentToasts
        }
        destoryStack = []
        return []
      })
      clearTimeout(destoryTimer)
    }, delay + 350)
  }

  const setToast = (toast: Toast): void => {
    const id = `toast-${getId()}`
    const delay = toast.delay || defaultToast.delay

    const cancel = (id: string, delay: number) => {
      updateToasts((currentToasts: Array<ToastWithID>) => {
        return currentToasts.map(item => {
          if (item.id !== id) return item
          return { ...item, willBeDestroy: true }
        })
      })
      destoryStack.push(id)
      destoryAll(delay, performance.now())
    }

    updateToasts((currentToasts: Array<ToastWithID>) => {
      const newToast = {
        ...toast,
        id,
        delay,
        cancel: () => cancel(id, delay),
      }
      return [...currentToasts, newToast]
    })

    const hideToast = (id: string, delay: number) => {
      const hideTimer = window.setTimeout(() => {
        if (hoveringRef.current) {
          hideToast(id, delay)
          return clearTimeout(hideTimer)
        }
        cancel(id, delay)
        clearTimeout(hideTimer)
      }, delay)
    }

    hideToast(id, delay)
  }

  return [toasts, setToast]
}

export default useToasts
