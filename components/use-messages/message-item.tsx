import React, { useEffect, useMemo, useState } from 'react'
import useTheme from '../styles/use-theme'
import { Message } from './use-message'
import Button from '../button'
import { NormalTypes } from '../utils/prop-types'
import { ZeitUIThemesPalette } from '../styles/themes'

type MessageWithID = Message & {
  id: string
  willBeDestroy?: boolean
  cancel: Function
}

export interface ToatItemProps {
  index: number
  total: number
  message: MessageWithID
  onHover: boolean
}

const messageActions = (actions: Message['actions'], cancelHandle: Function) => {
  const handler = (event: React.MouseEvent<HTMLButtonElement>, userHandler: Function) => {
    userHandler && userHandler(event, cancelHandle)
  }
  if (!actions || !actions.length) return null
  return actions.map((action, index) => (
    <Button
      auto
      size="mini"
      color={action.passive ? 'default' : 'secondary'}
      key={`action-${index}`}
      onClick={(event: React.MouseEvent<HTMLButtonElement>) => handler(event, action.handler)}>
      {action.name}
    </Button>
  ))
}

const getColors = (palette: ZeitUIThemesPalette, type?: NormalTypes) => {
  const colors: { [key in NormalTypes]: string } = {
    default: palette.background,
    primary: palette.success,
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

const MessageItem: React.FC<ToatItemProps> = React.memo(({ index, total, message, onHover }) => {
  const theme = useTheme()
  const { color, bgColor } = useMemo(() => getColors(theme.palette, message.type), [
    theme.palette,
    message.type,
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
    return `translate3d(0, calc(${calc}), -${reverseIndex}px) scale(${1 - 0.05 * reverseIndex})`
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
    const shouldBeHide = reverseIndex > 2 || message.willBeDestroy
    if (!shouldBeHide || unMount) return
    const timer = setTimeout(() => {
      setHide(true)
      clearTimeout(timer)
    }, 150)
    return () => {
      unMount = true
      clearTimeout(timer)
    }
  }, [reverseIndex, message.willBeDestroy])
  /* istanbul ignore next */
  if (reverseIndex > 10) return null

  return (
    <div
      key={`${message.id}-${index}`}
      className={`message ${visible ? 'visible' : ''} ${hide ? 'hide' : ''}`}>
      <div className="message">{message.text}</div>
      <div className="action">{messageActions(message.actions, message.cancel)}</div>
      <style jsx>{`
        .message {
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
          border-radius: ${theme.expressiveness.R2};
          padding: ${theme.layout.gap};
          position: absolute;
          bottom: 0;
          right: 0;
          opacity: ${reverseIndex > 4 ? 0 : 1};
          box-shadow: ${reverseIndex > 4 ? 'none' : theme.expressiveness.shadowSmall};
          transform: translate3d(0, 100%, 0px) scale(1);
          transition: transform 400ms ease 0ms, visibility 200ms ease 0ms, opacity 200ms ease 0ms;
        }

        .message.visible {
          opacity: 1;
          transform: ${translate};
        }

        .message.hide {
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

        .message :global(button + button) {
          margin-left: ${theme.layout.gapQuarter};
        }
      `}</style>
    </div>
  )
})

export default MessageItem
