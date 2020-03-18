import React, { useEffect, useMemo, useState } from 'react'
import useTheme from '../styles/use-theme'
import { Toast } from './use-toast'
import Button from '../button'
import { NormalTypes } from '../utils/prop-types'
import { ZeitUIThemesPalette } from '../styles/themes'

type ToastWithID = Toast & {
  id: string
  willBeDestroy?: boolean
  cancel: Function
}

export interface ToatItemProps {
  index: number
  total: number
  toast: ToastWithID
  onHover: boolean
}

const toastActions = (actions: Toast['actions'], cancelHandle: Function) => {
  const handler = (event: React.MouseEvent<HTMLButtonElement>, userHandler: Function) => {
    userHandler && userHandler(event, cancelHandle)
  }
  if (!actions || !actions.length) return null
  return actions.map((action, index) => (
    <Button auto size="mini" type={action.passive ? 'default' : 'secondary'}
      key={`action-${index}`}
      onClick={(event: React.MouseEvent<HTMLButtonElement>) => handler(event, action.handler)}
    >{action.name}</Button>
  ))
}

const getColors = (palette: ZeitUIThemesPalette, type?: NormalTypes) => {
  const colors: { [key in NormalTypes]: string } = {
    default: palette.background,
    secondary: palette.secondary,
    success: palette.success,
    warning: palette.warning,
    error: palette.error,
  }
  if (!type || type === 'default') return {
    bgColor: colors.default,
    color: palette.foreground,
  }
  return {
    bgColor: colors[type],
    color: palette.background,
  }
}

const ToastItem: React.FC<ToatItemProps> = React.memo(({
  index, total, toast, onHover,
}) => {
  const theme = useTheme()
  const { color, bgColor } = getColors(theme.palette, toast.type)
  const [visible, setVisible] = useState<boolean>(false)
  const [hide, setHide] = useState<boolean>(false)
  
  const reverseIndex = useMemo(() => total - (index + 1), [total, index])
  const translate = useMemo(() => {
    const calc = `100% + -75px + -${20 * reverseIndex}px`
    if (reverseIndex > 5) return `translate3d(0, -75px, -${reverseIndex}px) scale(.01)`
    if (onHover) {
      return `translate3d(0, ${reverseIndex * -75}px, -${reverseIndex}px) scale(${total === 1 ? 1 : 0.98205})`
    }
    return `translate3d(0, calc(${calc}), -${reverseIndex}px) scale(${1 - 0.05 * reverseIndex})`
  }, [onHover, index, total])

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true)
      clearTimeout(timer)
    }, 10)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const shouldBeHide = reverseIndex > 2 || toast.willBeDestroy
    if (!shouldBeHide) return
    const timer = setTimeout(() => {
      setHide(true)
      clearTimeout(timer)
    }, 150)
    return () => clearTimeout(timer)
  }, [reverseIndex, toast.willBeDestroy])

  return (
    <div key={`${toast.id}-${index}`} className={`toast ${visible ? 'visible' : ''} ${hide ? 'hide': ''}`}>
      <div className="message">{toast.text}</div>
      <div className="action">
        {toastActions(toast.actions, toast.cancel)}
      </div>
      <style jsx>{`
        .toast {
          width: 420px;
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
          box-shadow: ${theme.expressiveness.shadowSmall};
          position: absolute;
          bottom: 0;
          right: 0;
          opacity: 0;
          transform: translate3d(0, 100%, 0px) scale(1);
          transition: all 400ms ease;
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
          transition: opacity .4s ease;
          font-size: .875rem;
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
})

export default ToastItem
