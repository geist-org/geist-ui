import React, { useMemo } from 'react'
import useTheme from '../use-theme'
import type { Toast, ToastLayout } from './use-toast'
import CssTransition from '../shared/css-transition'
import { makeToastActions, getColors, getTranslateByPlacement } from './helpers'

export interface ToastItemProps {
  toast: Toast
  layout: Required<ToastLayout>
}

const ToastItem: React.FC<ToastItemProps> = React.memo(({ toast, layout }) => {
  const theme = useTheme()
  const { color, bgColor } = useMemo(
    () => getColors(theme.palette, toast.type),
    [theme.palette, toast.type],
  )
  const isReactNode = typeof toast.text !== 'string'
  const { padding, margin, maxHeight, maxWidth, width, placement } = layout
  const { enter, leave } = useMemo(() => getTranslateByPlacement(placement), [placement])

  return (
    <CssTransition name="toast" visible={toast.visible} clearTime={350}>
      <div key={toast.id} className="toast">
        {isReactNode ? (
          toast.text
        ) : (
          <>
            <div className="message">{toast.text}</div>
            <div className="action">{makeToastActions(toast.actions, toast.cancel)}</div>
          </>
        )}

        <style jsx>{`
          .toast {
            width: ${width};
            max-width: ${maxWidth};
            max-height: ${maxHeight};
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: ${theme.palette.foreground};
            background-color: ${bgColor};
            color: ${color};
            border: 0;
            border-radius: ${theme.layout.radius};
            opacity: 1;
            box-shadow: ${theme.expressiveness.shadowSmall};
            transition: all 350ms cubic-bezier(0.1, 0.2, 0.1, 1);
            overflow: hidden;
          }
          .message {
            align-items: center;
            height: 100%;
            font-size: 0.875em;
            display: -webkit-box;
            word-break: break-all;
            padding-right: ${theme.layout.gapHalf};
            overflow: hidden;
            max-height: 100%;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            line-height: 1.1rem;
          }
          .toast-enter {
            opacity: 0;
            height: 0;
            padding: 0;
            margin: 0;
            transform: ${enter};
          }
          .toast-enter-active {
            opacity: 1;
            height: auto;
            margin: ${margin};
            padding: ${padding};
            transform: translate(0, 0);
          }
          .toast-leave {
            opacity: 1;
            transform: translate(0, 0);
            height: auto;
            margin: ${margin};
            padding: ${padding};
          }
          .toast-leave-active {
            opacity: 0;
            transform: ${leave};
          }
        `}</style>
      </div>
    </CssTransition>
  )
})

export default ToastItem
