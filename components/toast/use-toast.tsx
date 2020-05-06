import React, { useEffect, useRef } from 'react'
import { NormalTypes } from '../utils/prop-types'
import useCurrentState from '../utils/use-current-state'
import { useZEITUIContext } from '../utils/use-zeit-ui-context'
import { ToastWithID } from './toast-container'
import { getId } from '../utils/collections'

export interface ToastAction {
  name: string
  handler: (event: React.MouseEventHandler<HTMLButtonElement>, cancel: Function) => void
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

const useToasts = (): [Array<Toast>, (t: Toast) => void] => {
  const { updateToasts, toastHovering, toasts } = useZEITUIContext()
  const destoryStack = useRef<Array<string>>([])
  const destoryTimer = useRef<number | undefined>()
  const maxDestoryTime = useRef<number>(0)
  const [, setHovering, hoveringRef] = useCurrentState<boolean>(toastHovering)

  useEffect(() => setHovering(toastHovering), [toastHovering])

  const destoryAll = (delay: number) => {
    // Wait for all components to display before destroying
    // The destory means direct remove all element, whether in animation or not.
    const nextDestoryTime = delay + 500
    /* istanbul ignore next */
    if (nextDestoryTime < maxDestoryTime.current) return
    clearTimeout(destoryTimer.current)
    maxDestoryTime.current = nextDestoryTime

    destoryTimer.current = window.setTimeout(() => {
      /* istanbul ignore next */
      updateToasts((currentToasts: Array<ToastWithID>) => {
        if (destoryStack.current.length < currentToasts.length) {
          return currentToasts
        }
        destoryStack.current = []
        return []
      })
      clearTimeout(destoryTimer.current)
    }, maxDestoryTime.current)
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
      destoryStack.current.push(id)
      destoryAll(delay)
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
