import React, { useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import usePortal from '../utils/use-portal'
import useTheme from '../styles/use-theme'
import { useZEITUIContext } from '../utils/use-zeit-ui-context'
import { Toast } from './use-toast'
import ToastItem from './toast-item'

export type ToastWithID = Toast & {
  id: string
  willBeDestroy?: boolean
  cancel: Function
}

const ToastContainer: React.FC<React.PropsWithChildren<{}>> = () => {
  const portal = usePortal('toast')
  const theme = useTheme()
  const [hover, setHover] = useState<boolean>(false)
  const timer = useRef<number | undefined>()
  const { toasts, updateToastHoverStatus } = useZEITUIContext()
  const toastElements = useMemo(
    () =>
      toasts.map((t, i) => (
        <ToastItem
          index={i}
          total={toasts.length}
          toast={t}
          onHover={hover}
          key={`toast-${t.id}-${i}`}
        />
      )),
    [toasts, hover],
  )
  const hoverHandler = (onHover: boolean) => {
    if (onHover) {
      timer.current && clearTimeout(timer.current)
      updateToastHoverStatus(() => true)
      return setHover(true)
    }
    timer.current = window.setTimeout(() => {
      setHover(false)
      updateToastHoverStatus(() => false)
      timer.current && clearTimeout(timer.current)
    }, 200)
  }

  if (!portal) return null
  if (!toasts || toasts.length === 0) return null
  return createPortal(
    <div
      className={`toast-container ${hover ? 'hover' : ''}`}
      onMouseEnter={() => hoverHandler(true)}
      onMouseLeave={() => hoverHandler(false)}>
      {toastElements}
      <style jsx>{`
        .toast-container {
          position: fixed;
          width: 420px;
          max-width: 90vw;
          bottom: ${theme.layout.gap};
          right: ${theme.layout.gap};
          z-index: 2000;
          transition: all 400ms ease;
          box-sizing: border-box;
        }

        .toast-container.hover {
          transform: translate3d(0, -10px, 0);
        }
      `}</style>
    </div>,
    portal,
  )
}

export default ToastContainer
