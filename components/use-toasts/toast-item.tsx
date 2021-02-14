import React, { useEffect, useMemo, useState } from 'react'
import useTheme from '../use-theme'
import { Toast, ToastAction } from './use-toast'
import Button from '../button'
import { NormalTypes } from '../utils/prop-types'
import { GeistUIThemesPalette } from '../themes/presets'

type ToastWithID = Toast & {
  id: string
  willBeDestroy?: boolean
  cancel: () => void
}

export interface ToatItemProps {
  index: number
  total: number
  toast: ToastWithID
  onHover: boolean
}

const toastActions = (actions: Toast['actions'], cancelHandle: () => void) => {
  const handler = (
    event: React.MouseEvent<HTMLButtonElement>,
    userHandler: ToastAction['handler'],
  ) => {
    userHandler && userHandler(event, cancelHandle)
  }
  if (!actions || !actions.length) return null
  return actions.map((action, index) => (
    <Button
      auto
      size="mini"
      type={action.passive ? 'default' : 'secondary'}
      key={`action-${index}`}
      onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
        handler(event, action.handler)
      }>
      {action.name}
    </Button>
  ))
}

const getColors = (palette: GeistUIThemesPalette, type?: NormalTypes) => {
  const colors: { [key in NormalTypes]: string } = {
    default: palette.background,
    secondary: palette.secondary,
    success: palette.success,
    warning: palette.warning,
    error: palette.error,
  }
  const isDefault = !type || type === 'default'
  if (isDefault)
    return {
      bgColor: colors.default,
      color: palette.foreground,
    }
  /**
   * Prevent main color change in special types.
   * The color will only follow the theme when it is in the default type.
   */
  return {
    bgColor: colors[type as NormalTypes],
    color: 'white',
  }
}

const ToastItem: React.FC<ToatItemProps> = React.memo(
  ({ index, total, toast, onHover }) => {
    const theme = useTheme()
    const { color, bgColor } = useMemo(() => getColors(theme.palette, toast.type), [
      theme.palette,
      toast.type,
    ])
    const [visible, setVisible] = useState<boolean>(false)
    const [hide, setHide] = useState<boolean>(false)
    const reverseIndex = useMemo(() => total - (index + 1), [total, index])
    const translate = useMemo(() => {
      const calc = `100% + -75px + -${20 * reverseIndex}px`
      if (reverseIndex >= 4) return `translate3d(0, -75px, -${reverseIndex}px) scale(.7)`
      if (onHover) {
        return `translate3d(0, ${reverseIndex * -75}px, -${reverseIndex}px) scale(${
          total === 1 ? 1 : 0.98205
        })`
      }
      return `translate3d(0, calc(${calc}), -${reverseIndex}px) scale(${
        1 - 0.05 * reverseIndex
      })`
    }, [onHover, index, total, reverseIndex])

    useEffect(() => {
      const timer = setTimeout(() => {
        setVisible(true)
        clearTimeout(timer)
      }, 10)
      return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
      let unMount = false
      const shouldBeHide = reverseIndex > 2 || toast.willBeDestroy
      if (!shouldBeHide || unMount) return
      const timer = setTimeout(() => {
        setHide(true)
        clearTimeout(timer)
      }, 150)
      return () => {
        unMount = true
        clearTimeout(timer)
      }
    }, [reverseIndex, toast.willBeDestroy])
    /* istanbul ignore next */
    if (reverseIndex > 10) return null

    return (
      <div
        key={`${toast.id}-${index}`}
        className={`toast ${visible ? 'visible' : ''} ${hide ? 'hide' : ''}`}>
        <div className="message">{toast.text}</div>
        <div className="action">{toastActions(toast.actions, toast.cancel)}</div>
        <style jsx>{`
          .toast {
            width: 420px;
            max-width: 90vw;
            max-height: 75px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: ${theme.palette.foreground};
            background-color: ${bgColor};
            color: ${color};
            border: 0;
            border-radius: ${theme.layout.radius};
            padding: ${theme.layout.gap};
            position: absolute;
            bottom: 0;
            right: 0;
            opacity: ${reverseIndex > 4 ? 0 : 1};
            box-shadow: ${reverseIndex > 4 ? 'none' : theme.expressiveness.shadowSmall};
            transform: translate3d(0, 100%, 0px) scale(1);
            transition: transform 400ms ease 0ms, visibility 200ms ease 0ms,
              opacity 200ms ease 0ms;
          }

          .toast.visible {
            opacity: 1;
            transform: ${translate};
          }

          .toast.hide {
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
          }

          .message {
            align-items: center;
            height: 100%;
            transition: opacity 0.4s ease;
            font-size: 0.875rem;
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

          .toast :global(button + button) {
            margin-left: ${theme.layout.gapQuarter};
          }
        `}</style>
      </div>
    )
  },
)

export default ToastItem
