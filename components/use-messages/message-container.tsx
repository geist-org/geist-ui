import React, { useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import usePortal from '../utils/use-portal'
import useTheme from '../styles/use-theme'
import { useZEITUIContext } from '../utils/use-zeit-ui-context'
import { Message } from './use-message'
import MessageItem from './message-item'

export type MessageWithID = Message & {
  id: string
  willBeDestroy?: boolean
  cancel: Function
}

const MessageContainer: React.FC<React.PropsWithChildren<{}>> = () => {
  const portal = usePortal('message')
  const theme = useTheme()
  const [hover, setHover] = useState<boolean>(false)
  // const timer = useRef<number | undefined>()
  // const { messages, updateMessageHoverStatus } = useZEITUIContext()
  const { messages } = useZEITUIContext()
  const messageElements = useMemo(
    () =>
      messages.map((t, i) => (
        <MessageItem
          index={i}
          total={messages.length}
          message={t}
          onHover={hover}
          key={`message-${i}`}
        />
      )),
    [messages, hover],
  )
  // const hoverHandler = (onHover: boolean) => {
  //   if (onHover) {
  //     timer.current && clearTimeout(timer.current)
  //     updateMessageHoverStatus(() => true)
  //     return setHover(true)
  //   }
  //   timer.current = window.setTimeout(() => {
  //     setHover(false)
  //     updateMessageHoverStatus(() => false)
  //     timer.current && clearTimeout(timer.current)
  //   }, 200)
  // }

  if (!portal) return null
  if (!messages || messages.length === 0) return null
  return createPortal(
    <div
      className={`message-container ${hover ? 'hover' : ''}`}
      // onMouseEnter={() => hoverHandler(true)}
      // onMouseLeave={() => hoverHandler(false)}
    >
      {messageElements}
      <style jsx>{`
        .message-container {
          position: fixed;
          width: 420px;
          max-width: 90vw;
          bottom: ${theme.layout.gap};
          right: ${theme.layout.gap};
          z-index: 2000;
          transition: all 400ms ease;
          box-sizing: border-box;
        }

        .message-container.hover {
          transform: translate3d(0, -10px, 0);
        }
      `}</style>
    </div>,
    portal,
  )
}

export default MessageContainer
